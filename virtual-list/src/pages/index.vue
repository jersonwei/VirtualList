<template>
  <div class="news-box">
    <div
      class="scroll-container"
      ref="scrollContainer"
      @scroll.passive="handleScroll"
    >
      <!-- 根据待显示新闻列表数据,显示新闻列表 -->
      <div class="blankbox" :style="blankFillStyle">
        <div v-for="(item, index) in showDataList" :key="index">
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
      oneHeight: 120,
      // 内容最大显示数量
      containSize: 0,
      // 记录滚动的第一个元素的索引
      startIdx: 0,
      // 记录当前滚动有效的状态
      isScrollStatus: true
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
  computed: {
    // 容器最后一个元素的索引
    endIdx() {
      let endIdx = this.startIdx + this.containSize
      // 如果最后一个元素不存在,赋值为数组最后一项
      if (!this.allDataList[endIdx]) {
        endIdx = this.allDataList.length
      }
      return endIdx
    },
    // 定义一个待显示的数组列表元素
    showDataList() {
      return this.allDataList.slice(this.startIdx, this.endIdx)
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
      return {
        paddingTop: this.startIdx * this.oneHeight + 'px',
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
    async handleScroll() {
      if (this.isScrollStatus) {
        this.isScrollStatus = false
        // 设置一个定时器,一秒后才执行下次滚动事件
        console.log('触发事件')
        let mytimer = setTimeout(() => {
          this.isScrollStatus = true
          clearTimeout(mytimer)
        }, 1000)
        let currentIdx = ~~(
          this.$refs.scrollContainer.scrollTop / this.oneHeight
        )
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
    overflow-y: auto;
    .one-new {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 14px 10px 5px;
      text-decoration: none;
      .new-left {
        height: 80px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 15px;
          text-align: justify;
          color: #666;
        }
        .info {
          width: 100%;
          text-align: left;
        }
      }
      .new-right {
        width: 200px;
        height: 100px;
        text-align: center;
        .images {
          line-height: 100%;
          width: 80px;
          height: 80px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
