<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select
        v-model="listQuery.college"
        size="small"
        placeholder="所属学院"
        clearable
        class="filter-item"
      >
        <el-option v-for="item in options_college" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select
        v-model="listQuery.gender"
        size="small"
        placeholder="男/女宿舍"
        clearable
        class="filter-item"
      >
        <el-option label="男宿舍" :value="1" />
        <el-option label="女宿舍" :value="0" />
      </el-select>
      <el-select
        v-model="listQuery.full"
        size="small"
        placeholder="是否住满"
        clearable
        class="filter-item"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <div class="button-container">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search"
        >
          搜索
        </el-button>
      </div>
    </div>
    <div class="filter-container2">
      <el-input
        v-model="listQuery.dormId"
        size="small"
        placeholder="请输入宿舍编号"
        clearable
        class="filter-item w-200"
      />
      <el-input
        v-model="listQuery.campus"
        size="small"
        placeholder="请输入园区"
        clearable
        class="filter-item w-200"
      />
      <el-input
        v-model="listQuery.building"
        size="small"
        placeholder="请输入楼栋"
        clearable
        class="filter-item w-200"
      />
      <div class="button-container">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
        >
          重置
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="filteredList"
      element-loading-text="Loading"
      border
      fit
      height="100%"
      class="table-container"
      highlight-current-row
    >
      <el-table-column
        fixed
        label="园区"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.campus }}
        </template>
      </el-table-column>
      <el-table-column
        label="楼栋"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.building }}
        </template>
      </el-table-column>
      <el-table-column
        label="宿舍号"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.dormId }}
        </template>
      </el-table-column>
      <el-table-column
        label="男/女宿舍"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gender === 1 ? '男宿舍' : '女宿舍' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属学院"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.college }}
        </template>
      </el-table-column>
      <el-table-column
        label="已选床位"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.selectedBeds }}/4</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否住满"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.selectedBeds === 4 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="del(scope)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

    <el-button
      class="add-dorm-button"
      type="primary"
      size="large"
      @click="create"
    >
      添加宿舍
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === '编辑' ? '编辑宿舍信息' : '新增宿舍信息'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="园区">
          <el-input v-model="temp.campus" placeholder="请输入园区" />
        </el-form-item>
        <el-form-item label="楼栋">
          <el-input v-model="temp.building" placeholder="请输入楼栋" />
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="temp.dormId" placeholder="请输入宿舍编号" />
        </el-form-item>
        <el-form-item label="男/女宿舍">
          <el-select v-model="temp.gender" placeholder="请选择">
            <el-option label="男宿舍" :value="1" />
            <el-option label="女宿舍" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="temp.college" placeholder="请选择学院">
            <el-option v-for="item in options_college" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="已选床位">
          <el-input v-model="temp.selectedBeds" placeholder="请输入已选床位数" />
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { deepClone } from '@/utils'

const _temp = {
  campus: '',
  building: '',
  dormId: '',
  gender: 1,
  college: '',
  selectedBeds: 0
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
        page: 1,
        limit: 20,
        gender: undefined,
        full: undefined,
        dormId: '',
        campus: '',
        building: '',
        college: ''
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
  mounted() {
    this.people = this.loadAll()
  },
  methods: {
    async fetchData() {
      // 模拟数据
      this.list = [
        { campus: 'A区', building: '1栋', dormId: '101', gender: 1, college: '计算机学院', selectedBeds: 2 },
        { campus: 'A区', building: '2栋', dormId: '201', gender: 0, college: '工程学院', selectedBeds: 4 },
        { campus: 'B区', building: '1栋', dormId: '102', gender: 1, college: '理学院', selectedBeds: 3 },
        { campus: 'B区', building: '3栋', dormId: '301', gender: 0, college: '计算机学院', selectedBeds: 1 }
      ]
      this.total = this.list.length
      this.filteredList = this.list
      this.listLoading = false
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
      this.dialogType = '编辑'
      this.dialogVisible = true
    },
    async del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.list.findIndex(item => item.dormId === scope.row.dormId)
        if (index !== -1) {
          this.list.splice(index, 1)
          this.filteredList = this.list
          this.$message({
            type: 'success',
            message: '删除成功!'
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
      this.filterList()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        gender: undefined,
        full: undefined,
        dormId: '',
        campus: '',
        building: '',
        college: ''
      }
      this.filteredList = this.list
    },
    filterList() {
      this.filteredList = this.list.filter(item => {
        return (
          (this.listQuery.gender === undefined || item.gender === this.listQuery.gender) &&
          (this.listQuery.full === undefined || (this.listQuery.full === 1 ? item.selectedBeds === 4 : item.selectedBeds !== 4)) &&
          (!this.listQuery.dormId || item.dormId.includes(this.listQuery.dormId)) &&
          (!this.listQuery.campus || item.campus.includes(this.listQuery.campus)) &&
          (!this.listQuery.building || item.building.includes(this.listQuery.building)) &&
          (!this.listQuery.college || item.college.includes(this.listQuery.college))
        )
      })
      this.total = this.filteredList.length
    },
    querySearch(queryString, cb) {
      const results = this.people.filter(people => {
        return people.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      })
      cb(results)
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
  width: 80px; /* 设置固定宽度 */
  text-align: center;
}
.available {
  background-color: green;
}
.not-available {
  background-color: red;
}
</style>
