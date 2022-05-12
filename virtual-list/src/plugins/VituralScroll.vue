<template>
  <div
    class="scroll-container"
    ref="scrollContainer"
    @scroll.passive="handleScroll"
  >
    <!-- 根据待显示新闻列表数据,显示新闻列表 -->
    <div :style="blankFillStyle">
      <div class="innerbox" v-for="(item, index) in showDataList" :key="index">
        <slot :thisItem="item"></slot>
      </div>
      <!-- 请求转态下 显示对应msg提示信息 -->
      <div v-if="isRequestStatus" class="msg">
        <h2>{{ msg }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      default: () => '正在努力加载信息,请稍候',
      type: String
    },
    oneHeight: {
      default: () => 150,
      type: Number
    },
    requestUrl: {
      default: () => 'http://localhost:4020/data?num=',
      type: String
    },
    requestNum: {
      default: () => 30,
      type: Number
    },
    moreRequestNum: {
      default: () => 30,
      type: Number
    }
  },
  data() {
    return {
      // 图片数组
      //   imgsList,
      // 用来保存,所有列表元素
      allDataList: [],
      // 数据请求状态
      isRequestStatus: true,
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
    let newList = await this.getNewsList(this.requestNum)
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
  activated() {
    this.$nextTick(() => {
      this.$refs.scrollContainer.scrollTop = this.currentScrollTop
    })
  },
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
      //   this.msg = '正在努力加载信息 请稍候!'
      // 修改getNewsList方法
      return this.$axios
        .get(this.requestUrl + num)
        .then((res) => {
          console.log(res.data.list)
          //   this.allDataList = res.data.list
          this.isRequestStatus = false
          return res.data.list
        })
        .catch((err) => {
          console.dir(err)
          //   this.msg = '网络出错了,请检测网络情况!'
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
      this.currentScrollTop = this.$refs.scrollContainer.scrollTop
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
        let newList = await this.getNewsList(this.moreRequestNum)
        if (!newList) return
        this.allDataList = [...this.allDataList, ...newList]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
