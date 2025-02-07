import CryptoJS from "crypto-js";

const Encryption = (content, key) => {
    const res = CryptoJS.AES.encrypt(
        JSON.stringify(content),
        String(key)
    ).toString();
    return res;
};
export default Encryption;