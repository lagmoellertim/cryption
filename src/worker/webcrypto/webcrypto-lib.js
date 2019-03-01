import * as WebCryptoUtils from "./webcrypto-utils"

const crypto = self.crypto

// Key Generation
export const pbkdf2 = async (password, salt, iterations) => {
    const baseKey = await crypto.subtle.importKey("raw", password, {
        name: "PBKDF2"
    }, false, ["deriveKey"])

    const key = await crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt,
        iterations,
        hash: "SHA-256"
    }, baseKey, {
        "name": "AES-GCM",
        "length": 256
    }, true, ["encrypt", "decrypt"])

    return await crypto.subtle.exportKey("raw", key)
}

// Encryption
export const encrypt = async (data, key, iv, encoding = "none") => {
    const bufKey = await crypto.subtle.importKey("raw", key, {
        name: "AES-GCM"
    }, true, ["encrypt", "decrypt"])

    return WebCryptoUtils.encodeBuffer(
        await crypto.subtle.encrypt({
            name: "AES-GCM",
            iv
        }, bufKey, data),
        encoding
    )
}

// Decryption
export const decrypt = async (data, key, iv, encoding = "none") => {
    const bufKey = await crypto.subtle.importKey("raw", key, {
        name: "AES-GCM"
    }, true, ["encrypt", "decrypt"])
    return WebCryptoUtils.encodeBuffer(
        await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv
        }, bufKey, data),
        encoding
    )
}

// Different Hashing Methods
const hash = async (data, algorithm, encoding = "hex") => {
    const hash = await crypto.subtle.digest(algorithm, data);
    return WebCryptoUtils.encodeBuffer(hash, encoding)
}

export const sha1 = async (data, encoding) => {
    return await hash(data, "SHA-1", encoding)
}

export const sha256 = async (data, encoding) => {
    return await hash(data, "SHA-256", encoding)
}

export const sha512 = async (data, encoding) => {
    return await hash(data, "SHA-512", encoding)
}