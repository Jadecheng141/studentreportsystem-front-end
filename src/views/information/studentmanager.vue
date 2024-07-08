<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.academy" size="small" placeholder="所属学院" clearable class="filter-item">
        <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.studentId" size="small" placeholder="请输入学生学号" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.studentName" size="small" placeholder="请输入学生姓名" clearable class="filter-item w-200" />
      <el-button size="small" type="primary" icon="el-icon-search" class="filter-item" @click="search">
        搜索
      </el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh" class="filter-item" @click="refresh">
        重置
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="Loading" border fit height="100%" class="table-container" highlight-current-row>
      <el-table-column label="学生学号" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentId }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentName }}
        </template>
      </el-table-column>
      <el-table-column label="所属学院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.academy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报道信息填写" align="center">
        <template slot-scope="scope">
          <span :class="{'status-dot': true, 'completed': scope.row.state1, 'not-completed': !scope.row.state1}" />
        </template>
      </el-table-column>
      <el-table-column label="宿舍确认" align="center">
        <template slot-scope="scope">
          <span :class="{'status-dot': true, 'completed': scope.row.state2, 'not-completed': !scope.row.state2}" />
        </template>
      </el-table-column>
      <el-table-column label="是否缴费" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.state3" @change="updateFeeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="edit(scope.row)">
              查看
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === '查看' ? '查看学生信息' : '新增学生信息'">
      <el-form ref="dataForm" :model="temp" label-width="120px" label-position="right">
        <el-form-item label="学生学号">
          <el-input v-model="temp.studentId" placeholder="请输入学生学号" />
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="temp.studentName" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="temp.phoneNumber" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="temp.academy" placeholder="请选择学院">
            <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍">
          <el-input v-model="temp.dormNo" placeholder="请输入宿舍" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="temp.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { searchCourses, updateFeeStatus, getStudentDetails } from '@/api/studentmanager'
import { deepClone } from '@/utils'

const _temp = {
  studentId: '',
  studentName: '',
  phoneNumber: '',
  academy: '',
  state1: false,
  state2: false,
  state3: false,
  dormNo: '',
  email: '',
  figureUrl: ''
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      options_academy: [
        { value: '计算机学院', label: '计算机学院' },
        { value: '农学院', label: '农学院' },
        { value: '人文学院', label: '人文学院' },
        { value: '工程学院', label: '工程学院' },
        { value: '理学院', label: '理学院' },
        { value: '管理学院', label: '管理学院' },
        { value: '医学院', label: '医学院' },
        { value: '外国语学院', label: '外国语学院' },
        { value: '法学院', label: '法学院' },
        { value: '教育学院', label: '教育学院' },
        { value: '艺术学院', label: '艺术学院' }
      ],
      listQuery: {
        studentId: '',
        studentName: '',
        phoneNumber: '',
        academy: '',
        state1: false,
        state2: false,
        state3: false,
        dormNo: '',
        email: '',
        figureUrl: ''
      },
      total: 0,
      list: [],
      filteredList: [],
      listLoading: true,
      dialogVisible: false,
      dialogType: 'create',
      temp: Object.assign({}, _temp),
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        const response = await searchCourses({
          ...this.listQuery,
          academy: this.listQuery.academy || '',
          studentId: this.listQuery.studentId || '',
          studentName: this.listQuery.studentName || ''
        })
        this.list = response.data.data
        this.total = response.data.total
        this.filteredList = this.list
        console.log('response:', response.data)
      } catch (error) {
        console.error('Error fetching student data:', error)
      } finally {
        this.listLoading = false
      }
    },
    resetTemp() {
      this.temp = deepClone(_temp)
    },
    create() {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'create'
    },
    async edit(row) {
      try {
        const response = await getStudentDetails(row.studentId)
        this.temp = response.data.data
        this.dialogVisible = true
        this.dialogType = '查看'
      } catch (error) {
        this.$message.error('获取学生详细信息失败')
        console.error('Error fetching student details:', error)
      }
    },
    search() {
      this.listQuery.page = 1 // 重置页码
      this.fetchData()
    },
    refresh() {
      this.listQuery = deepClone(_temp)
      this.fetchData()
    },
    submit() {
      const temp = Object.assign({}, this.temp)
      // Save logic
      this.dialogVisible = false
      this.fetchData()
    },
    async updateFeeStatus(row) {
      try {
        await updateFeeStatus(row.studentId, row.state3)
        this.$message.success('缴费状态更新成功')
      } catch (error) {
        this.$message.error('更新缴费状态失败')
        console.error('Error updating fee status:', error)
      }
    },
    handlePaginationChange(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    handleLimitChange(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.filter-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.filter-item {
  margin-right: 20px;
}

.w-200 {
  width: 200px;
}

.app-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.table-container {
  margin-top: 20px;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.completed {
  background-color: green;
}

.not-completed {
  background-color: red;
}

.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
