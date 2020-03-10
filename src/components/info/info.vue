<template>
  <div id="scene">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <section>
      <h3>关于我 | About Me</h3>
      <div id="baseInfoConatiner">
        <el-divider content-position="left">基本信息</el-divider>
        <div id="baseContainer">
          <span v-for="item in baseInfoChina" :key="item.name">{{item.key}}:&nbsp;{{item.value}}</span>
          <span></span>
        </div>
      </div>
      <div id="schoolContainer">
        <el-divider content-position="left">就学经历</el-divider>
        <el-row>
          <el-col :span="8" v-for="item in schoolExperience" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" :class="item.mClass">
              <img :src="item.src" class="image" v-show="!item.isShowInfo" />
              <div style="padding: 14px;" v-show="!item.isShowInfo">
                <span>{{ item.info }}</span>
                <div class="bottom clearfix">
                  <time class="time">入学日期：{{ item.enterTime }}</time>
                  <el-button
                    type="text"
                    class="button"
                    @click="cardSwitch(item.method, item.mClass)"
                  >更多信息</el-button>
                </div>
              </div>
              <div slot="header" class="clearfix" v-if="item.isShowInfo">
                <el-page-header @back="cardSwitch(item.method, item.mClass)" :content="item.name"></el-page-header>
              </div>
              <el-steps direction="vertical" :active="2" v-show="item.isShowInfo">
                <el-step
                  v-for="childItem in item.moreInfos"
                  :title="childItem.name"
                  :key="childItem.name"
                  :description="childItem.value"
                ></el-step>
              </el-steps>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 个人基本信息对象
      baseInfo: {},
      // 就学经历信息对象
      schoolExperience: []
    }
  },
  created() {
    this.getBaseInfo()
    this.getSchoolExpInfo()
  },
  methods: {
    // FIXME:要给v-for中每一个按钮绑定各自的事件需要以下几个步骤
    // 1. 在v-for绑定的数组对象中每个元素都添加一个method字段，制定click要绑定的对象，类似于方法路由
    // 2. 在methods注册一个路由分发函数
    // 3. @click绑定这个路由分发函数，并把method字段传入
    // 4. 在路由分发函数中将传入的method字段，采用this[method]指向对应的函数
    cardSwitch(methodName, classArr) {
      this[methodName](classArr)
    },
    njnuSwitch(classArr) {
      classArr.length = 0
      classArr.push('animated', 'myRotate')
      this.schoolExperience[0].isShowInfo = !this.schoolExperience[0].isShowInfo
    },
    nnuSwitch(classArr) {
      classArr.length = 0
      classArr.push('animated', 'myRotate')
      this.schoolExperience[1].isShowInfo = !this.schoolExperience[1].isShowInfo
    },
    async getBaseInfo() {
      const { data: res } = await this.$http.get('/users/baseInfo')
      if (res.status !== 200) {
        this.$message({
          type: 'warning',
          message: '获取基本信息失败'
        })
      } else {
        this.baseInfo = res.docs[0]
      }
    },
    async getSchoolExpInfo() {
      const { data: res } = await this.$http.get('/users/schoolExpInfo')
      if (res.status !== 200) {
        this.$message({
          type: 'warning',
          message: '获取就学经历信息失败'
        })
      } else {
        this.schoolExperience = res.docs
        for (const elem of this.schoolExperience) {
          elem.enterTime = elem.enterTime.split('T')[0]
        }
      }
    }
  },
  computed: {
    baseInfoChina() {
      return [
        { key: '姓名', value: this.baseInfo.name },
        { key: '年龄', value: this.baseInfo.age },
        { key: '联系方式', value: this.baseInfo.tel },
        { key: '邮箱', value: this.baseInfo.email },
        { key: '学历', value: this.baseInfo.education },
        { key: '籍贯', value: this.baseInfo.home },
        { key: '毕业院校', value: this.baseInfo.school }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#scene {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 100%;
  overflow: hidden;
  .el-breadcrumb {
    flex: 1;
  }
  section {
    flex: 14;
    width: 75%;
    height: 500px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    h3 {
      text-align: center;
      flex: 2;
    }
    #baseInfoConatiner {
      flex: 2;
    }
    #schoolContainer {
      flex: 14;
      height: 90%;
    }
  }
}

#baseContainer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  span {
    display: block;
    margin-top: 5px;
    box-sizing: border-box;
  }
  span:nth-of-type(odd) {
    width: 60%;
    padding-left: 20px;
  }
  span:nth-of-type(even) {
    width: 40%;
  }
}

#schoolContainer {
  box-sizing: border-box;
  img {
    height: 240px;
    display: block;
  }
  .el-col {
    padding: 0 56px 10px;
    height: 345px;
  }
}
.el-row {
  div:nth-of-type(2) {
    padding-left: 120px;
  }
}
.el-card {
  height: 100%;
  background: #abbaab; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #abbaab
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #abbaab
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  opacity: 0.8;

  .el-card__header {
    height: 17%;
  }
  .el-card__body {
    height: 83%;
    .el-steps {
      padding-left: 10px;
    }
  }
}
.el-steps {
  margin: 10px;
  height: 180px;
}
.el-step:nth-child(2) {
  padding-left: 0px !important;
}
</style>
