<template>
  <div class="app-container">
    <div class="container">
      <div class="header">
        <h1>基本信息录入</h1>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label class="photolabel" for="photo">照片:</label>
            <el-upload
              class="avatar-uploader"
              action=" "
              :http-request="uploadFile"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <div class="form-group">
            <label for="name">姓名:</label>
            <input id="name" v-model="form.name" type="text" required>
          </div>
          <div class="form-group">
            <label for="gender">性别:</label>
            <select id="gender" v-model="form.gender" required>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dob">出生日期:</label>
            <input id="dob" v-model="form.dob" type="date" required>
          </div>
          <div class="form-group">
            <label for="contact">联系方式:</label>
            <input id="contact" v-model="form.contact" type="text" required>
          </div>
          <div class="form-group">
            <label for="address">家庭住址:</label>
            <input id="address" v-model="form.address" type="text" required>
          </div>
          <div class="form-group">
            <label for="college">学院:</label>
            <input id="college" v-model="form.college" type="text" required>
          </div>
          <div class="form-group">
            <label for="class">班级:</label>
            <input id="class" v-model="form.class" type="text" required>
          </div>
          <div class="form-group">
            <label for="idCard">身份证号:</label>
            <input id="idCard" v-model="form.idCard" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">邮箱:</label>
            <input id="email" v-model="form.email" type="email" required>
          </div>

          <div class="form-group">
            <label for="fatherName">父亲姓名:</label>
            <input id="fatherName" v-model="form.fatherName" type="text" required>
          </div>
          <div class="form-group">
            <label for="fatherContact">父亲联系电话:</label>
            <input id="fatherContact" v-model="form.fatherContact" type="text" required>
          </div>
          <div class="form-group">
            <label for="motherName">母亲姓名:</label>
            <input id="motherName" v-model="form.motherName" type="text" required>
          </div>
          <div class="form-group">
            <label for="motherContact">母亲联系电话:</label>
            <input id="motherContact" v-model="form.motherContact" type="text" required>
          </div>
          <div class="form-group">
            <label for="emergencyContactName">紧急联系人姓名:</label>
            <input id="emergencyContactName" v-model="form.emergencyContactName" type="text" required>
          </div>
          <div class="form-group">
            <label for="emergencyContactNumber">紧急联系人联系电话:</label>
            <input id="emergencyContactNumber" v-model="form.emergencyContactNumber" type="text" required>
          </div>
          <div class="captchaForm-container">
            <form class="captchaInput-container" @submit.prevent="submitInfo">
              <input v-model="captchaInput" placeholder="输入验证码" required>
            </form>
            <div class="captcha-container">
              <img :src="captchaUrl" alt="验证码" @click="refreshCaptcha">
              <button @click="refreshCaptcha">刷新验证码</button>
            </div>
          </div>
          <button type="submit" class="submit-button" @click="submitInfo">提交</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { submitReportInfo } from '@/api/reportinfo'
export default {
  data() {
    return {
      form: {
        name: '',
        gender: '',
        dob: '',
        contact: '',
        address: '',
        college: '',
        class: '',
        idCard: '',
        email: '',
        fatherName: '',
        fatherContact: '',
        motherName: '',
        motherContact: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        photo: null
      },
      selectedFile: null,
      convertedBlob: null, // 转换后的 Blob 对象
      imageUrl: null, // 用于保存图片的 URL 以便预览 // 用于保存选中的图片
      captchaUrl: '/api/information/captcha', // 初始验证码 URL，指向后端生成验证码的接口
      captchaInput: '' // 用户输入的验证码
    }
  },
  methods: {
    refreshCaptcha() {
      // 加上时间戳以防止缓存
      this.captchaUrl = '/api/information/captcha?' + new Date().getTime()
    },
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('imageurl:', this.imageurl)
    },
    uploadFile(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      this.previewImage(file.file)
      this.$axios.post('/api/information/upload', formData).then(response => {
        if (response.status === 'success') {
          this.$message.success('照片上传成功')
        } else {
          this.$message.error('照片上传失败')
        }
      }).catch(error => {
        // 处理错误
        console.error(error)
        this.$message.error('照片上传失败')
      })
    },

    onFileChange(event) {
      const file = event.target.files[0] // 获取用户选择的文件
      console.log('照片:', event.target.files[0])
      if (file) {
        const file = event.target.files[0] // 获取用户选择的文件
        if (file) {
          this.selectedFile = file // 将文件保存到数据中
          this.previewImage(file) // 预览图片
          this.fileToBlob(this.selectedFile)
            .then((blob) => {
              this.convertedBlob = blob // 将转换后的 Blob 对象保存到组件的数据属性中
              console.log('Converted Blob:', blob)
            })
            .catch((error) => {
              console.error('Error converting file to blob:', error)
            })
        }
      }
    },
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageUrl = e.target.result // 将图片的 base64 URL 保存到数据中
        console.log('imageUrl:', e.target.result)
      }
      reader.readAsDataURL(file) // 将文件读取为 Data URL
    },
    async submitInfo() {
      if (this.imageUrl === null) {
        this.$message.error('请先上传照片')
        return
      }
      const formData = new FormData()
      console.log('studentName', this.form.name)
      formData.append('studentName', this.form.name)
      formData.append('gender', this.form.gender)
      formData.append('phoneNumber', this.form.contact)
      formData.append('nativeSpace', this.form.address)
      formData.append('academy', this.form.college)
      formData.append('classNo', this.form.class)
      formData.append('idNumber', this.form.idCard)
      formData.append('fatherName', this.form.fatherName)
      formData.append('motherName', this.form.motherName)
      formData.append('emergencyContactName', this.form.emergencyContactName)
      formData.append('emergencyContactTel', this.form.emergencyContactNumber)
      formData.append('captcha', this.captchaInput)
      console.log('上传报道信息:', formData)

      // 提交报道信息
      try {
        const reportResponse = await submitReportInfo(formData)
        console.log('报道信息提交成功:', reportResponse.data)
        this.$message.success('报道信息提交成功')
      } catch (error) {
        console.error('报道信息提交失败:', error)
        this.$message.error('报道信息提交失败，请重试')
        return
      }
    //   submitReportInfo(formData)
    //     .then(response => {
    //       if (response.data.code === 200) {
    //         this.$message.success('上传报道信息成功')
    //       }
    //     })
    //     .catch(error => {
    //       console.error('上传报道信息失败:', error)
    //       this.$message.error('上传报道信息失败')
    //     })
    }

  }
}

</script>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden; /* 禁止滚动 */
}
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* 禁止滚动 */
}

.container {
  display: flex;
  flex-direction: column; /* 垂直排列子项 */
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  overflow-y: auto;
}

h1 {
  grid-column: span 2;
  text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
}

.form-group {
display: flex;
justify-content: center;
  margin-bottom: 10px;
  margin-left: 20px;
}

.photolabel{
    margin-right:20px
}
.form-container{
    align-items: flex-start;
      display: flex;
  flex-direction: column; /* 垂直排列子项 */
}

label {
    width:15vh;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-button {
  padding: 10px;
  background-color: dodgerblue;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
