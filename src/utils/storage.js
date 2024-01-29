import CryptoJS from 'crypto-js'

/*
 * 待添加
 *   由于这里的 密钥和偏移量都是直接暴露再js代码中的
 *   如果想要做进一步的加密
 *   需要写一个混淆算法
 *   关于混淆算法 使用现有的库 jsHaman
 * */

/*  加密 密钥 */
const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF')
/* 偏移量 */
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412')

const option = {
  iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
}

//解密方法
function decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, option)
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

//加密方法
function encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, option)
  return encrypted.ciphertext.toString().toUpperCase()
}

class Storage {
  static sessionStorageSetItem(key, value) {
    const [tempKey, tempValue] = [encrypt(key), encrypt(value)]
    window.sessionStorage.setItem(tempKey, tempValue)
  }

  static sessionStorageGetItem(key) {
    const tempKey = encrypt(key)
    const value = window.sessionStorage.getItem(tempKey)
    return decrypt(value)
  }

  static localStorageSetItem(key, value) {
    const [tempKey, tempValue] = [encrypt(key), encrypt(value)]
    window.localStorage.setItem(tempKey, tempValue)
  }

  static localStorageGetItem(key) {
    const tempKey = encrypt(key)
    const value = window.localStorage.getItem(tempKey)
    return decrypt(value)
  }
}

const { sessionStorageGetItem, sessionStorageSetItem, localStorageSetItem, localStorageGetItem } = Storage

export { decrypt, encrypt, sessionStorageGetItem, sessionStorageSetItem, localStorageSetItem, localStorageGetItem }
