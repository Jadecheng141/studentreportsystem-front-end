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
            >登录</el-button>

            <div class="tips">
              <span style="margin-right: 20px">username: admin</span>
              <span> password: any</span>
            </div>
          </el-form>
          <div style="display: flex; justify-content: space-between;width: 80%;margin-bottom: 30px;">
            <el-button type="primary" plain @click="signupVisible = true">激活账号</el-button>
            <el-button plain @click="findpasswordVisible = true">忘记密码</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog class="signup-dialog" title="激活账号" :visible.sync="signupVisible" destroy-on-close @close="CloseSignupForm">
      <el-form ref="signupForm" :model="signupForm" :rules="signupRules" class="signup-form" label-width="80px" label-position="left">
        <el-form-item label="账号" prop="signupUsername">
          <el-input v-model="signupForm.signupUsername" placeholder="请输入账号" label-width="10px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" prop="signupUseraccount">
          <el-input v-model="signupForm.signupUseraccount" placeholder="请设置用户名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份证号" prop="signupId">
          <el-input v-model="signupForm.signupId" placeholder="请输入账号绑定身份证号" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="signupEmail">
          <el-input v-model="signupForm.signupEmail" placeholder="请设置绑定邮箱" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="signupVertificationCode">
          <el-input v-model="signupForm.signupVertificationCode" style="width: 25vh;" placeholder="请输入验证码" autocomplete="off" />
          <el-button style="margin-left: 28px;" type="primary" :disabled="!signupForm.signupEmail || signuppassportisDisabled" @click="sendsignuppassportEmail">{{ signuppassportbuttonText }}</el-button>
        </el-form-item>
        <el-form-item label="设置密码" prop="signupPassword">
          <el-input v-model="signupForm.signupPassword" placeholder="请设置登录密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="signupPasswordRepeat">
          <el-input v-model="signupForm.signupPasswordRepeat" placeholder="请再次输入密码" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CloseSignupForm">取 消</el-button>
        <el-button type="primary" @click="handleSignup">注 册</el-button>
      </div>
    </el-dialog>
    <el-dialog class="signup-dialog" title="忘记密码" :visible.sync="findpasswordVisible" destroy-on-close @close="ClosefindpasswordForm">
      <el-form ref="findpasswordForm" :model="findpasswordForm" :rules="findpasswordRules" class="findpassword-form" label-width="90px" label-position="left">
        <el-form-item label="账号" prop="Username">
          <el-input v-model="findpasswordForm.Username" placeholder="请输入账号" label-width="10px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="NewPassword">
          <el-input v-model="findpasswordForm.NewPassword" placeholder="请设置新密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="NewPasswordRepeat">
          <el-input v-model="findpasswordForm.NewPasswordRepeat" placeholder="请再次输入新密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="findpasswordForm.Email" placeholder="请输入绑定邮箱" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="VertificationCode">
          <el-input v-model="findpasswordForm.VertificationCode" style="width: 25vh;" placeholder="请输入验证码" autocomplete="off" />
          <el-button style="margin-left: 28px;" type="primary" :disabled="!findpasswordForm.Email || passportisDisabled" @click="sendpassportEmail">{{ passportbuttonText }}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ClosefindpasswordForm">取 消</el-button>
        <el-button type="primary" @click="handleFindPassword">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { signup, sendVerificationCode, findPassword } from '@/api/user'
import { validateEmail } from '@/utils/validate'
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
        username: '',
        password: ''
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
      redirect: undefined,
      signupVisible: false,
      findpasswordVisible: false,
      passportisDisabled: false,
      signuppassportisDisabled: false,
      passportremainingTime: 60,
      signuppassportremainingTime: 60,
      passportbuttonText: '发送验证码',
      signuppassportbuttonText: '发送验证码',
      passporttimer: null,
      signuppassporttimer: null,
      signupForm: {
        signupUsername: '',
        signupUseraccount: '',
        signupId: '',
        signupEmail: '',
        signupVertificationCode: '',
        signupPassword: '',
        signupPasswordRepeat: ''

      },
      findpasswordForm: {
        Username: '',
        NewPassword: '',
        NewPasswordRepeat: '',
        Email: '',
        VertificationCode: ''

      },
      signupRules: {
        signupUsername: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        signupUseraccount: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        signupId: [
          { required: true, message: '绑定身份证号不能为空', trigger: 'blur' }
        ],
        signupEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        signupVertificationCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        signupPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        signupPasswordRepeat: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      },
      findpasswordRules: {
        Username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        NewPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        NewPasswordRepeat: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ],
        Email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        VertificationCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]

      }

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
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 3000 // 设置消息显示时间为 3 秒
          })
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch((error) => {
          this.$message.error(error.message || '账号名与密码不匹配')
          this.loading = false
        })
    },

    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          if (this.signupForm.signupPassword !== this.signupForm.signupPasswordRepeat) {
            this.$message.error('两次输入的密码不一致')
            return
          }
          if (this.signupForm.signupEmail === '') {
            this.$message.error('邮箱不能为空！')
            return
          }
          if (!validateEmail(this.signupForm.signupEmail)) {
            this.$message.error('请输入正确的邮箱地址')
            return
          }
          const formData = new FormData()

          // 创建一个新的对象，不包括重复密码字段

          formData.append('studentId', this.signupForm.signupUsername)
          formData.append('username', this.signupForm.signupUseraccount)
          formData.append('idNumber', this.signupForm.signupId)
          formData.append('password', this.signupForm.signupPassword)
          formData.append('email', this.signupForm.signupEmail)
          formData.append('code', this.signupForm.signupVertificationCode)
          // 调用 API 发送注册请求
          signup(formData)
            .then(response => {
              if (response.data.status === 'success') {
                console.log('注册成功:', response)
                this.$message.success('注册成功')
              } else {
                this.$message.success('注册失败')
              }
            })
            .catch(error => {
              console.error('注册失败:', error)
              this.$message.error('注册失败，请重试')
            })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },

    // 发送注册邮箱验证码
    sendsignuppassportEmail() {
      if (this.signupForm.signupEmail === '') {
        this.$message.error('邮箱不能为空！')
        return
      }
      if (!validateEmail(this.signupForm.signupEmail)) {
        this.$message.error('请输入正确的邮箱地址')
        return
      }
      if (this.signuppassportbuttonText === '发送验证码') {
        // 执行你的业务逻辑
        console.log('执行业务逻辑')
        this.sendsignuppassportVerificationCode()
      }
      this.signuppassportisDisabled = true
      this.signuppassportremainingTime = 60
      this.signuppassportbuttonText = `${this.signuppassportremainingTime}s`

      this.signuppassporttimer = setInterval(() => {
        this.signuppassportremainingTime--
        this.signuppassportbuttonText = `${this.signuppassportremainingTime}s`

        if (this.signuppassportremainingTime <= 0) {
          clearInterval(this.signuppassporttimer)
          this.signuppassportisDisabled = false
          this.signuppassportbuttonText = '发送验证码'
        }
      }, 1000)
    },
    sendsignuppassportVerificationCode() {
      const formData = new FormData()
      formData.append('email', this.signupForm.signupEmail)
      console.log('Email:', this.signupForm.signupEmail)
      sendVerificationCode(formData)
        .then(() => {
          this.$message.success('验证码发送成功，请前往邮箱查看')
        })
        .catch(() => {
          this.$message.error('验证码发送失败，请联系网站负责人！')
        })
    },

    sendpassportEmail() {
      if (this.findpasswordForm.Email === '') {
        this.$message.error('邮箱不能为空！')
        return
      }
      if (!validateEmail(this.findpasswordForm.Email)) {
        this.$message.error('请输入正确的邮箱地址')
        return
      }
      if (this.passportbuttonText === '发送验证码') {
        // 执行你的业务逻辑
        console.log('执行业务逻辑')
        this.sendpassportVerificationCode()
      }
      this.passportisDisabled = true
      this.passportremainingTime = 60
      this.passportbuttonText = `${this.passportremainingTime}s`

      this.passporttimer = setInterval(() => {
        this.passportremainingTime--
        this.passportbuttonText = `${this.passportremainingTime}s`

        if (this.passportremainingTime <= 0) {
          clearInterval(this.passporttimer)
          this.passportisDisabled = false
          this.passportbuttonText = '发送验证码'
        }
      }, 1000)
    },
    sendpassportVerificationCode() {
      const formData = new FormData()
      formData.append('email', this.findpasswordForm.Email)
      console.log('Email:', this.findpasswordForm.Email)
      sendVerificationCode(formData)
        .then(() => {
          this.$message.success('验证码发送成功，请前往邮箱查看')
        })
        .catch(() => {
          this.$message.error('验证码发送失败，请联系网站负责人！')
        })
    },
    handleFindPassword() {
      this.$refs.findpasswordForm.validate(valid => {
        if (valid) {
          // 验证新密码是否一致
          if (this.findpasswordForm.NewPassword !== this.findpasswordForm.NewPasswordRepeat) {
            this.$message.error('两次输入的新密码不一致')
            return
          }
          if (this.findpasswordForm.Email === '') {
            this.$message.error('邮箱不能为空！')
            return
          }
          if (!validateEmail(this.findpasswordForm.Email)) {
            this.$message.error('请输入正确的邮箱地址')
            return
          }

          // 构造提交数据
          const formData = new FormData()

          formData.append('username', this.findpasswordForm.Username)
          formData.append('email', this.findpasswordForm.Email)
          formData.append('password', this.findpasswordForm.NewPassword)
          formData.append('code', this.findpasswordForm.VertificationCode)
          // 调用 API 发送找回密码请求
          findPassword(formData)
            .then(response => {
              if (response.data.status === 'success') {
                console.log('找回密码成功:', response)
                this.$message.success('找回密码成功')
                this.ClosefindpasswordForm()
              } else {
                this.$message.error('验证码错误')
              }
            })
            .catch(error => {
              console.error('找回密码失败:', error)
              this.$message.error('找回密码失败，请重试')
            })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },

    ClosefindpasswordForm() {
      this.findpasswordVisible = false // 关闭注册框
      if (this.passporttimer) {
        clearInterval(this.passporttimer)
      }
      this.passportisDisabled = false
      this.passportremainingTime = 60
      this.passportbuttonText = '发送验证码'
      // 重置表单内容
      this.findpasswordForm = {
        Username: '',
        NewPassword: '',
        NewPasswordRepeat: '',
        Email: '',
        VertificationCode: ''

      }
    },
    CloseSignupForm() {
      this.signupVisible = false // 关闭注册框
      if (this.signuppassporttimer) {
        clearInterval(this.signuppassporttimer)
      }
      this.signuppassportremainingTime = 60
      this.signuppassportbuttonText = '发送验证码'
      // 重置表单内容
      this.signupForm = {
        signupUsername: '',
        signupUseraccount: '',
        signupId: '',
        signupEmail: '',
        signupVertificationCode: '',
        signupPassword: '',
        signupPasswordRepeat: ''
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #585454;
$cursor: #6d6969;

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
    text-align: left;
  }
  .el-form-item__label {
  text-align: left; /* 将 label 文本左对齐 */
  margin-left: 5px;
  padding-left: 5px;
  padding-right: 5px;

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
  .signup-dialog{
    width: 75%;
    height: 100vh;
    padding: 50px 40px 50px 120px;
    margin: 0 auto;
  }
  .signup-form{
    height: 48vh;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;

  }
  .findpassword-form{
    height: 32vh;
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;

  }
  .dialog-footer{
     margin-top: 10px;
     margin-right: 20px;
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
