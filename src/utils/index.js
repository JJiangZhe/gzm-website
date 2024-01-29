/*
 * 用于常见的 query 参数获取
 * */
function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}

/*
 * 活动专用
 * */
function getToken() {
  return decodeURIComponent(window.location.search.substring(1).replace('token=', '')).replace(/\s/g, '+')
}

/**
 * 常规图片导入
 */
function getImageUrl(name, type = '.png') {
  return new URL(`../assets/${name}${type}`, import.meta.url).href
}

function getQueryParams(key) {
  const obj = {}
  decodeURI(window.location.href)
    ?.split('?')[1]
    ?.split('&')
    .forEach((item) => {
      const arr = item?.split('=')
      arr.shift()
      // 当有路由时, 将路由相关当去除
      arr[arr.length - 1] = arr[arr.length - 1].split('#')[0]
      // 解决token中有 = 号的问题
      obj[item?.split('=')[0]] = arr?.join('=')
    })
  return obj[key]
}

/**
 * 防抖函数
 * @param {*} fn  回调函数
 * @param {*} delay  延迟时间
 * @returns
 */
function debounce(fn, delay = 500) {
  let timer
  return function () {
    const that = this
    const args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
function getTime() {
  const time = new Date()
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  const s = time.getSeconds()
  return `${y}-${m}-${d} ${h}:${mm}:${s}`
}

function pageScorllTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

export { getToken, getImageUrl, getQueryVariable, getQueryParams, debounce, getTime, pageScorllTop }
