/*
 * 参数加密算法
 *
 * 签名算法--对参数键值对倒序排列,拼接成字符串,加上签名秘钥,md5加密
 * 键的排序使用 ASCII 码排序
 * */
import md5 from 'js-md5'

const FALSE_VALUE = [undefined, null, NaN]

const VUE_APP_API_SECRET = 'SUfaQxKoqVTkjRJrD056EFfkZODRGZL6'

export const toEncryption = (obj) => {
  let result = ''
  if (obj) {
    /* 过滤对象中的假值 */
    const objFilter = {}
    Object.keys(obj).forEach((key) => {
      if (!FALSE_VALUE.includes(obj[key])) objFilter[key] = obj[key]
    })
    const keys = Object.keys(objFilter).sort().reverse()
    for (const key of keys) result += `${key}${obj[key]}`
  }
  result += VUE_APP_API_SECRET
  return md5(result)
}
