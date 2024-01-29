<template>
  <div class="main-page">
    <div class="main-content">
      <swiper :modules="[Mousewheel]" :mousewheel="{ releaseOnEdges: true }" direction="vertical" class="my-swiper">
        <swiper-slide v-for="item in list" :key="item.name">
          <div class="swiper-img">
            <img :src="getImageUrl(item.name)" alt="" />
            <div v-if="item.name === 'first'" id="mystyle">
              <img :src="getImageUrl('ios')" alt="" @click="openWind('//dw.33eb.cn/upykag')" />
              <img :src="getImageUrl('adr')" alt="" @click="openWind('//statics.xiapaolong.com/app/gzm.apk')" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { getImageUrl, pageScorllTop } from '@/utils'
// 引入swiper组件
import { Swiper, SwiperSlide } from 'swiper/vue'
// 引入swiper样式（按需导入）
import 'swiper/css'
// 引入swiper核心和所需模块
import { Mousewheel } from 'swiper'
pageScorllTop()

// 图片数据
// , { name: 'second' }
const list = [{ name: 'first' }, { name: 'three' }, { name: 'four' }, { name: 'five' }]
const openWind = (url) => {
  window.open(url, '_blank')
}
</script>
<style lang="scss" scoped>
@import './style.scss';

#mystyle {
  position: absolute;
  left: 310px;
  top: 635px;
  width: 600px;
  height: 68px;

  img {
    width: 240px;
    height: 68px;
    margin-right: 60px;
  }
}
</style>
