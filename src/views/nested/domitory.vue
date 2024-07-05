<template>
  <div class="app-container">
    <h1 class="text">我的宿舍</h1>
    <el-form ref="form" :model="form" label-width="80px" class="show">
      <el-form-item label="园区楼栋">
        <div class="groundandbuilding"></div>
      </el-form-item>
      <el-form-item label="宿舍号">
        <div class="groundandbuilding"></div>
      </el-form-item>
      <el-form-item label="房间类型">
        <div class="groundandbuilding"></div>
      </el-form-item>
    </el-form>
    <el-table
       :data="tableData"
       border
       style="width: 90%"
       class="table"
       >
       <el-table-column
         prop="order"
         label="序号"
         width="180">
       </el-table-column>
       <el-table-column
         prop="id"
         label="学号"
         width="180">
       </el-table-column>
       <el-table-column
         prop="name"
         label="姓名">
       </el-table-column>
       <el-table-column
         prop="type"
         label="民族">
       </el-table-column>
       <el-table-column
         prop="place"
         label="省份">
       </el-table-column>
       <el-table-column
         prop="school"
         label="学院">
       </el-table-column>
       <el-table-column
         prop="major"
         label="专业">
       </el-table-column>
       <el-table-column
         prop="class"
         label="班级">
       </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        order: '',
        id: '',
        name: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      imageUrl: '' // 存储图片URL
    };
  },
  methods: {
    async fetchTableData() {
      try {
        const response = await axios.get('your-api-endpoint'); // 替换为您的API端点
        this.tableData = response.data;
      } catch (error) {
        console.error('Failed to fetch table data:', error);
      }
    },
    async fetchImage() {
      try {
        const response = await axios.get('your-image-api-endpoint'); // 替换为您的图片API端点
        this.imageUrl = response.data.imageUrl; // 根据实际返回的数据结构获取图片URL
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    }
  },
  mounted() {
    this.fetchTableData();
    this.fetchImage(); // 获取图片数据
  }
};
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
.text{
  position: absolute;
  left:50px;
  top:80px;
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
