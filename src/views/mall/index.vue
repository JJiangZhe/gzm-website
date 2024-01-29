<template>
  <div class="mall-page flex flex-col items-center">
    <div class="box">
      <p class="title">个性装扮</p>
      <ul class="dress-box flex">
        <li
          v-for="item in data.dressList"
          :key="item.id"
          :class="data.goodsData.id === item.id ? 'choose-item' : 'others'"
          @click="chooseItem(item)"
        >
          <div class="flex flex-col justify-center items-center">
            <img v-if="item.picture" :src="item.picture" alt="" />
          </div>
          <p class="name ellipsis">{{ `${item.title}*${item.prices[0].day}天` }}</p>
          <p class="price flex items-center">
            <!-- <img :src="getImageUrl('gold')" alt="" /> -->
            <span>￥{{ item.prices[0].price / 100 }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="box">
      <p class="title">请确认信息</p>
      <div class="msg-box">
        <div class="top flex items-center" id="addstyle">
          <div class="query flex items-center" id="addstyleitem">
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
                <div v-show="!data.isSend" style="color: white">发送验证码</div>
              </button>
            </div>
          </div>
          <div class="query flex items-center" id="addstyleitem">
            <p>验证码</p>
            <div class="input-box flex justify-between items-center">
              <input v-model="data.form.code" maxlength="4" placeholder="请输入验证码" />
              <button class="login" @click="onSubmit" style="color: white">登录</button>
            </div>
          </div>
          <div class="userid" id="addstyleitem">公主喵ID：{{ data.user_code || '*******' }}</div>
        </div>
        <p class="msg">请使用与公主喵ID绑定的手机号进行授权，以确保装扮正常到账</p>
        <p class="pay">请选择支付方式</p>
        <div class="balance-box flex justify-between">
          <div
            class="balance-left flex flex-col justify-center items-center"
            :class="data.choose ? 'choose' : 'nochoose'"
            @click="chooseMeths"
          >
            <p class="text">微信支付</p>
            <!-- <p class="balance flex justify-center items-center">
              <span>余额</span>
              <span class="num">{{ data.user_money || 0 }}</span>
              <img :src="getImageUrl('gold')" alt="" />
            </p> -->
            <img v-if="data.choose" :src="getImageUrl('choose')" alt="" />
          </div>
          <div class="balance-right flex">
            <div class="balance-num">
              <p class="flex justify-end items-center">
                支付：<span>{{ data.goodsData.price || 0 }}</span
                >元
              </p>
              <div class="flex justify-center items-center">
                <img :src="getImageUrl(data.affirmStatus ? 'choose' : 'nochoose')" alt="" @click="affirmRead" />
                <p>
                  我已经认真阅读了
                  <!-- <a href="https://recharge.clouddancetech.com/pack/#/agreement" class="agreement"
                    target="_blank">《公主喵消费协议》</a> -->
                  <span @click="$router.push({ name: 'agreement' })" class="agreement">《公主喵消费协议》</span>
                </p>
              </div>
            </div>
            <img
              class="buy"
              :class="data.choose && data.affirmStatus ? '' : 'canClick'"
              :src="getImageUrl('buy')"
              alt=""
              @click="affirmBuy"
            />
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="data.dialogVisible" :title="data.dialogData.title" :show-close="false" center>
      <div class="dialog-msg">{{ data.dialogData.text }}</div>
      <template #footer>
        <div class="dialog-foot flex justify-between items-center">
          <el-button class="cancel-btn btn" @click="data.dialogVisible = false">取消</el-button>
          <el-button class="affirm-btn btn" type="primary" @click="dialogAffirm">
            {{ data.dialogData.affirmText }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { sendCodeApi, signInApi, websiteProductApi, buyApi } from '@/api/login'
import { getImageUrl, debounce, pageScorllTop } from '@/utils'
import { reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const { VITE_CAPTCHA_ID } = import.meta.env
const mobileValidator = (val) => /^1[3-9]\d{9}$/.test(val)
const user_code = localStorage.getItem('user_code')
const user_money = localStorage.getItem('user_money')
const data = reactive({
  user_code,
  user_money,
  choose: false,
  affirmStatus: false,
  dressList: [],
  time: Date.now() + 1000 * 60,
  isSend: false,
  form: {
    mobile: undefined,
    code: '',
  },
  goodsData: {
    id: 0,
    title: '',
    price_id: 0,
    price: 0,
    day: 0,
  },
  dialogVisible: false,
  dialogData: {
    title: '购买提示',
    text: '',
    affirmText: '确定购买',
    status: 1,
  },
})
onMounted(() => {
  pageScorllTop()
  websiteProduct()
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

// 获取个性装扮
const websiteProduct = async () => {
  try {
    const res = await websiteProductApi()
    data.dressList = res.data
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
    ElMessage.success('登录成功！')
    data.form = {
      mobile: undefined,
      code: undefined,
    }
    data.time = 0
    data.isSend = false
    data.user_code = res.data.user_code
    data.user_money = res.data.money
    localStorage.setItem('user_money', res.data.money)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user_code', res.data.user_code)
  } catch (err) {}
})

// 选择装扮
const chooseItem = (item) => {
  data.goodsData = {
    id: item.id,
    title: item.title,
    price_id: item.prices[0].id,
    price: item.prices[0].price / 100,
    day: item.prices[0].day,
  }
  data.affirmStatus = false
}

// 选择支付方式
const chooseMeths = () => {
  if (!data.user_code) {
    ElMessage.warning('请先登录账号！')
    return
  }
  data.choose = !data.choose
}
// 确认协议
const affirmRead = () => {
  if (!data.goodsData.price) {
    ElMessage.warning('请选择需要购买的装扮！')
    return
  }
  if (!data.choose) {
    ElMessage.warning('请选择支付方式！')
    return
  }
  data.affirmStatus = !data.affirmStatus
}

// 点击购买
const affirmBuy = () => {
  // if (!data.user_code) {
  //   ElMessage.warning('请先登录账号！')
  //   return
  // }
  // if (!data.goodsData.price) {
  //   ElMessage.warning('请选择需要购买的装扮！')
  //   return
  // }
  // if (!data.choose) {
  //   ElMessage.warning('请选择支付方式！')
  //   return
  // }
  // if (!data.affirmStatus) {
  //   ElMessage.warning('请确认阅读协议！')
  //   return
  // }
  // data.dialogData = {
  //   title: '购买提示',
  //   text: `您购买的【${data.goodsData.title}】有效期${data.goodsData.day}天，是否继续？`,
  //   affirmText: '确定购买',
  //   status: 1,
  // }
  // data.dialogVisible = true
  ElMessageBox.alert('购买功能正在维护中~', '提示', {
    confirmButtonText: '确认',
    callback: () => {},
  })
}

// 确认购买
const dialogAffirm = async () => {
  data.dialogVisible = false
  if (data.dialogData.status === 1) {
    buy()
  }
  if (data.dialogData.status === 3) {
    router.push({
      path: './recharge',
    })
  }
}

// 购买接口
const buy = async () => {
  try {
    const res = await buyApi({
      price_id: data.goodsData.price_id,
      product_id: data.goodsData.id,
    })
    if (res.data) {
      data.user_money = res.data.money
      localStorage.setItem('user_money', res.data.money)
      data.dialogData = {
        title: '购买成功',
        text: `您购买的【${data.goodsData.title}】有效期${data.goodsData.day}天，快去佩戴吧！`,
        affirmText: '确定',
        status: 2,
      }
      data.dialogVisible = true
    }
  } catch (err) {
    if (err.code === 330001) {
      data.dialogData = {
        title: '购买失败',
        text: '您的余额不足，请前往充值',
        affirmText: '充值',
        status: 3,
      }
      data.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import './style.scss';

#addstyle{
  // background-color: skyblue;
  display: block;

  #addstyleitem{
    margin: 10px 0;
  }
}

.msg-box{
  height: 435px !important;
}
</style>
