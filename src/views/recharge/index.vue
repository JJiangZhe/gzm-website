<template>
  <div class="mall-page flex flex-col items-center">
    <div class="box flex justify-between">
      <div class="box-left">
        <p class="title">充值套餐</p>
        <ul class="money-box flex flex-wrap justify-between content-between">
          <li
            v-for="item in data.moneyList"
            :key="item.money"
            class="flex flex-col justify-center items-center"
            :class="data.rechargeData.money === item.money ? 'choose-item' : 'others'"
            @click="chooseItem(item)"
          >
            <div>
              <img :src="getImageUrl('gold')" alt="" />
              <span>{{ item.value }}</span>
            </div>
            <p>￥{{ item.money }}</p>
          </li>
        </ul>
      </div>
      <div class="box-right">
        <ul class="right-title flex">
          <li
            class="flex justify-center items-center"
            :class="data.chooseLabel ? 'active' : 'unactive'"
            @click="data.chooseLabel = true"
          >
            商品详情
          </li>
          <li
            class="flex justify-center items-center"
            :class="data.chooseLabel ? 'unactive' : 'active'"
            @click="data.chooseLabel = false"
          >
            售后保障
          </li>
        </ul>
        <div class="right-content">
          <ul v-if="data.chooseLabel" class="right-goods">
            <li>
              <p class="goods-title"><span>商品简介</span></p>
              <p>商品名称：雪花</p>
              <p>商品产地：中国</p>
              <p>充值类型：直充</p>
            </li>
            <li>
              <p class="goods-title">商品详情</p>
              <p>运营公司：辽宁云跳动科技有限公司</p>
              <p>充值方式：手动充值</p>
              <p>计费比率：1比100</p>
            </li>
            <li>
              <p class="goods-title">充值说明</p>
              <p>1.雪花可以用于购买公主喵APP内的礼物和其他道具；</p>
              <p>2.雪花仅能用户兑换公主喵APP直接运营的产品，不能兑换现金，不能进行转账交易；</p>
              <p>3.充值问题请打开APP，点击【我的】-【在线客服】进行反馈。</p>
            </li>
          </ul>
          <div v-else class="after-sale flex flex-col items-center">
            <div>
              <p>1.雪花可以用于购买公主喵APP内的礼物和其他道具；</p>
              <p>2.雪花仅能用户兑换公主喵APP直接运营的产品，不能兑换现金，不能进行转账交易；</p>
              <p>3.充值问题请打开APP，点击【我的】-【在线客服】进行反馈。</p>
            </div>
            <p>客服电话：15669989310</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <p class="title">请确认信息</p>
      <div class="msg-box">
        <div class="top flex items-center">
          <div class="query flex items-center">
            <p>手机号</p>
            <div class="input-box flex justify-between items-center">
              <input
                v-model="data.form.mobile"
                maxlength="11"
                placeholder="请输入手机号"
                :rules="[{ validator: mobileValidator, message: '请输入正确的手机号' }]"
              />
              <!-- 易盾容器 -->
              <div id="captcha"></div>
              <button class="sendCode code_send">
                <el-countdown
                  v-show="data.isSend"
                  ref="statistic"
                  format="ss"
                  :value="data.time"
                  @finish="handleFinish"
                >
                </el-countdown>
                <div v-show="!data.isSend">发送验证码</div>
              </button>
            </div>
          </div>
          <div class="query flex items-center">
            <p>验证码</p>
            <div class="input-box flex justify-between items-center">
              <input v-model="data.form.code" maxlength="4" placeholder="请输入验证码" />
              <button class="login" @click="onSubmit">登录</button>
            </div>
          </div>
          <div class="userid">公主喵ID：{{ data.user_code || '*******' }}</div>
        </div>
        <p class="msg">请使用与公主喵ID绑定的手机号进行授权，以确保装扮正常到账</p>
        <div class="recharge-box flex flex-col items-center">
          <p class="total flex justify-end items-center">
            支付：<span>{{ data.rechargeData.money }}</span
            >元
          </p>
          <div class="flex justify-center items-center">
            <img :src="getImageUrl(data.affirmStatus ? 'choose' : 'nochoose')" alt="" @click="affirmRead" />
            <p>
              我已经认真阅读了<a
                href="https://recharge.clouddancetech.com/pack/#/agreement"
                class="agreement"
                target="_blank"
                >《公主喵消费协议》</a
              >
            </p>
          </div>
          <img
            class="recharge"
            :class="data.affirmStatus ? '' : 'canClick'"
            :src="getImageUrl('recharge')"
            alt=""
            @click="recharge"
          />
          <p class="hint">
            *注意事项：请填写完整账户！如充错账户，责任由买家自行承担，故请在提交前仔细核对账户信息（充值帐户）。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sendCodeApi, signInApi, rechargeConfigApi } from '@/api/login'
import { getImageUrl, debounce, pageScorllTop } from '@/utils'
import { reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const { VITE_CAPTCHA_ID } = import.meta.env
const mobileValidator = (val) => /^1[3-9]\d{9}$/.test(val)
const user_code = localStorage.getItem('user_code')
const data = reactive({
  user_code,
  moneyList: [],
  rechargeData: {
    money: 0,
    value: 0,
  },
  chooseLabel: false,
  affirmStatus: false,
  time: Date.now() + 1000 * 60,
  isSend: false,
  form: {
    mobile: undefined,
    code: '',
  },
})
onMounted(() => {
  pageScorllTop()
  getRecharge()
  init()
})

let captchaIns = null
// 网易易盾
const init = () => {
  console.log('VITE_BASE_URLVITE_BASE_URLVITE_BASE_URL', VITE_CAPTCHA_ID)
  // 若使用降级方案接入
  // initNECaptcha 替换成 initNECaptchaWithFallback
  window.initNECaptcha(
    {
      popupStyles: {
        position: 'fixed',
        top: '20%',
      },
      // 该id为公主喵id,对应app需要找对应产品要
      captchaId: VITE_CAPTCHA_ID,
      element: '#captcha',
      mode: 'popup',
      width: '320px',
      theme: 'dark',
      apiVersion: 2,
      onVerify: (err, data) => {
        // 当验证失败时, 内部会自动 refresh 方法, 无需手动再调用一次
        if (err) return
        // 以下为业务侧逻辑
        console.log('以下为业务侧逻辑')
        captchaIns.refresh()
        // 把易盾的验证结果传给后端
        handleSendCode(data.validate)
      },
    },

    function onload(instance) {
      captchaIns = instance
      console.log(captchaIns)
    },
    function onerror(err) {
      // 初始化失败后触发该函数, err 对象描述当前错误信息
      console.log(err)
    }
  )
  // 挂载在触发方法的容器上
  document.querySelector('.code_send').addEventListener('click', function () {
    if (data.isSend) return

    if (!data.form.mobile || !mobileValidator(data.form.mobile)) {
      ElMessage.error('请输入正确的手机号')
      return
    }
    captchaIns && captchaIns.verify()
  })
}

// 获取充值列表
const getRecharge = async () => {
  try {
    const res = await rechargeConfigApi()
    data.moneyList = res.data
  } catch (err) {}
}

// 发送验证码
const handleSendCode = debounce(async (NECaptchaValidate) => {
  if (!data.form.mobile) {
    ElMessage.error('请输入手机号')
    return
  }

  if (!mobileValidator(data.form.mobile)) {
    ElMessage.error('请输入正确的手机号')
    return
  }

  if (data.isSend) return
  try {
    await sendCodeApi(data.form.mobile, 1, NECaptchaValidate)
    data.time = Date.now() + 1000 * 60
    data.isSend = true
  } catch (err) {}
})

// 倒计时结束
const handleFinish = () => {
  data.time = 0
  data.isSend = false
}

// 登录
const onSubmit = debounce(async () => {
  if (!data.form.mobile) {
    ElMessage.error('请输入手机号')
    return
  }
  if (!data.form.code) {
    ElMessage.error('请输入验证码')
    return
  }
  try {
    const res = await signInApi(data.form)
    data.form = {
      mobile: undefined,
      code: undefined,
    }
    data.time = 0
    data.isSend = false
    ElMessage.success('登录成功！')
    data.user_code = res.data.user_code
    localStorage.setItem('user_money', res.data.money)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user_code', res.data.user_code)
  } catch (err) {}
})

// 选择充值金额
const chooseItem = (item) => {
  data.rechargeData.money = item.money
  data.affirmStatus = false
}

// 确实阅读说明
const affirmRead = () => {
  if (!data.rechargeData.money) {
    ElMessage.warning('请选择充值金额！')
    return
  }
  data.affirmStatus = !data.affirmStatus
}

// 充值
const recharge = () => {
  if (!data.user_code) {
    ElMessage.warning('请先登录账号！')
    return
  }
  if (!data.affirmStatus) {
    ElMessage.warning('请确认阅读协议！')
    return
  }
  ElMessageBox.alert('充值渠道维护中~', '提示', {
    confirmButtonText: '确认',
    callback: () => {},
  })
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
