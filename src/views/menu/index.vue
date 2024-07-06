<template>
  <el-table
    :data="tableData"
    style="width: 100%; height: 100vh;"
    border
  >
    <el-table-column
      prop="time"
      label="时间"
      width="100"
      align="center"
      :min-width="100"
    />
    <el-table-column
      v-for="(day, index) in weekDays"
      :key="'day-' + index"
      :label="day"
      width="140"
      align="center"
      :min-width="140"
    >
      <template slot-scope="scope">
        <div v-if="scope.row[day]">
          <div>{{ scope.row[day].subject }}</div>
          <div>{{ scope.row[day].teacher }}</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      weekDays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      tableData: [
        { time: '8:00 - 9:00', '星期一': { subject: '数学', teacher: '张老师' }, '星期二': { subject: '英语', teacher: '李老师' }, '星期三': { subject: '物理', teacher: '王老师' }, '星期四': { subject: '化学', teacher: '赵老师' }, '星期五': { subject: '生物', teacher: '钱老师' } },
        { time: '9:10 - 10:10', '星期一': { subject: '英语', teacher: '李老师' }, '星期二': { subject: '数学', teacher: '张老师' }, '星期三': { subject: '化学', teacher: '赵老师' }, '星期四': { subject: '物理', teacher: '王老师' }, '星期五': { subject: '生物', teacher: '钱老师' } },
        { time: '10:20 - 11:20', '星期一': { subject: '物理', teacher: '王老师' }, '星期二': { subject: '生物', teacher: '钱老师' }, '星期三': { subject: '数学', teacher: '张老师' }, '星期四': { subject: '英语', teacher: '李老师' }, '星期五': { subject: '化学', teacher: '赵老师' } },
        { time: '11:30 - 12:30', '星期一': { subject: '化学', teacher: '赵老师' }, '星期二': { subject: '物理', teacher: '王老师' }, '星期三': { subject: '生物', teacher: '钱老师' }, '星期四': { subject: '数学', teacher: '张老师' }, '星期五': { subject: '英语', teacher: '李老师' } },
        { time: '14:00 - 15:00', '星期一': { subject: '生物', teacher: '钱老师' }, '星期二': { subject: '化学', teacher: '赵老师' }, '星期三': { subject: '英语', teacher: '李老师' }, '星期四': { subject: '生物', teacher: '钱老师' }, '星期五': { subject: '数学', teacher: '张老师' } },
        { time: '15:10 - 16:10', '星期一': { subject: '英语', teacher: '李老师' }, '星期二': { subject: '生物', teacher: '钱老师' }, '星期三': { subject: '化学', teacher: '赵老师' }, '星期四': { subject: '数学', teacher: '张老师' }, '星期五': { subject: '物理', teacher: '王老师' } }
      ]
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px; /* 调整字体大小 */
}

.el-table th, .el-table td {
  padding: 10px; /* 调整单元格的内边距 */
  text-align: center;
}
</style>
