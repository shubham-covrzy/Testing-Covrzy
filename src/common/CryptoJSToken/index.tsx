import CryptoJS from 'crypto-js';
const CRYPTO_SECRETE_KEY = process.env.REACT_APP_CRYPTO_SECRETE_KEY;

// Encrypt
export const EncryptData = (data: any) => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        CRYPTO_SECRETE_KEY,
    ).toString();
};

// Decrypt
export const DecryptData = (token: string) => {
    const bytes = CryptoJS.AES.decrypt(token, CRYPTO_SECRETE_KEY);
    const x = bytes.toString(CryptoJS.enc.Utf8);

    return x !== '' ? JSON.parse(x) : {};
};
