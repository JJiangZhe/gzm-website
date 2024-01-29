<template>
  <header class="header">
    <div class="header-content flex justify-between">
      <div class="header-left flex items-center">
        <img :src="getImageUrl('logo')" alt="" />
        <!-- <span>公主喵</span> -->
      </div>
      <ul class="header-right flex justify-center items-center">
        <li v-for="item in routers" :key="item.id" class="flex flex-col items-center" @click="handleJump(item)">
          <p :class="data.chooseId === item.id ? 'active' : ''">{{ item.name }}</p>
          <!-- <img v-if="data.chooseId === item.id" :src="getImageUrl('active-line')" alt="" /> -->
        </li>
      </ul>
    </div>
  </header>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <!-- 下方菜单 -->
  <footer>
    <div class="foot-box flex flex-col items-center">
      <div class="foot-content flex justify-between">
        <div class="content-left flex justify-between">
          <div class="left-items">
            <button class="pointer" @click="openWind('//dw.33eb.cn/upykag')">
              <img src="@/assets/apple.png" alt="" />
              <span>iOS下载</span>
            </button>
            <h3>苹果端</h3>
          </div>
          <div class="left-items">
            <button class="pointer" @click="openWind('//statics.xiapaolong.com/app/gzm.apk')">
              <img src="@/assets/android.png" alt="" />
              <span>Android下载</span>
            </button>
            <h3>安卓端</h3>
          </div>
        </div>
        <div class="content-right">
          <h4>沈阳星路网络科技有限公司</h4>
          <!-- <h4>总部地址：山东省济南市历城区辛祝路17号好兰朵大厦651</h4> -->
          <div style="margin: 0 auto; padding: 20px 0">
            <a
              target="_blank"
              href="https://beian.miit.gov.cn/"
              style="display: inline-block; height: 20px; line-height: 20px"
              ><img src="@/assets/备案图标.png" style="float: left" />
              <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #939393">
                辽ICP备2023009431号-1
              </p>
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="foot-bottom">
          <h3>备案号：<a href="https://beian.miit.gov.cn/">辽ICP备2022003199号-1</a></h3>
          <h3>开发者：辽宁云跳动科技有限公司</h3>
        </div> -->
    </div>
  </footer>
</template>

<script setup>
import { getImageUrl } from '@/utils'
import { useRouter } from 'vue-router'
import { reactive, onBeforeUnmount, watch } from 'vue'
const router = useRouter()
const routers = [
  {
    id: 0,
    name: '首页',
    path: '/home',
  },
  {
    id: 1,
    name: '商城',
    path: '/mall',
  },
]
const data = reactive({
  chooseId: 0,
})
watch(
  () => router.currentRoute.value,
  (val) => {
    if (val.path == '/agreement') return
    data.chooseId = routers.find((item) => val.path === item.path).id || 0
  }
)

const handleJump = (item) => {
  data.chooseId = item.id
  router.push({
    path: item.path,
  })
}

const openWind = (url) => {
  console.log(url)
  window.open(url, '_blank')
}

onBeforeUnmount(() => {
  window.removeEventListener('unload', (e) => {
    localStorage.removeItem('user_code')
    localStorage.removeItem('token')
    localStorage.removeItem('user_money')
  })
})
</script>

<style scoped lang="scss">
.header {
  width: calc(100% - 40px);
  height: 120px;
  padding: 33px 0;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(30px);
  z-index: 9;

  .header-content {
    width: 1200px;
    height: 54px;
    margin: 0 auto;

    .header-left {
      img {
        // width: 54px;
        height: 54px;
      }

      span {
        height: 42px;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 42px;
        letter-spacing: 2px;
        margin-left: 18px;
      }
    }

    .header-right {
      width: 500px;

      li {
        width: 125px;
        height: 33px;
        cursor: pointer;

        .active {
          color: #000;
        }

        p {
          width: 125px;
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #777777;
          line-height: 33px;
          letter-spacing: 2px;
          text-align: center;
        }

        img {
          width: 30px;
          height: 6px;
        }
      }
    }
  }
}

.foot-box {
  width: 1920px;
  height: 370px;
  background-color: black;

  .foot-content {
    width: 1000px;
    height: 370px;
    padding-top: 110px;

    .content-left {
      width: 576px;
    }

    .left-items {
      width: 251px;

      .pointer {
        width: 251px;
        height: 86px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 1px solid #ffffff;
        cursor: pointer;

        img {
          width: 34px;
          vertical-align: middle;
        }

        span {
          width: 154px;
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 28px;
          letter-spacing: 1px;
          vertical-align: middle;
        }
      }

      h3 {
        text-align: center;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 28px;
        letter-spacing: 1px;
        margin-top: 30px;
      }
    }

    .content-right {
      margin-left: 20px;
      color: #ffffff;

      h3 {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 45px;
        letter-spacing: 4px;
        margin-bottom: 30px;
      }

      h4 {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 33px;
        letter-spacing: 2px;
        margin-top: 20px;
      }
    }
  }

  .foot-bottom {
    margin-top: 184px;
    color: #ffffff;
    text-align: center;

    h3 {
      font-weight: 400;
      line-height: 17px;
      margin: 20px 0;
      font-size: 16px;
    }

    a {
      color: #ffffff;
    }
  }
}
</style>
