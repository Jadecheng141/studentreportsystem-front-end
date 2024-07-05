<template>
  <div class="app-container">
    <div class="container">
      <h1>基本信息录入</h1>
      <form @submit.prevent="submitForm">
        <div class="left-column">
          <div class="form-group">
            <label for="name">姓名:</label>
            <input type="text" v-model="form.name" id="name" required />
          </div>
          <div class="form-group">
            <label for="gender">性别:</label>
            <select v-model="form.gender" id="gender" required>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dob">出生日期:</label>
            <input type="date" v-model="form.dob" id="dob" required />
          </div>
          <div class="form-group">
            <label for="contact">联系方式:</label>
            <input type="text" v-model="form.contact" id="contact" required />
          </div>
          <div class="form-group">
            <label for="address">家庭住址:</label>
            <input type="text" v-model="form.address" id="address" required />
          </div>
          <div class="form-group">
            <label for="college">学院:</label>
            <input type="text" v-model="form.college" id="college" required />
          </div>
          <div class="form-group">
            <label for="class">班级:</label>
            <input type="text" v-model="form.class" id="class" required />
          </div>
          <div class="form-group">
            <label for="studentId">学号:</label>
            <input type="text" v-model="form.studentId" id="studentId" required />
          </div>
          <div class="form-group">
            <label for="idCard">身份证号:</label>
            <input type="text" v-model="form.idCard" id="idCard" required />
          </div>
          <div class="form-group">
            <label for="email">邮箱:</label>
            <input type="email" v-model="form.email" id="email" required />
          </div>
        </div>
        <div class="right-column">
          <div class="form-group">
            <label for="photo">照片上传:</label>
            <input type="file" @change="onFileChange" id="photo" accept="image/*" required />
          </div>
          <div class="form-group">
            <label for="fatherName">父亲姓名:</label>
            <input type="text" v-model="form.fatherName" id="fatherName" required />
          </div>
          <div class="form-group">
            <label for="fatherContact">父亲联系电话:</label>
            <input type="text" v-model="form.fatherContact" id="fatherContact" required />
          </div>
          <div class="form-group">
            <label for="motherName">母亲姓名:</label>
            <input type="text" v-model="form.motherName" id="motherName" required />
          </div>
          <div class="form-group">
            <label for="motherContact">母亲联系电话:</label>
            <input type="text" v-model="form.motherContact" id="motherContact" required />
          </div>
          <div class="form-group">
            <label for="emergencyContactName">紧急联系人姓名:</label>
            <input type="text" v-model="form.emergencyContactName" id="emergencyContactName" required />
          </div>
          <div class="form-group">
            <label for="emergencyContactNumber">紧急联系人联系电话:</label>
            <input type="text" v-model="form.emergencyContactNumber" id="emergencyContactNumber" required />
          </div>
          <button type="submit" class="submit-button">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
        studentId: '',
        idCard: '',
        email: '',
        fatherName: '',
        fatherContact: '',
        motherName: '',
        motherContact: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        photo: null,
      }
    };
  },
  methods: {
    onFileChange(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }

      try {
        const response = await fetch('https://your-backend-endpoint.com/submit', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          alert('表单提交成功');
        } else {
          alert('表单提交失败');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('表单提交失败');
      }
    }
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

h1 {
  grid-column: span 2;
  text-align: center;
}

form {
  display: contents;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
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
