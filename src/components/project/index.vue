<template>
  <div id="scene">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ projObj.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <section>
      <h3>{{ projObj.name }} | {{ projObj.id }}</h3>
      <img :src="projObj.logo" alt="" />
      <el-divider></el-divider>
      <el-carousel
        type="card"
        height="500px"
        :autoplay="false"
        indicator-position="outside"
      >
        <el-carousel-item>
          <div class="video-box">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
            ></video-player>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <el-card class="box-card">
            <div>
              <h1>项目概述</h1>
              <hr>
              <p>本项目由王成善院士与周成虎院士等领头的大科学计划，具体详情可参考</p>
              <a>http://www.ieexa.cas.cn/xwdt/zhxw/201903/t20190305_5249507.html</a>
              <h1>项目框架体系</h1>
              <hr>
              <ul>
                <li>Vue全家桶与Cesium搭建前端项目以及对三维可视化算法的实现</li>
                <li>nodeJs与Express完成后台服务项目，主要有单体模型服务，地形服务，3DTiles服务，配置服务</li>
                <li>mongodb与postgresql负责数据的存储</li>
              </ul>
            </div>
          </el-card>
        </el-carousel-item>
                <el-carousel-item>
          <el-card class="box-card">
            <div>
              <h1>项目概述</h1>
              <hr>
              <p>本项目由王成善院士与周成虎院士等领头的大科学计划，具体详情可参考</p>
              <a>http://www.ieexa.cas.cn/xwdt/zhxw/201903/t20190305_5249507.html</a>
              <h1>项目框架体系</h1>
              <hr>
              <ul>
                <li>Vue全家桶与Cesium搭建前端项目以及对三维可视化算法的实现</li>
                <li>nodeJs与Express完成后台服务项目，主要有单体模型服务，地形服务，3DTiles服务，配置服务</li>
                <li>mongodb与postgresql负责数据的存储</li>
              </ul>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 项目名称
      projName: this.$route.query.projName,
      // 取出来的项目信息
      projObj: null,
      // 项目信息列表
      projInfo: {
        deepEarth: {
          id: 'deepEarth',
          name: '深时数据地球'
        },
        video3D: {
          id: 'video3D',
          name: '视频与三维场景虚实融合系统'
        },
        holoMap: {
          id: 'holoMap',
          name: '全息地球'
        },
        globalGridSystem: {
          id: 'globalGridSystem',
          name: '全球离散格网系统'
        }
      },
      // section类
      sectionClass: [],
      // 播放参数
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '15:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: 'http://127.0.0.1:3000/users/readFile' // 视频url地址
          }
        ],
        poster: '../../static/img/deepEarthLogo.png', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  created() {
    this.projObj = this.projInfo[this.projName]
    // this.readFile()
  },
  watch: {
    // 采用watch监听路由,一旦发生变化就会触发该函数
    $route() {
      this.sectionClass.length = 0
      this.projName = this.$route.query.projName
      this.sectionClass.push('animated', 'myRotate')
      console.log(this.sectionClass)
    },
    projName(curVal) {
      this.projObj = this.projInfo[curVal]
    }
  },
  methods: {
    async readFile() {
      const data = await this.$http.get('/users/readFile')
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
#scene {
  section {
    width: 75%;
    height: 500px;
    margin: 0 auto;

    h3 {
      text-align: center;
    }
  }
}
/deep/ .el-carousel__item {
  display: flex;
  flex-flow: column;
  justify-content: center;
}

/deep/ .el-card {
  background: #c9ffbf; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffafbd,
    #c9ffbf
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffafbd,
    #c9ffbf
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
