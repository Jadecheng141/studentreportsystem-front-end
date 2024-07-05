<template>
  <el-table
    :data="tableData"
    style="width: 100%; height: 100vh;"
    border
  >
    <el-table-column
      prop="day"
      label=" "
      width="50"
      align="center"
      :min-width="100"
    />
    <el-table-column
      v-for="(day, index) in weekDays"
      :key="'day-' + index"
      :label="day"
      width="70"
      align="center"
      :min-width="120"
    />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      weekDays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      tableData: [
        { day: '1' },
        { day: '2' },
        { day: '3' },
        { day: '4' },
        { day: '5' },
        { day: '6' }
      ]
    }
  }
}
</script>

<style scoped>
/* 添加样式来全屏显示表格 */
.el-table {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 20px; /* 调整字体大小 */
}

.el-table th, .el-table td {
  padding: 20px; /* 调整单元格的内边距 */
  text-align: center;
}
</style>
