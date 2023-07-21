const CryptoJS = require('crypto-js');

const encrypt = async function (plaintext) {
  let ciphertext;
  ciphertext = CryptoJS.AES.encrypt(plaintext.toString(), CONFIG.secretKey).toString();
  return ciphertext;
};
module.exports.encrypt = encrypt;

const decrypt = function (ciphertext) {
  let plaintext;
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), CONFIG.secretKey);
  plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};
module.exports.decrypt = decrypt;