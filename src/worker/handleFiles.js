import JSZip from "jszip";
import CryptoJS from "crypto-js";
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
                if (content["crypt"] === true) {
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
    return base64ArrayBuffer(c);
}

export const encrypt = async (data, filename, key, hint) => {
    var eKey = await getKey(key);
    incrementProgress();

    var encrypted = await CryptoJS.AES.encrypt(data, eKey).toString();
    incrementProgress();
    var md5 = CryptoJS.MD5(data).toString();
    incrementProgress();
    var sha256HashEncrypted = await CryptoJS.AES.encrypt(await getSHA256(encrypted), eKey).toString();
    var sha256HashUnencrypted = await CryptoJS.AES.encrypt(await getSHA256(data), eKey).toString();
    incrementProgress();
    const name = await CryptoJS.AES.encrypt(filename, eKey).toString();
    incrementProgress();
    var metadata = {
        hint: hint != null ? hint : "",
        filename: name,
        crypt: true,
        sha256Before: sha256HashUnencrypted,
        sha256After: sha256HashEncrypted
    };

    incrementProgress();

    var zip = new JSZip();
    zip.file(".meta", JSON.stringify(metadata));

    zip.file("file", encrypted, {
        base64: true
    });

    var newZip = await zip.generateAsync({
        type: "blob"
    });

    incrementProgress();

    return {
        file: newZip,
        name: md5 + ".cryption"
    };
}

export const decrypt = async (file, key) => {
    var eKey = await getKey(key);
    incrementProgress();
    var zip = await JSZip.loadAsync(file);
    var metadata = JSON.parse(await zip.file(".meta").async("string"));
    var content = await zip.file("file").async("base64");
    incrementProgress();
    try {
        var decrypted = await CryptoJS.AES.decrypt(content, eKey).toString(CryptoJS.enc.Utf8);
    } catch {
        return {
            file: null,
            error: "key-incorrect-or-corrupted",
            name: null
        };
    }
    incrementProgress();
    var sha256HashEncrypted = await getSHA256(content);
    var sha256HashUnencrypted = await getSHA256(decrypted);
    incrementProgress();
    if (await CryptoJS.AES.decrypt(metadata.sha256Before, eKey).toString(CryptoJS.enc.Utf8) === sha256HashUnencrypted && await CryptoJS.AES.decrypt(metadata.sha256After, eKey).toString(CryptoJS.enc.Utf8) === sha256HashEncrypted) {
        incrementProgress();
        var name = await CryptoJS.AES.decrypt(metadata.filename, eKey).toString(CryptoJS.enc.Utf8);
        incrementProgress();
        var blob = b64toBlob(decrypted);
        var blobUrl = URL.createObjectURL(blob);
        incrementProgress();
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