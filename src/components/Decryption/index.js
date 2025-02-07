import CryptoJS from "crypto-js";

const Decryption = (content, key) => {
    const res = CryptoJS.AES.decrypt(content, key)
        .toString(CryptoJS.enc.Utf8)
        .trim()
        .replace(/^"|"$/g, "");
    return res;
};

export default Decryption;
