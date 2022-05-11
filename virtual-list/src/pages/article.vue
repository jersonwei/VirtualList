<template>
  <div class="container">
    <router-link to="/">
      <img src="../assets/icons/bigUserHeader.png" alt=">>" />
      返回列表
    </router-link>
    <div class="content">
      <h2>静态资源文件</h2>
      <p class="info">
        <img src="../assets/icons/login.jpg" alt="" />
        <span>1995</span>
        <span>中国制造</span>
        <span>1995-05-19</span>
      </p>
      <img :src="imgsList[6]" alt="" />
      <p>这里是资料详情页面</p>
      <p>这里是资料详情页面</p>
      <img :src="imgsList[2]" alt="" />
      <p>这里是资料详情页面</p>
      <p>这里是资料详情页面</p>
      <img :src="imgsList[3]" alt="" />
      <p>这里是资料详情页面</p>
      <p>这里是资料详情页面</p>
      <img :src="imgsList[7]" alt="" />
      <p>这里是资料详情页面</p>
      <p>这里是资料详情页面</p>
      <img :src="imgsList[11]" alt="" />
      <p>这里是资料详情页面</p>
      <p>这里是资料详情页面</p>
    </div>
  </div>
</template>
<script>
import imgsList from '../components/newsImgs'
export default {
  data() {
    return {
      imgsList
    }
  }
}
</script>
<style lang="less"></style>
