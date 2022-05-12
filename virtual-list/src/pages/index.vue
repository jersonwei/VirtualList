<template>
  <div class="news-box">
    <VituralScroll
      :msg="msg"
      :oneHeight="oneHeight"
      :requestUrl="requestUrl"
      :requestNum="requestNum"
    ></VituralScroll>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 请求数据提示信息
      msg: '正在努力加载信息,请稍候',
      // 记录单条数据的高度
      oneHeight: 150,
      // 请求数据的Url
      requestUrl: 'http://localhost:4020/data?num=',
      // 请求数据的条数
      requestNum: 30
    }
  }
}
</script>
<style lang="less">
.news-box {
  width: 100%;
  height: 100%;
}
</style>
