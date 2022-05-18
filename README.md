# VirtualList component

* 对于样式重复且定高的页面结构,基于屏幕的最大容量及高度根据计算属性动态获取底部的索引及动态计算上下缓冲区
```  computed: {
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
    // 定义上下留白高度
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
  ```
  * 使用动画帧及节流方式对滚动事件进行优化
  ```bash
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
```
* 组件封装抽离,使用作用域插槽将可定义的数据可由父组件自定义传入
```js
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
  }
  .........................
  <=========================================================================================================================>
   <slot :thisItem="item"></slot>
   ..........
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
 ```
