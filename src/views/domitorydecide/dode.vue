<template>
  <div class="app-container">
    <div class="container">
      <header class="title">
        <h1>宿舍确认</h1>
      </header>
      <div class="table-container">
        <el-table
          :data="dorms"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="areano"
            label="园区"
            width="180"
          />
          <el-table-column
            prop="dormno"
            label="楼栋"
            width="180"
          />
          <el-table-column
            prop="roomno"
            label="房间号"
            width="180"
          />
          <el-table-column
            prop="academy"
            label="学院"
          />
          <el-table-column
            prop="academy"
            label="入住情况"
          >
            <template slot-scope="scope">
              <span :class="{'status-dot': true, 'available': scope.row.isFull, 'full': !scope.row.isFull}" />
            </template>
          </el-table-column>
          <el-table-column label="查看信息">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleCheck(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            :selectable="selectable"
            type="selection"
            width="55"
          />
        </el-table>
        <!-- <table>
          <thead>
            <tr>
              <th>园区</th>
              <th>楼栋</th>
              <th>宿舍号</th>
              <th>学院</th>
              <th>入住情况</th>
              <th>查看信息</th>
              <th>选择入住</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dorm, index) in dorms" :key="index" @click="selectDorm(index)">
              <td>{{ dorm.areano }}</td>
              <td>{{ dorm.dormno }}</td>
              <td>{{ dorm.roomno }}</td>
              <td>{{ dorm.academy }}</td>
              <td>
                <span :class="{'status-dot': true, 'available': dorm.isFull, 'full': !dorm.isFull}" />
              </td>
              <td><a href="#" class="view-link" @click.prevent="viewInfo(dorm)">查看</a></td>
              <td>
                <input
                  type="checkbox"
                  :disabled="dorm.isFull "
                  :checked="selectedDormIndex === index"
                  @change="toggleSelectDorm(index)"
                >
                <span v-if="dorm.isFull && selectedDormId !== dorm.id">已住满</span>
              </td>
            </tr>
          </tbody>
        </table> -->

      </div>
      <div>
        <button class="submit-button" @click="submitSelection">提交</button>
      </div>
      <el-dialog class="signup-dialog" title="宿舍详情" :visible.sync="isCheck" destroy-on-close @close="CloseCheckForm">
        <el-table
          :data="checkdata"
          border
          style="width: 90%"
          class="table"
        >
          <el-table-column
            prop="studentId"
            label="学号"
            width="180"
          />
          <el-table-column
            prop="studentName"
            label="姓名"
          />
          <el-table-column
            prop="nativeSpace"
            label="生源地"
          />
          <el-table-column
            prop="Academy"
            label="学院"
          />
          <el-table-column
            prop="major"
            label="专业"
          />
          <el-table-column
            prop="classNo"
            label="班级"
          />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDormselectinfo, getselectinfo, submitSelectDorm } from '@/api/dorminfo'
export default {
  data() {
    return {
      dorms: [],
      checkdata: [],
      selectedDorm: null, // 用于保存选中的宿舍
      isCheck: false
    }
  },
  created() {
    this.fetchDormData()
  },
  methods: {
    async fetchDormData() {
      getDormselectinfo()
        .then(response => {
          console.log('Dormselectinfo:', response.data.data)
          this.dorms = response.data.data
        })
        .catch(error => {
          console.error('获取宿舍信息失败:', error)
          this.$message.error('获取宿舍信息失败')
        })
    },
    handleCheck(selectdorm) {
      const formData = new FormData()
      formData.append('areaNo', selectdorm.areano)
      formData.append('dormNo', selectdorm.dormno)
      formData.append('roomNo', selectdorm.roomno)
      console.log('selectdorm:', formData)
      getselectinfo(formData)
        .then(response => {
          this.checkdata = response.data.data
          this.isCheck = true
        })
        .catch(error => {
          console.error('查看宿舍信息失败:', error)
          this.$message.error('查看宿舍信息失败')
        })
    },
    CloseCheckForm() {
      this.isCheck = false
      this.checkdata = []
    },
    handleSelectionChange(selection) {
      // 处理选择变化事件
      if (selection.length > 0) {
        this.selectedDorm = selection[0]
      } else {
        this.selectedDorm = null
      }
    },
    selectable(row) {
      // 控制复选框的可选择状态
      return this.selectedDorm === null || this.selectedDorm === row
    },
    submitSelection() {
      if (this.selectedDorm === null) {
        this.$message('请选择一个宿舍')
        return
      }
      const formData = new FormData()
      formData.append('areaNo', this.selectedDorm.areano)
      formData.append('dormNo', this.selectedDorm.dormno)
      formData.append('roomNo', this.selectedDorm.roomno)
      console.log('selectdorm:', formData)
      submitSelectDorm(FormData)
        .then(response => {
          this.$message.error('选择宿舍成功')
        })
        .catch(error => {
          console.error('选择宿舍失败:', error)
          this.$message.error('选择宿舍失败')
        })
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: 95%;
  background-color: #f0f2f5;
}

.container {
  background-color: white;
  padding: 10px 20px 10px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height:100%;
}
.title{
    height:80px;
    margin-left: 5px;
    margin-top: 1px;
}

h1 {
   position: absolute;
  margin-left: 20px;
  color: #333;
}

.table-container {
  height: 80%;
  width:100%; /* 固定表格容器的高度 */
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f9fafb;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  background-color: #fff;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 5px;
}

.available {
  background-color: green;
}

.full {
  background-color: red;
}

.view-link {
  color: #1e90ff;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}

.submit-button {
 margin-bottom: 50px;
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  display: block;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
