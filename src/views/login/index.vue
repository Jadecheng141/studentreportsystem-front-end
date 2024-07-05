<template>
  <div class="login-container">
    <el-row :gutter="20" style="width:80%;">
      <el-col
        :span="12"
        style="
          height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <h1 class="my-1 mt-3" style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);letter-spacing: 2px;">欢迎进入新生入学报道信息管理系统</h1>
        <p class="mt-0 mb-2 my-1" style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);letter-spacing: 2px;">
          Hi, Welcome to the student report management system
        </p>
      </el-col>
      <el-col
        :span="12"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div
          class="bg-white"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">登 录</h3>
            </div>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 5px"
              @click.native.prevent="handleLogin"
            >Login</el-button>

            <div class="tips">
              <span style="margin-right: 20px">username: admin</span>
              <span> password: any</span>
            </div>
          </el-form>
          <div style="display: flex; justify-content: space-between;width: 80%;margin-bottom: 30px;">
            <el-button type="primary" plain>激活账号</el-button>
            <el-button plain>忘记密码</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '20221409',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      const requestData = new URLSearchParams()
      requestData.append('username', this.loginForm.username)
      requestData.append('password', this.loginForm.password)
      console.log('访问数据：', requestData)
      // 调用后端接口验证登录
      this.$axios.post('/login', requestData)
        .then(response => {
          // 后端返回验证结果
          if (response.status === 200) {
            console.log('登录成功')
            // 登录成功
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
          // 登录失败，处理错误逻辑
            console.log('Login failed:', response.data.message)
            this.loading = false
          }
        })
        .catch(error => {
          console.error('Login error:', error)
          this.loading = false
        })
    }
    // handleLogin() {
    //   this.loading = true
    //   this.$store
    //     .dispatch('user/login', this.loginForm)
    //     .then(() => {
    //       this.$router.push({ path: this.redirect || '/' })
    //       this.loading = false
    //     })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.bg-white {
  background-color: #ffffff; /* 白色背景 */
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center; /* 在水平方向上居中 */
  align-items: center; /* 在竖直方向上居中 */
  background-color: $bg;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-position: -50px 0;

  background: linear-gradient(
      to bottom,
      rgba(24, 70, 108, 0.4),
      rgba(22, 72, 113, 0.4)
    ),
    url('../../assets/background_images/login-bg.png') center/cover;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #4982cb;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
