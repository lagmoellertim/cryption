import JSZip from "jszip";
import CryptoJS from "crypto-js";
import * as WebCryptoUtils from './webcrypto/webcrypto-utils'
import * as WebCryptoLib from './webcrypto/webcrypto-lib'
import WebCrypto from "./webcrypto/webcrypto"
import {
    b64toBlob,
    base64ArrayBuffer,
    asyncForEach,
    fileToArrayBuffer
} from "./utils";

export const getSHA256 = async (value) => {
    return await CryptoJS.SHA256(value).toString();
}

export const checkCrypt = async (file) => {
    try {
        var zip = await JSZip.loadAsync(file);
        if (".meta" in zip.files) {
            var content = JSON.parse(await zip.file(".meta").async("string"));
            if ("crypt" in content) {
                if (content["crypt"] === 2) {
                    return true;
                }
            }
        }
    } catch {}
    return false;
}

function incrementProgress() {
    postMessage("incrementProgress");
}


export const handleFiles = async (fileList) => {
    var numCrypt = 0;
    await asyncForEach(fileList, async file => {
        var c = await checkCrypt(file);
        if (c) {
            numCrypt += 1;
        }
    });

    if (numCrypt === 1 && fileList.length === 1) {
        return "decrypt";
    } else {
        if (fileList.length === 1) {
            return "encrypt";
        } else if (fileList.length > 1) {
            return "encrypt-multiple";
        }
    }
}

export const combineToZip = async (fileList) => {
    var zip = new JSZip();
    await asyncForEach(fileList, async (file) => {
        zip.file(file.name, file);
    });
    return zip.generateAsync({
        type: "base64"
    });
}

export const getKey = async (key) => {
    return await getSHA256("cryption-" + key + "-cryption");
}

export const fileToData = async (file) => {
    var c = await fileToArrayBuffer(file);
    return c
}

export const encrypt = async (data, filename, password, hint) => {
    const crypto = new WebCrypto({
        generateCipherSettings: true
    })
    console.log(2)

    await crypto.generateKey(password)

    incrementProgress();
    console.log(1)

    const encryptedData = await crypto.encrypt(data)
    console.log(0)

    var sha1 = await WebCryptoLib.sha1(data)
    console.log(1)
    const hashDataEncrypted = await crypto.encrypt(
        await WebCryptoLib.sha256(encryptedData, "none"),
        "base64"
    )
    console.log(2)

    const hashDataUnencrypted = await crypto.encrypt(
        await WebCryptoLib.sha256(data, "none"),
        "base64"
    )
    console.log(3)

    const encryptedFilename = await crypto.encrypt(
        WebCryptoUtils.strToBuf(filename),
        "base64"
    )

    var metadata = {
        hint: hint != null ? hint : "",
        filename: encryptedFilename,
        crypt: 2,
        hashDataEncrypted,
        hashDataUnencrypted,
        cipherSettings: crypto.getCipherSettings()
    };

    var zip = new JSZip();
    zip.file(".meta", JSON.stringify(metadata));

    zip.file("file", encryptedData, {
        binary: true
    });

    var newZip = await zip.generateAsync({
        type: "blob"
    });

    //     // // incrementProgress();

    return {
        file: newZip,
        name: sha1 + ".cryption"
    };
}

export const decrypt = async (file, password) => {


    //let dec = await decrypt(enc, key, iv, mode)
    // incrementProgress();
    var zip = await JSZip.loadAsync(file);
    var metadata = JSON.parse(await zip.file(".meta").async("string"));

    const crypto = new WebCrypto({
        ...metadata.cipherSettings,
        decoding: "base64"
    })

    await crypto.generateKey(password)

    var data = await zip.file("file").async("arraybuffer");

    let decryptedData;

    try {
        decryptedData = await crypto.decrypt(data)
    } catch {
        return {
            file: null,
            error: "key-incorrect-or-corrupted",
            name: null
        };
    }



    // incrementProgress();
    const hashDataEncrypted = await WebCryptoLib.sha256(data, "base64")
    const hashDataUnencrypted = await WebCryptoLib.sha256(decryptedData, "base64")

    const hashDataEncryptedInitial = await crypto.decrypt(WebCryptoUtils.b64ToBuf(metadata.hashDataEncrypted), "base64")
    const hashDataUnencryptedInitial = await crypto.decrypt(WebCryptoUtils.b64ToBuf(metadata.hashDataUnencrypted), "base64")


    if (hashDataEncrypted === hashDataEncryptedInitial && hashDataUnencrypted === hashDataUnencryptedInitial) {

        var name = await crypto.decrypt(WebCryptoUtils.b64ToBuf(metadata.filename), "string")

        // incrementProgress();
        var blob = new Blob([decryptedData]);
        var blobUrl = URL.createObjectURL(blob);
        // incrementProgress();
        return {
            file: blobUrl,
            error: null,
            name
        };

    }
    return {
        file: null,
        error: "no-integrity",
        name: null
    };

}

export const getHint = async (file) => {
    var zip = await JSZip.loadAsync(file);
    var metadata = JSON.parse(await zip.file(".meta").async("string"));
    return metadata.hint ? metadata.hint : null;
}