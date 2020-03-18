<template>
  <div id="scene">
    <section>
      <aside>
        <!--头部区-->
        <header>
          <img src="../assets/login.svg" alt="头像" />
        </header>
        <!--导航区-->
        <nav>
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            router
            :collapse="isCollapse"
            collapse-transition
          >
            <el-menu-item :index="'/info'">
              <template slot="title">
                <span class="iconfont icon-geren13"></span>
                <span>个人信息</span>
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span class="iconfont icon-xiangmubu"></span>
                <span slot="title">项目经历</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item :index="'/project?projName=deepEarth'"
                  >深时数字地球</el-menu-item
                >
                <el-menu-item index="/project?projName=video3D"
                  >视频与三维场景虚实融合系统</el-menu-item
                >
                <el-menu-item index="/project?projName=holoMap"
                  >全息地球系统</el-menu-item
                >
                <el-menu-item index="/project?projName=globalGridSystem"
                  >全球离散格网系统</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="'/skill'">
              <span class="iconfont icon-jinengtechang--"></span>
              <span slot="title">个人技能</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <span class="iconfont icon-wenzhang-copy"></span>
                <span slot="title">个人博客</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item :index="'/uploadBlog'">上传博客</el-menu-item>
                <el-submenu :index="'/myBlog'">
                  <template slot="title">
                    <span slot="title">我的博客</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item :index="'/BlogInit'">首页</el-menu-item>
                    <el-menu-item :index="'/BlogTag'">标签</el-menu-item>
                    <el-menu-item :index="'/BlogSearch'">搜索</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="'/cesium'">
              <span class="iconfont icon-diqiu"></span>
              <span slot="title">cesium测试平台</span>
            </el-menu-item>
          </el-menu>
        </nav>
      </aside>
      <article>
        <router-view></router-view>
      </article>
    </section>
  </div>
</template>

<script>
import canvasInit from '../assets/js/canvasBackground.js'

export default {
  mounted() {
    // 配置
    var config = {
      vx: 4, // 点x轴速度,正为右，负为左
      vy: 4, // 点y轴速度
      height: 2, // 点高宽，其实为正方形，所以不宜太大
      width: 2,
      count: 100, // 点个数
      color: '0, 0, 255', // 点颜色
      stroke: '0,0,255', // 线条颜色
      dist: 6000, // 点吸附距离
      e_dist: 20000, // 鼠标吸附加速距离
      max_conn: 10 // 点到点最大连接数
    }
    // 调用
    canvasInit(config)
  },
  created() {
    this.getList()
  },
  data() {
    return {
      // 导航菜单的显示与否
      isCollapse: false
    }
  },
  methods: {
    async getList() {
      const { res: data } = await this.$http.get('/users/navList')
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
#scene {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  section {
    width: 100%;
    height: 300px;
    flex: 1;
    display: flex;
    aside {
      height: 100%;
      width: 100px;
      opacity: 0.6;
      background: linear-gradient(#243949, #517fa4);
      flex: 1;
      display: flex;
      flex-flow: column;

      header {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        margin: 50px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }

      nav {
        width: 100%;
        height: 300px;
        flex: 1;
        overflow: auto;
      }
    }

    aside:hover {
      opacity: 0.8;
    }

    article {
      height: 100%;
      width: 500px;
      background: linear-gradient(
        -90deg,
        rgba(41, 189, 217, 0.5) 0%,
        rgba(39, 106, 206, 0.5) 100%
      );
      flex: 5;
    }
  }
  article {
    overflow: auto;
  }
}

.el-menu--collapse {
  width: 70px;
}
.el-radio-group {
  display: flex;
  justify-content: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}

nav::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
nav::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #70e1f5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffd194,
    #70e1f5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffd194,
    #70e1f5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
nav::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
