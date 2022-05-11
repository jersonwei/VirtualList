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
      <div class="msg">
        <h2>正在努力加载信息,请稍候</h2>
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
      allDataList: [
        {
          id: 1,
          title: '消式离号金究能非器型多技受中果手',
          image: 10,
          reads: 29082,
          from: '铁值共比总',
          data: '2013-03-08'
        },
        {
          id: 2,
          title: '象便求维第外往被温少划世情可增它效存',
          image: 10,
          reads: 93223,
          from: '八始且界员',
          data: '2001-07-27'
        },
        {
          id: 3,
          title: '准打大知料质收采确何通动治设会文称原林',
          image: 14,
          reads: 88684,
          from: '办率年通南听研效快',
          data: '1996-03-12'
        },
        {
          id: 4,
          title: '酸车达区约才应学值前光斯门委学置员较者上外',
          image: 13,
          reads: 13465,
          from: '参与族金而思立',
          data: '2004-04-04'
        },
        {
          id: 5,
          title: '节入到好且市委然果育县团民能土化物四力少',
          image: 1,
          reads: 24080,
          from: '了众土下火天强',
          data: '2019-07-25'
        },
        {
          id: 6,
          title: '听院族越类书军圆提价对林计亲外近',
          image: 3,
          reads: 90724,
          from: '清相族数自',
          data: '1988-11-10'
        },
        {
          id: 7,
          title: '拉较马打因求即开界连率保直张马带算员',
          image: 6,
          reads: 25594,
          from: '观消号界你查',
          data: '1970-02-03'
        },
        {
          id: 8,
          title: '力道子例育较战或强到办将后知常革圆车论现',
          image: 14,
          reads: 49722,
          from: '龙以和眼好习',
          data: '2001-04-06'
        },
        {
          id: 9,
          title: '风化关把列中看干先维分火主相选新者中些或器步须',
          image: 11,
          reads: 64347,
          from: '知以期',
          data: '1983-09-28'
        },
        {
          id: 10,
          title: '何价人物四制至果通分合史温战存几将机见团受',
          image: 5,
          reads: 29033,
          from: '常间林入',
          data: '1979-01-31'
        },
        {
          id: 11,
          title: '设具须天布小候须容在把少习外题应力题理却',
          image: 8,
          reads: 48206,
          from: '制这结就来约意',
          data: '1990-06-14'
        },
        {
          id: 12,
          title: '火亲维或路点具们很加起这济程科养者约教反想关',
          image: 7,
          reads: 56774,
          from: '且联选电',
          data: '1976-06-27'
        }
      ]
    }
  },
  created() {
    this.getNewsList(20)
  },
  methods: {
    // 获取新闻数据
    getNewsList(num) {
      this.$axios
        .get('http://localhost:4020/data?num=' + num)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.dir(err)
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
