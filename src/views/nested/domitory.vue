<template>
  <div class="app-container">
    <div class="blue">
      <div class="title">
        <h1 class="text">我的宿舍</h1>
      </div>
      <div class="dorm-info">
        <table class="ga-table" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="ga-table-label">园区</td>
            <td>{{ Dormform.area_no }}</td>
          </tr>
          <tr>
            <td class="ga-table-label">楼栋</td>
            <td>{{ Dormform.dorm_no }}</td>
          </tr>
          <tr>
            <td class="ga-table-label">房间号</td>
            <td>{{ Dormform.room_no }}</td>
          </tr>
        </table>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 90%; margin: 30px auto;"
      >
        <el-table-column
          prop="student_id"
          label="学号"
          width="180"
        />
        <el-table-column
          prop="student_name"
          label="姓名"
        />
        <el-table-column
          prop="native_space"
          label="生源地"
        />
        <el-table-column
          prop="academy"
          label="学院"
        />
        <el-table-column
          prop="class_no"
          label="班级"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getDorminfo } from '@/api/dorminfo'

export default {
  data() {
    return {
      Dormform: {
        area_no: '',
        dorm_no: '',
        room_no: ''
      },
      tableData: [],
      imageUrl: '' // 存储图片URL
    }
  },
  mounted() {
    this.fetchTableData()
  },
  methods: {
    async fetchTableData() {
      getDorminfo()
        .then(response => {
          console.log('areano:', response.data[0].area_no)
          this.tableData = response.data
          this.Dormform.area_no = response.data[0].area_no
          this.Dormform.dorm_no = response.data[0].dorm_no
          this.Dormform.room_no = response.data[0].room_no
        })
        .catch(error => {
          console.error('获取宿舍信息失败:', error)
          this.$message.error('获取宿舍信息失败')
        })
    }
  }
}
</script>

<style>
.blue{
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);;
  height: 100%;
}
.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.text {
  font-size: 36px;
  color: #333;
}

.dorm-info {
  margin-bottom: 30px;
}

.ga-table {
  width: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
  margin: 0 auto;
  max-width: 600px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ga-table td {
  padding: 15px;
  font-size: 16px;
  line-height: 1.5;
  border-bottom: 1px solid #eee;
}

.ga-table tr:last-child td {
  border-bottom: 0;
}

.ga-table-label {
  color: #555;
  text-align: left;
  font-weight: bold;
}

.el-table {
  margin: 30px auto;
}

.image-container {
  margin-top: 20px;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
