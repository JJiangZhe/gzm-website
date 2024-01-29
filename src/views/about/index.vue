<template>
  <div class="about-page flex flex-col items-center">
    <div class="about-content flex flex-col items-center">
      <div class="box flex flex-col items-center">
        <h3>关于公主喵</h3>
        <div class="text">
          公主喵由浙江完梦网络科技有限公司开发，办公室地址位于浙江省会，人间天堂杭州，中国(浙江)自由贸易试验区杭州市滨江区西兴街道滨康路101号7幢2401室，于2021年03月22日在杭州市高新区(滨江)市场监督管理局注册成立，注册资本为2000（万元），在公司发展壮大的1年里，我们始终为客户提供好的产品和技术支持、健全的售后服务，我公司主要经营许可项目：第二类增值电信业务(依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以审批结果为准)。一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；信息技术咨询服务；软件开发；软件外包服务(除依法须经批准的项目外，凭营业执照依法自主开展经营活动)。我们有好的产品和专业的销售和技术团队，公司属于杭州电信黄页行业，如果您对我公司的产品服务有兴趣，期待您来电咨询。
        </div>
      </div>
      <div class="box flex flex-col items-center">
        <h3>企业地址</h3>
        <div class="map-box">
          <el-bmap
            ref="mapRef"
            :min-zoom="10"
            :max-zoom="22"
            :tilt="tilt"
            :heading="heading"
            :center="center"
            :zoom="zoom"
            @init="init"
          >
            <el-bmap-marker :position="center" @click="openWind"></el-bmap-marker>
            <el-bmap-info-window v-model:visible="visible" :width="200" :height="100" :position="center">
              <span>{{ content }}</span>
            </el-bmap-info-window>
          </el-bmap>
        </div>
      </div>
      <div class="box flex flex-col items-center">
        <h3>联系我们</h3>
        <div class="contact flex justify-between items-center">
          <div class="item_info flex flex-center">
            <img src="@/assets/phone.png" alt="" />
            <div>
              <h4>联系方式</h4>
              <span>15669989310</span>
            </div>
          </div>
          <div class="item_info flex flex-center">
            <img src="@/assets/emil.png" alt="" />
            <div>
              <h4>商务合作</h4>
              <span>邮箱：dwan2023@163.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pageScorllTop } from '@/utils'

const zoom = ref(18)
const center = ref([120.22907742391197, 30.187182978435956])
const tilt = ref(60)
const heading = ref(0)
const visible = ref(true)
const content = '中国(浙江)自由贸易试验区杭州市滨江区西兴街道滨康路101号7幢2401室'
const mapRef = ref()
pageScorllTop()
const init = (e) => {
  console.log('初始化成功')
}
const openWind = () => {
  visible.value = true
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
