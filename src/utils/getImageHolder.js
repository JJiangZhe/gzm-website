/**
 * @description 获取一张随机图片
 * @see {@link https://picsum.photos/}
 * @example const imageUrl = getImageHolder()
 * @param {number} width       图片宽度
 * @param {number} height      图片高度
 * @param {boolean} seed       是否每次获取相同图片
 * @param {boolean} grayscale  是否是灰色图片
 * @param {number | boolean} blur        高斯模糊
 * @param {boolean} random     是否每次获取随机图片
 * @param {boolean} jpg        是否是Jpg格式图片
 * @param {boolean} webp       是否是webp格式图片
 * @return {string}            图片资源地址
 * @author 勇敢的小谢 2021/7/15
 **/
function getImageHolder(width = 200, height, seed, grayscale, blur, random, webp) {
  let BASE_URL = 'https://picsum.photos'
  if (seed) BASE_URL += '/seed/picsum'
  if (width) BASE_URL += `/${width}`
  if (height) BASE_URL += `/${height}?`
  if (blur) BASE_URL += typeof blur === 'number' ? `blur=${blur}` : `blur`
  if (grayscale) BASE_URL += `&grayscale`
  BASE_URL += webp ? '.webp' : '.jpg'
  return BASE_URL
}

export { getImageHolder }
