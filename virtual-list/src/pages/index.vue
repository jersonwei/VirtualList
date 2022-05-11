<template>
  <div class="news-box">
    <div class="scroll-container">
      <!-- 根据待显示新闻列表数据,显示新闻列表 -->
      <div v-for="(item, index) in allDataList" :key="index">
        <router-link to="/article" class="one-new">
          <div class="new-left">
            <h3>{{ item.title }}</h3>
            <div class="info">
              <p>
                <span>{{ item.reads }}</span>
                <span>{{ item.from }}</span>
              </p>
              <h4>{{ item.data }}</h4>
            </div>
          </div>
          <!-- 新闻右侧图片 -->
          <div class="new-right">
            <img class="images" :src="imgsList[item.image]" alt="PIC" />
          </div>
        </router-link>
      </div>
      <!-- 请求转态下 显示对应msg提示信息 -->
      <div v-if="isRequestStatus" class="msg">
        <h2>{{ msg }}</h2>
      </div>
    </div>
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
      // 用来保存,所有列表元素
      allDataList: [],
      // 数据请求状态
      isRequestStatus: true,
      // 请求数据提示信息
      msg: '正在努力加载信息,请稍候'
    }
  },
  created() {
    this.getNewsList(20)
  },
  methods: {
    // 获取mock数据
    getNewsList(num) {
      this.isRequestStatus = true
      this.msg = '正在努力加载信息 请稍候!'
      this.$axios
        .get('http://localhost:4020/data?num=' + num)
        .then((res) => {
          console.log(res.data.list)
          this.allDataList = res.data.list
          this.isRequestStatus = false
        })
        .catch((err) => {
          console.dir(err)
          this.msg = '网络出错了,请检测网络情况!'
        })
    }
  }
}
</script>
<style lang="less">
.news-box {
  width: 100%;
  max-width: 800px;
  height: 100%;
  .scroll-container {
    width: 100%;
    height: 100%;
    .one-new {
      display: block;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 14px 10px 5px;
      text-decoration: none;
      .new-left {
        height: 80px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 16px;
          text-align: justify;
          color: #666;
        }
        .info {
          width: 100%;
          margin-top: 60px;
          text-align: left;
        }
      }
      .new-right {
        width: 200px;
        height: 150px;
        text-align: center;
        .images {
          line-height: 100%;
          width: 140px;
          height: 140px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
