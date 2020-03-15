<template>
  <div id="scene">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="blogContainer">
      <div
        v-for="item in blogs"
        :key="item._id"
        class="square"
        v-show="!isShowMoreInfo"
      >
        <span></span>
        <span></span>
        <span></span>
        <div class="content">
          <h1>{{ item.title }}</h1>
          <p>{{ item.description }}</p>
        </div>
        <a href="#" class="moreInfo" @click="showMoreInfo(item.html, item.title)"
          >Read More</a
        >
      </div>
      <el-card class="box-card" v-show="isShowMoreInfo">
        <div slot="header" class="clearfix">
          <i class="el-icon-back" @click="backSimpleInfo"></i>
        </div>
        <div v-html="moreInfo"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 博客数据
      blogs: [],
      // 是否显示详细信息
      isShowMoreInfo: false,
      // 显示的详细博客数据
      moreInfo: ''
      // 显示的详细博客的标题
      // moreInfoTitle: 'test'
    }
  },
  created() {
    this.getBlogs()
  },
  methods: {
    async getBlogs() {
      const { data: res } = await this.$http.get('/users/getBlogs')
      if (res.status !== 200) {
        this.$message({
          type: 'warning',
          message: '获取博客信息失败'
        })
      } else {
        this.blogs = res.docs
      }
    },
    // 显示详细信息
    showMoreInfo(moreInfo, moreInfoTitle) {
      this.isShowMoreInfo = true
      this.moreInfo = ''
      this.moreInfo = moreInfo
      // this.moreInfoTitle = moreInfoTitle
    },
    // 返回简略信息
    backSimpleInfo() {
      this.isShowMoreInfo = false
      this.moreInfo = ''
    }
  }
}
</script>

<style lang="less" scoped>
#scene {
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    border-radius: 0 18% 18% 0;
    width: 15%;
    height: 40px;
    line-height: 40px;
    color: #000;
    background: #00caca;
    opacity: 1; /** 若父元素存在opacity属性，则会影响子元素，及时子元素的opacity使1.0，也是在父元素的opacity基础上设置的 */
  }
  #blogContainer {
    width: 97%;
    margin: 20px auto;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    flex-flow: wrap;

    .square {
      position: relative;
      width: 400px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
      flex-flow: column;

      span:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 48% 65% 43% 60%;
        transition: 0.5s;
        animation: a1 6s linear infinite;
      }

      span:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 48% 65% 43% 60%;
        transition: 0.5s;
        animation: a2 4s linear infinite;
      }

      span:nth-child(3) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 48% 65% 43% 60%;
        transition: 0.5s;
        animation: a1 10s linear infinite;
      }

      .content {
        position: relative;
        padding: 40px 60px;
        color: #fff;
        text-align: center;
        transition: 0.5s;
        z-index: 1000;
      }
    }

    .square:hover > span {
      border: none;
      background: rgba(0, 0, 255, 0.8);
    }
  }
}

#blogContainer::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
#blogContainer::-webkit-scrollbar-thumb {
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
#blogContainer::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.moreInfo {
  position: relative;
  // display: inline-block;
  margin-top: 10px;
  border: 2px solid #fff;
  padding: 6px 18px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  border-radius: 73% 27% 44% 56%;
}

.moreInfo:hover {
  background: #fff;
  color: #333;
}
/** 使用deep 对子组件中元素进行选择 */
/deep/ .el-card {
  width: 85%;
  background: #636e72;

  .el-card__header {
    padding: 9px 20px;

    i {
      cursor: pointer;
    }
  }

  .el-card__body {
    h1 {
      text-align: center;
      color: #333;
      font-family: Helvetica;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
    }
    h1::after {
      content: '';
      color: yellow;
    }
  }
}
</style>
