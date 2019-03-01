export const encodeBuffer = (buffer, encoding) => {
    if (encoding === "hex") {
        return bufToHex(buffer)
    } else if (encoding === "base64") {
        return bufToB64(buffer)
    } else if (encoding === "string") {
        return bufToStr(buffer)
    } else if (encoding === "none") {
        return buffer
    }
}

export const decodeString = (string, decoding) => {
    if (decoding === "hex") {
        return hexToBuf(string)
    } else if (decoding === "base64") {
        return b64ToBuf(string)
    } else if (decoding === "string") {
        return strToBuf(string)
    } else if (decoding === "none") {
        return string
    }
}

export const strToBuf = str => (new TextEncoder().encode(str));
export const bufToStr = str => (new TextDecoder().decode(str));

export const bufToHex = buf => {
    var byteArray = new Uint8Array(buf);
    var hexString = "";
    var nextHexByte;

    for (var i = 0; i < byteArray.byteLength; i++) {
        nextHexByte = byteArray[i].toString(16);
        if (nextHexByte.length < 2) {
            nextHexByte = "0" + nextHexByte;
        }
        hexString += nextHexByte;
    }
    return hexString;
};
export const hexToBuf = hex => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return new Uint8Array(bytes);
};

export const bufToB64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)))
export const b64ToBuf = b64 => {
    const binstr = atob(b64),
        buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, (ch, i) => {
        buf[i] = ch.charCodeAt(0);
    });
    return buf;
}