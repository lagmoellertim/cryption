import * as WebCryptoLib from "./webcrypto-lib"
import * as WebCryptoUtils from "./webcrypto-utils"

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
            this.iv = WebCryptoUtils.decodeString(iv, decoding);
            this.salt = WebCryptoUtils.decodeString(salt, decoding);
            this.iterations = iterations;
        }
        this.key = null
    }

    generateKey = async (password) => {
        this.key = await WebCryptoLib.pbkdf2(WebCryptoUtils.strToBuf(password), this.salt, this.iterations)
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
            iv: WebCryptoUtils.bufToB64(this.iv),
            salt: WebCryptoUtils.bufToB64(this.salt),
            iterations: this.decrypt.iterations
        }
    }
}