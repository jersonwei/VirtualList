<template>
  <div class="news-box">
    <VituralScroll
      :msg="msg"
      :oneHeight="oneHeight"
      :requestUrl="requestUrl"
      :requestNum="requestNum"
      :moreRequestNum="moreRequestNum"
      v-slot:default="oneItem"
    >
      <router-link to="/article" class="innerbox">
        <div class="info" style="text-align: left">
          <p>{{ oneItem.thisItem.title }}</p>
          <p>{{ oneItem.thisItem.reads }}</p>
          <p>{{ oneItem.thisItem.from }}</p>
          <p>{{ oneItem.thisItem.data }}</p>
        </div>
        <div class="right">
          <img class="images" :src="imgsList[oneItem.thisItem.image]" alt="" />
        </div>
      </router-link>
    </VituralScroll>
  </div>
</template>
<script>
// 引入准备好的图片静态资源
import imgsList from '../components/newsImgs'
export default {
  data() {
    return {
      // 图片数组
      imgsList,
      // 请求数据提示信息
      msg: '正在努力加载信息,请稍候',
      // 记录单条数据的高度
      oneHeight: 150,
      // 请求数据的Url
      requestUrl: 'http://localhost:4020/data?num=',
      // 请求数据的条数
      requestNum: 30,
      // 下拉至底的请求数量
      moreRequestNum: 30
    }
  }
}
</script>
<style lang="less">
.news-box {
  width: 100%;
  height: 100%;
  .innerbox {
    text-decoration: none;
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    .info {
      width: 200px;
      height: 150px;
      margin-left: 5px;
      p {
        margin: 5px 0;
      }
    }
    .right {
      width: 180px;
      height: 150px;
      text-align: center;
      .images {
        line-height: 150px;
        width: 80px;
        height: 80px;
        vertical-align: middle;
      }
    }
  }
}
</style>
