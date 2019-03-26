import * as WebCryptoLib from "./webcrypto-lib"
import {
    ConversionUtils
} from "../utils/utils"

const crypto = self.crypto

export default class WebCrypto {
    constructor({
        iv,
        salt,
        iterations = 1000,
        generateCipherSettings = false,
        decoding = "none"
    }) {
        if (generateCipherSettings) {
            this.iv = crypto.getRandomValues(new Uint8Array(16));
            this.salt = crypto.getRandomValues(new Uint8Array(16));
            this.iterations = iterations;
        } else {
            this.iv = ConversionUtils.decodeString(iv, decoding);
            this.salt = ConversionUtils.decodeString(salt, decoding);
            this.iterations = iterations;
        }
        this.key = null
    }

    generateKey = async (password) => {
        this.key = await WebCryptoLib.pbkdf2(ConversionUtils.strToBuf(password), this.salt, this.iterations)
        return this.key
    }

    encrypt = async (dataBuffer, encoding) => {
        return await WebCryptoLib.encrypt(dataBuffer, this.key, this.iv, encoding)
    }

    decrypt = async (encryptedDataBuffer, encoding) => {
        return await WebCryptoLib.decrypt(encryptedDataBuffer, this.key, this.iv, encoding)
    }

    getCipherSettings = () => {
        return {
            iv: ConversionUtils.bufToB64(this.iv),
            salt: ConversionUtils.bufToB64(this.salt),
            iterations: this.decrypt.iterations
        }
    }
}