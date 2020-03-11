<template>
  <div class="loginContainer">
    <div :class="initLogoContainerClass">
      <div class="logoContainer">
        <p class="logoFont">Symbol Me</p>
      </div>
      <div class="yearContainer">
        <p class="logoFont">2020</p>
      </div>
    </div>
    <div :class="loginBoxClass" v-show="showLoginBox">
      <!--头像区域-->
      <div class="avatarBox">
        <img src="../assets/login.svg" alt="头像" />
      </div>
      <!--登录表单区-->
      <!--为表单添加验证规则
             1.在el-form上添加绑定属性rules，绑定相应的规则;
             2.在vm实例上的data中添加相应的规则对象:loginFormRules
      3.为el-form-item添加prop只想规则对象中相应的规则-->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="loginForm"
        :model="loginFormData"
        :rules="loginFormRules"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <!--使用阿里的icon-->
          <el-input
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
            v-model="loginFormData.username"
            clearable
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
            v-model="loginFormData.password"
            clearable
          ></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <!--使用自定义指令，防止触发两次post请求-->
          <el-button type="primary" v-btn-control="login" :loading="isLoading"
            >登录</el-button
          >
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      icon="el-icon-arrow-down"
      class="downUpButton downButton"
      @click="showLogin"
      v-if="showDown"
    ></el-button>
    <el-button
      icon="el-icon-arrow-up"
      class="downUpButton upButton animated bounceInUp delay-500ms"
      v-else
    ></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // logo包含框
      initLogoContainerClass: ['initLogoContainer'],
      // 登录框样式类
      loginBoxClass: ['loginBox'],
      // 登录框是否显示
      showLoginBox: false,
      // 显示下拉or上拉
      showDown: true,
      // 登录表单的数据
      loginFormData: {
        username: '',
        password: ''
      },
      // 这是登录表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' }, // 失去焦点blur时触发
          { min: 6, max: 15, message: '长度在6-15个字符之间', trigger: 'blur' }
        ]
      },
      // 按钮是否在等待响应
      isLoading: false
    }
  },
  methods: {
    showLogin() {
      this.initLogoContainerClass.push('animated', 'bounceOutUp')
      this.loginBoxClass.push('animated', 'bounceInUp', 'delay-500ms')
      this.showLoginBox = true
      this.showDown = false
    },
    async login() {
      this.isLoading = true
      const { data: res } = await this.$http
        .post('/index/login', this.loginFormData)
        .catch(err => {
          console.log(err)
          this.$message({
            message: '用户不存在',
            type: 'warning'
          })
        })
      if (res.status === 200) {
        sessionStorage.setItem('authorization', res.token) // 将token存入sessionstorage
        this.$router.push('/home')
      } else {
        this.$message({
          message: '用户不存在',
          type: 'warning'
        })
      }
      this.isLoading = false
      return new Promise((resolve, reject) => {
        resolve('响应结束')
      })
    }
  },
  directives: {
    focus: {
      inserted: el => {
        el.firstElementChild.focus()
      }
    }
  },
  created() {
    document.getElementById('loading').style.display = 'none'
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../assets/background.jpg') no-repeat center center;
  background-size: cover;
  overflow: hidden;

  .initLogoContainer {
    position: relative;
    top: 33%;
    left: 25%;
    width: 50%;
    height: 30%;
    float: left; /**float必须配合position使用 */
  }
  .logoContainer {
    position: relative;
    width: 40%;
    height: 80%;
    border: 5px solid #edff;
    margin: 0;
    left: 7%;
    float: left;
  }
  .logoContainer::before {
    content: '';
    position: absolute;
    right: 30%;
    bottom: 0%;
    width: 5%;
    height: 10%;
    background: #edff;
  }

  .yearContainer {
    position: relative;
    float: right;
    right: 7%;
    width: 40%;
    height: 80%;
  }

  .downUpButton {
    position: absolute;
    margin: auto;
    background: #19f8f900;
    border: none;
    font-size: 71px; /**可以控制icon图标的大小 */
    color: #fff;
  }

  .downButton {
    left: 0;
    right: 0;
    bottom: 5%;
  }

  .upButton {
    left: 0;
    right: 0;
    top: 3%;
  }
}
.logoFont {
  font-family: 'logoFont' !important;
  font-size: 72px;
  margin: 8% auto;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.loginBox {
  width: 450px;
  height: 300px;
  background-color: rgba(87, 107, 216, 0.533);
  border-radius: 3px;
  position: absolute; /**居中显示 */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .avatarBox {
    height: 130px;
    width: 130px;
    border: 2px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.loginForm {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box; /***使input限制在div内 */
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
