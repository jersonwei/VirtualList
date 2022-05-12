<template>
  <div class="news-box">
    <div
      class="scroll-container"
      ref="scrollContainer"
      @scroll.passive="handleScroll"
    >
      <!-- 根据待显示新闻列表数据,显示新闻列表 -->
      <div :style="blankFillStyle">
        <div
          class="innerbox"
          v-for="(item, index) in showDataList"
          :key="index"
        >
          <router-link to="/article" class="innerbox">
            <div class="info" style="text-align: left">
              <p>{{ item.title }}</p>
              <p>{{ item.reads }}</p>
              <p>{{ item.from }}</p>
              <p>{{ item.data }}</p>
            </div>
            <div class="right">
              <img class="images" :src="imgsList[item.image]" alt="" />
            </div>
          </router-link>
        </div>
        <!-- 请求转态下 显示对应msg提示信息 -->
        <div v-if="isRequestStatus" class="msg">
          <h2>{{ msg }}</h2>
        </div>
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
      msg: '正在努力加载信息,请稍候',
      // 记录单条数据的高度
      oneHeight: 150,
      // 内容最大显示数量
      containSize: 0,
      // 记录滚动的第一个元素的索引
      startIdx: 0,
      // 记录当前滚动的距离顶部的位移
      currentScrollTop: 0
    }
  },
  // 根据getNewsList同步修改
  async created() {
    let newList = await this.getNewsList(30)
    if (!newList) return
    this.allDataList = newList
  },
  mounted() {
    // 获取最大高度
    console.log(this.$refs.scrollContainer.offsetHeight)
    // 最大内容数量
    console.log(
      ~~(this.$refs.scrollContainer.offsetHeight / this.oneHeight) + 2
    )
    // 渲染完成立刻获取
    this.getContainSize()
    // 窗口大小改变时事件绑定
    window.onresize = this.getContainSize
    // 屏幕翻转事件绑定
    window.ondeviceorientation = this.getContainSize
  },
  // 路由记录使用到keep alive的时候调用生命周期钩子
  activated() {},
  computed: {
    // 容器最后一个元素的索引
    endIdx() {
      let endIdx = this.startIdx + this.containSize * 2
      // 如果最后一个元素不存在,赋值为数组最后一项
      if (!this.allDataList[endIdx]) {
        endIdx = this.allDataList.length - 1
      }
      return endIdx
    },
    // 定义一个待显示的数组列表元素
    showDataList() {
      let startIdx = 0
      if (this.startIdx <= this.containSize) {
        startIdx = 0
      } else {
        startIdx = this.startIdx - this.containSize
      }
      return this.allDataList.slice(startIdx, this.endIdx)
    },
    // 定义上空白的高度
    // topBlankFill() {
    //   return this.startIdx * this.oneHeight
    // },
    // // 定义下空白的高度
    // bottomBlankFill() {
    //   return (this.allDataList.length - this.endIdx) * this.oneHeight
    // },
    blankFillStyle() {
      let startIdx = 0
      if (this.startIdx <= this.containSize) {
        startIdx = 0
      } else {
        startIdx = this.startIdx - this.containSize
      }
      return {
        paddingTop: startIdx * this.oneHeight + 'px',
        paddingBottom:
          (this.allDataList.length - this.endIdx) * this.oneHeight + 'px'
      }
    }
  },
  methods: {
    // 获取mock数据
    getNewsList(num) {
      this.isRequestStatus = true
      this.msg = '正在努力加载信息 请稍候!'
      // 修改getNewsList方法
      return this.$axios
        .get('http://localhost:4020/data?num=' + num)
        .then((res) => {
          console.log(res.data.list)
          //   this.allDataList = res.data.list
          this.isRequestStatus = false
          return res.data.list
        })
        .catch((err) => {
          console.dir(err)
          this.msg = '网络出错了,请检测网络情况!'
          return false
        })
    },
    // 计算容器最大容积
    getContainSize() {
      this.containSize =
        ~~(this.$refs.scrollContainer.offsetHeight / this.oneHeight) + 2
      console.log(this.containSize)
    },
    // 定义滚动行为事件方法
    handleScroll() {
      // 兼容低版本浏览器
      let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame
      let fps = 30
      let interval = 1000 / fps
      let then = Date.now()
      requestAnimationFrame(() => {
        let now = Date.now()
        this.setDataStartIdx()
        if (now - then >= interval) {
          then = now
          // 递归调用
          requestAnimationFrame(arguments.callee)
        }
      })
    },
    // 数据设置的相关任务,滚动事件的具体行为
    async setDataStartIdx() {
      let currentIdx = ~~(this.$refs.scrollContainer.scrollTop / this.oneHeight)
      if (currentIdx === this.startIdx) return
      //   console.log(this.$refs.scrollContainer.scrollTop)
      this.startIdx = currentIdx
      // 下拉至底再次请求
      if (
        this.startIdx + this.containSize > this.allDataList.length - 1 &&
        !this.isRequestStatus
      ) {
        console.log('滚动到了底部')
        let newList = await this.getNewsList(30)
        if (!newList) return
        this.allDataList = [...this.allDataList, ...newList]
      }
    }
  }
}
</script>
<style lang="less">
.news-box {
  width: 100%;
  height: 100%;
}
.scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
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
</style>
