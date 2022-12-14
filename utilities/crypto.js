const CryptoJS = require('crypto-js');

exports.encryptPassword = (plain)  => {
    try {
        const layer1 = CryptoJS.AES.encrypt(plain, process.env.PASSWORD_ENCRYPTION_SECRET).toString();
        const layer2 = CryptoJS.DES.encrypt(layer1, process.env.PASSWORD_ENCRYPTION_SECRET).toString();
        const layer3 = CryptoJS.TripleDES.encrypt(layer2, process.env.PASSWORD_ENCRYPTION_SECRET).toString();
        return layer3;
    } catch (error) {
        throw error;
    }
}

exports.decryptPassword = (cipher)  => {
    try {
        const layer1 = CryptoJS.TripleDES.decrypt(cipher, process.env.PASSWORD_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
        const layer2 = CryptoJS.DES.decrypt(layer1, process.env.PASSWORD_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
        const layer3 = CryptoJS.AES.decrypt(layer2, process.env.PASSWORD_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
        return layer3;
    } catch (error) {
        throw error;
    }
}