<template>
  <div class="container">
    <div class="rectangle">
      <div class="total">
      <div>
      <div class="top">
      <img :src="logo" alt="静态图片" class="logo" >
      <h3 class="tet">某某大学</h3>
      </div>
      <img :src="imageUrl" alt="人像" class="image-container2">
      </div>
        <div class="white-rectangle">
          <el-form ref="form" :model="form" label-width="80px" class="showw">
            <el-form-item label="姓名:">
              <div class="groundandbuilding2"></div>
            </el-form-item>
            <el-form-item label="学院:">
              <div class="groundandbuilding2"></div>
            </el-form-item>
            <el-form-item label="学号:">
              <div class="groundandbuilding2"></div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RectangleWithShadow',
  data() {
    return {
      logo:require('@/images/logo.png'),
      tableData: [
        { pay: '这是一条消费记录1' },
        { pay: '这是一条消费记录2' },
        { pay: '这是一条消费记录3' },
        { pay: '这是一条消费记录4' }
      ],
      imageUrl: '' // 存储图片URL
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 1];
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
    this.fetchImage(); // 获取图片数据
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  height: 100vh; /* 设置容器的高度为视口高度 */
}

.rectangle {
  margin-top: 20px;
  width: 800px; /* 设置矩形的宽度 */
  height: 400px; /* 设置矩形的高度 */
  background-color: dodgerblue; /* 设置矩形的背景颜色 */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* 设置矩形的阴影 */
  border-radius: 15px; /* 设置矩形的圆角 */
  margin-bottom: 20px; /* 添加底部外边距以分隔矩形和表格 */
}
.white-rectangle{
  margin-top: 20px;
  width: 360px; /* 设置矩形的宽度 */
  height: 360px; /* 设置矩形的高度 */
  background-color: white; /* 设置矩形的背景颜色 */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* 设置矩形的阴影 */
  border-radius: 15px; /* 设置矩形的圆角 */
  margin-bottom: 20px; /* 添加底部外边距以分隔矩形和表格 */
  margin-left: 140px;
}
.top{
  display: flex;
  margin-top: 30px;
}
.tt {
  margin-left: 90px;
}
.logo{
  width:100px;
  height:95px;
  margin-left: 20px;
}
.tet{
  font-size: 30px;
  margin-top: 27px;
  color: white;
  margin-left: 20px;
}
.image-container2{
  margin-top: 80px;
  margin-left:160px;
}
.total{
  display: flex;
}
.showw{
  margin-top:80px;
  left:200px;
}
.groundandbuilding2{
  width:320px;
}
</style>
