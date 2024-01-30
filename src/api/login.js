import { request2Get, request2Post } from '@/utils/request.js'

export function sendCodeApi(mobile, type, NECaptchaValidate) {
  return request2Get({
    url: `/web/wpn/user/getSmsCode`,
    params: { mobile, type, NECaptchaValidate }
  })
}

export function signInApi(data) {
  return request2Post({
    url: `/web/wpn/user/login`,
    data
  })
}

// 获取充值列表
export function rechargeConfigApi() {
  return request2Get({
    url: '/api/wallet/rechargeConfig'
  })
}

// 个性装扮列表
export function websiteProductApi() {
  return request2Get({
    url: '/api/website/mall/websiteProduct'
  })
}

// 购买
export function buyApi(data) {
  return request2Post({
    url: '/api/personal/mall/buy',
    data
  })
}
