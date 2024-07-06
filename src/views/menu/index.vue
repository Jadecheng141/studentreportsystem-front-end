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
        <div v-if="scope.row['day-' + index]">
          <div v-html="scope.row['day-' + index]"></div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weekDays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      tableData: []
    };
  },
  created() {
    this.fetchSchedule();
  },
  methods: {
    fetchSchedule() {
      axios.get('/api/schedule')
        .then(response => {
          this.processScheduleData(response.data);
        })
        .catch(error => {
          console.error('Error fetching schedule data:', error);
        });
    },
    processScheduleData(data) {
      const times = [
        '8:00 - 9:00',
        '9:10 - 10:10',
        '10:20 - 11:20',
        '11:30 - 12:30',
        '14:00 - 15:00',
        '15:10 - 16:10'
      ];

      this.tableData = times.map((time, rowIndex) => {
        const row = { time };
        this.weekDays.forEach((day, colIndex) => {
          row['day-' + colIndex] = data[rowIndex][colIndex];
        });
        return row;
      });
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
