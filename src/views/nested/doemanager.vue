<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select v-model="listQuery.academy" size="small" placeholder="所属学院" clearable class="filter-item">
        <el-option v-for="item in options_college" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.gender" size="small" placeholder="男/女宿舍" clearable class="filter-item">
        <el-option label="男宿舍" :value="'男'" />
        <el-option label="女宿舍" :value="'女'" />
      </el-select>
      <el-select v-model="listQuery.isFull" size="small" placeholder="是否住满" clearable class="filter-item">
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <div class="button-container">
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="filter-container2">
      <el-input v-model="listQuery.roomno" size="small" placeholder="请输入宿舍编号" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.areano" size="small" placeholder="请输入园区" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.dormno" size="small" placeholder="请输入楼栋" clearable class="filter-item w-200" />
      <div class="button-container">
        <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh">重置</el-button>
      </div>
    </div>
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="Loading" border fit height="100%" class="table-container" highlight-current-row>
      <el-table-column fixed label="园区" align="center">
        <template slot-scope="scope">
          {{ scope.row.areano }}
        </template>
      </el-table-column>
      <el-table-column label="楼栋" align="center">
        <template slot-scope="scope">
          {{ scope.row.dormno }}
        </template>
      </el-table-column>
      <el-table-column label="宿舍号" align="center">
        <template slot-scope="scope">
          {{ scope.row.roomno }}
        </template>
      </el-table-column>
      <el-table-column label="男/女宿舍" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender === '男' ? '男宿舍' : '女宿舍' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属学院" align="center">
        <template slot-scope="scope">
          {{ scope.row.academy }}
        </template>
      </el-table-column>
      <el-table-column label="已选床位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentnumofstu }}/{{ scope.row.maxnumofstu }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否住满" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentnumofstu === scope.row.maxnumofstu ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="edit(scope)">查看</el-button>
            <el-button type="danger" size="mini" @click="del(scope)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-button class="add-dorm-button" type="primary" size="large" @click="create">添加宿舍</el-button>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === '编辑' ? '编辑宿舍信息' : '新增宿舍信息'">
      <el-form ref="dataForm" :model="temp" label-width="120px" label-position="right">
        <el-form-item label="园区">
          <el-input v-model="temp.areano" placeholder="请输入园区" />
        </el-form-item>
        <el-form-item label="楼栋">
          <el-input v-model="temp.dormno" placeholder="请输入楼栋" />
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="temp.roomno" placeholder="请输入宿舍编号" />
        </el-form-item>
        <el-form-item label="男/女宿舍">
          <el-select v-model="temp.gender" placeholder="请选择">
            <el-option label="男宿舍" :value="'男'" />
            <el-option label="女宿舍" :value="'女'" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="temp.academy" placeholder="请选择学院">
            <el-option v-for="item in options_college" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="最大床位数">
          <el-input v-model.number="temp.maxnumofstu" placeholder="请输入最大床位数" />
        </el-form-item>
        <el-form-item label="已选床位">
          <el-input v-model.number="temp.currentnumofstu" placeholder="请输入已选床位数" />
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="studentDialogVisible" title="学生详细信息">
      <el-table :data="studentDetails" border>
        <el-table-column label="学生姓名" prop="studentName" />
        <el-table-column label="籍贯" prop="nativeSpace" />
        <el-table-column label="专业" prop="major" />
        <el-table-column label="学生ID" prop="studentId" />
        <el-table-column label="班级号" prop="classNo" />
        <el-table-column label="学院" prop="academy" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="studentDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { searchCourses, deleteCourse, getStudentDetails } from '@/api/doemanager'
import { deepClone } from '@/utils'

const _temp = {
  areano: '',
  dormno: '',
  roomno: '',
  maxnumofstu: null,
  currentnumofstu: null,
  gender: '',
  isFull: null,
  academy: ''
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      options_college: [
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
        areano: '',
        dormno: '',
        roomno: '',
        maxnumofstu: null,
        currentnumofstu: null,
        gender: '',
        isFull: null,
        academy: ''
      },
      total: 0,
      list: [],
      filteredList: [],
      listLoading: true,
      dialogVisible: false,
      studentDialogVisible: false,
      studentDetails: [],
      dialogType: 'create',
      temp: Object.assign({}, _temp),
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.people = this.loadAll()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        // 过滤掉 null 值，避免传递空字符串
        const query = Object.keys(this.listQuery)
          .filter(key => this.listQuery[key] !== null && this.listQuery[key] !== '')
          .reduce((obj, key) => {
            obj[key] = this.listQuery[key]
            return obj
          }, {})
        const response = await searchCourses(query)
        this.list = response.data.data // Ensure that this matches the actual structure of your API response
        this.total = response.data.total // Ensure that this matches the actual structure of your API response
        this.filteredList = this.list
        console.log('response:', response.data)
      } catch (error) {
        console.error('Error fetching dorm data:', error)
      } finally {
        this.listLoading = false
      }
    },
    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },
    create() {
      this.resetTemp()
      this.dialogType = '新增'
      this.dialogVisible = true
    },
    async edit(scope) {
      this.temp = deepClone(scope.row)
      try {
        const response = await getStudentDetails(this.temp.roomno, this.temp.dormno, this.temp.areano)
        this.studentDetails = response.data.data
        this.studentDialogVisible = true
      } catch (error) {
        console.error('Error fetching student details:', error)
      }
    },
    async del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteCourse(scope.row.areano, scope.row.dormno, scope.row.roomno)
          const index = this.list.findIndex(item => item.roomno === scope.row.roomno && item.dormno === scope.row.dormno && item.areano === scope.row.areano)
          if (index !== -1) {
            this.list.splice(index, 1)
            this.filteredList = this.list
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        } catch (error) {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const index = this.list.findIndex(item => item.dormId === this.temp.dormId)
          if (index !== -1) {
            this.list.splice(index, 1, this.temp)
          } else {
            this.list.push(this.temp)
          }
          this.filteredList = this.list
          this.dialogVisible = false
        }
      })
    },
    search() {
      this.fetchData()
    },
    refresh() {
      this.listQuery = {
        areano: '',
        dormno: '',
        roomno: '',
        maxnumofstu: null,
        currentnumofstu: null,
        gender: '',
        isFull: null,
        academy: ''
      }
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.filter-container1, .filter-container2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filter-item {
  margin-right: 10px;
}
.w-200 {
  width: 200px;
}
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.text-right {
  text-align: right;
}
.add-dorm-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.status-label {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: inline-block;
  width: 80px;
  text-align: center;
}
.available {
  background-color: green;
}
.not-available {
  background-color: red;
}
</style>
