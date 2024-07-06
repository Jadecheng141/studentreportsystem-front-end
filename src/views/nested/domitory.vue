<template>
  <div class="app-container">
    <div class="title">
      <h1 class="text">我的宿舍</h1>
    </div>
    <div>
      <table class="ga-table" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="100" class="ga-table-label">园区</td>
          <td>
            {{ Dormform.area_no }}
          </td>
        </tr>
        <tr>
          <td width="100" class="ga-table-label">楼栋</td>
          <td>
            {{ Dormform.dorm_no }}
          </td>

        </tr>
        <tr>
          <td width="100" class="ga-table-label">房间号</td>
          <td>
            {{ Dormform.room_no }}
          </td>
        </tr>
      </table>
    </div>

    <!-- <el-form :data="Dormform" label-width="80px" class="show">
      <el-form-item label="园区" prop="area_no">
        <div class="groundandbuilding" />
      </el-form-item>
      <el-form-item label="楼栋" prop="dorm_no">
        <div class="groundandbuilding" />
      </el-form-item>
      <el-form-item label="宿舍号">
        <div class="room_no" />
      </el-form-item>
    </el-form> -->
    <el-table
      :data="tableData"
      border
      style="width: 90%"
      class="table"
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
        prop="major"
        label="专业"
      />
      <el-table-column
        prop="class_no"
        label="班级"
      />
    </el-table>
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
    this.fetchImage() // 获取图片数据
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
    //     async fetchImage() {
    //       try {
    //         const response = await axios.get('your-image-api-endpoint'); // 替换为您的图片API端点
    //         this.imageUrl = response.data.imageUrl; // 根据实际返回的数据结构获取图片URL
    //       } catch (error) {
    //         console.error('Failed to fetch image:', error);
    //       }
    //     }
    //   },

  }
}
</script>

<style>
.groundandbuilding {
  border-radius: 5px;
  width: 500px; /* 设置宽度 */
  height: 40px; /* 设置高度 */
  margin-top: 0px;
  background-color: #fff; /* 设置背景颜色 */
  /* border: 1px solid #2980b9; 设置边框 */
}
.table{
  position: absolute;
  top:420px;
  left:80px;
}
.show{
  position: absolute;
  left:100px;
  top:190px;
}
.title{
    height:100px
}
.text{
  position: absolute;
  left:50px;
  top:80px;
}
.ga-table {
  width: 100%;
  box-sizing: border-box;
}
.ga-table td {
  border-bottom: var(--el-border-base);
  padding: 13px 6px;
  font-size: 15px;
  line-height: 26px;
}
.ga-table tr:last-child td {
  border-bottom: 0px;
}
.ga-table-label {
  color: var(--el-text-color-secondary);
  text-align: center;
}

.image-container {
  position: absolute;
  top: 100px;
  left:1100px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
