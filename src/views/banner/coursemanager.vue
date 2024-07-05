<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select
        v-model="listQuery.statuscourse"
        size="small"
        placeholder="课程状态"
        clearable
        class="filter-item"
      >
        <el-option label="可选" :value="1" />
        <el-option label="不可选" :value="0" />
      </el-select>
      <el-select
        v-model="listQuery.statusempty"
        size="small"
        placeholder="是否选满"
        clearable
        class="filter-item"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select v-model="listQuery.value_academy" size="small" placeholder="开课学院" class="filter-item">
        <el-option
          v-for="item in options_academy"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-autocomplete
        class="inline-input"
        size="small"
        v-model="listQuery.person"
        :fetch-suggestions="querySearch"
        placeholder="课程负责人"
      ></el-autocomplete>
      <el-select v-model="listQuery.value_score" size="small" placeholder="学分" class="filter-item">
        <el-option
          v-for="item in options_score"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="listQuery.value_time" size="small" placeholder="学时" class="filter-item">
        <el-option
          v-for="item in options_time"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
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
        v-model="listQuery.keywordid"
        size="small"
        placeholder="请输入课程编号"
        clearable
        class="filter-item w-200"
      />
      <el-input
        v-model="listQuery.keywordname"
        size="small"
        placeholder="请输入课程名称"
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
        label="课程编号"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="开课部门"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.academy }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程负责人"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.person }}
        </template>
      </el-table-column>
      <el-table-column
        label="总课时"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.total_hours }}
        </template>
      </el-table-column>
      <el-table-column
        label="学分"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.credits }}
        </template>
      </el-table-column>
      <el-table-column
        label="选课情况"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.selected_students }}/{{ scope.row.capacity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开课地点"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span :class="{'status-label': true, 'available': scope.row.status === 1, 'not-available': scope.row.status === 0}">
            {{ scope.row.status === 1 ? '可选' : '不可选' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
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
      class="add-course-button"
      type="primary"
      size="large"
      @click="create"
    >
      添加课程
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === '编辑' ? '编辑课程信息' : '新增课程信息'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="课程编号">
          <el-input v-model="temp.id" placeholder="请输入课程编号" />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="temp.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="开课部门">
          <el-input v-model="temp.academy" placeholder="请输入开课部门" />
        </el-form-item>
        <el-form-item label="课程负责人">
          <el-input v-model="temp.person" placeholder="请输入课程负责人" />
        </el-form-item>
        <el-form-item label="课程容纳人数">
          <el-input v-model="temp.capacity" placeholder="请输入课程容纳人数" />
        </el-form-item>
        <el-form-item label="总课时">
          <el-input v-model="temp.total_hours" placeholder="请输入总课时" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="temp.credits" placeholder="请输入学分" />
        </el-form-item>
        <el-form-item label="选课人数">
          <el-input v-model="temp.selected_students" placeholder="请输入选课人数" />
        </el-form-item>
        <el-form-item label="开课地点">
          <el-input v-model="temp.location" placeholder="请输入开课地点" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" placeholder="请选择状态">
            <el-option label="可选" :value="1" />
            <el-option label="不可选" :value="0" />
          </el-select>
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
// import { getList } from '@/api/user'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  name: '',
  academy: '',
  person: '',
  capacity: '',
  total_hours: '',
  credits: '',
  selected_students: '',
  location: '',
  status: 1
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      people: [],
      options_score: [
        { value: '0', label: '0' },
        { value: '0.5', label: '0.5' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ],
      options_time: [
        { value: '16', label: '16' },
        { value: '24', label: '24' },
        { value: '32', label: '32' }
      ],
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
        page: 1,
        limit: 20,
        statuscourse: undefined,
        statusempty: undefined,
        value_academy: undefined,
        person: undefined,
        value_score: undefined,
        value_time: undefined,
        keywordid: '',
        keywordname: ''
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
      // 模拟数据
      this.list = [
        { id: 'C001', name: '计算机基础', academy: '计算机学院', person: '刘大江', capacity: 60, total_hours: 32, credits: 3, selected_students: 30, location: 'A101', status: 1 },
        { id: 'C002', name: '农学概论', academy: '农学院', person: '冯永', capacity: 50, total_hours: 24, credits: 2, selected_students: 25, location: 'B202', status: 1 },
        { id: 'C003', name: '文学赏析', academy: '人文学院', person: '但敬佩', capacity: 40, total_hours: 16, credits: 1, selected_students: 20, location: 'C303', status: 0 },
        { id: 'C004', name: '工程力学', academy: '工程学院', person: '叶春晓', capacity: 70, total_hours: 32, credits: 3, selected_students: 40, location: 'D404', status: 1 }
      ];
      this.total = this.list.length;
      this.filteredList = this.list;
      this.listLoading = false;
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
        const index = this.list.findIndex(item => item.id === scope.row.id);
        if (index !== -1) {
          this.list.splice(index, 1);
          this.filteredList = this.list;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const index = this.list.findIndex(item => item.id === this.temp.id);
          if (index !== -1) {
            this.list.splice(index, 1, this.temp);
          } else {
            this.list.push(this.temp);
          }
          this.filteredList = this.list;
          this.dialogVisible = false;
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
        statuscourse: undefined,
        statusempty: undefined,
        value_academy: undefined,
        person: undefined,
        value_score: undefined,
        value_time: undefined,
        keywordid: '',
        keywordname: ''
      }
      this.filteredList = this.list;
    },
    filterList() {
      this.filteredList = this.list.filter(item => {
        return (
          (this.listQuery.statuscourse === undefined || item.status === this.listQuery.statuscourse) &&
          (this.listQuery.statusempty === undefined || (this.listQuery.statusempty === 1 ? item.selected_students === item.capacity : item.selected_students !== item.capacity)) &&
          (!this.listQuery.value_academy || item.academy.includes(this.listQuery.value_academy)) &&
          (!this.listQuery.person || item.person.includes(this.listQuery.person)) &&
          (this.listQuery.value_score === undefined || item.credits === parseFloat(this.listQuery.value_score)) &&
          (this.listQuery.value_time === undefined || item.total_hours === parseFloat(this.listQuery.value_time)) &&
          (!this.listQuery.keywordid || item.id.includes(this.listQuery.keywordid)) &&
          (!this.listQuery.keywordname || item.name.includes(this.listQuery.keywordname))
        );
      });
      this.total = this.filteredList.length;
    },
    querySearch(queryString, cb) {
      const results = this.people.filter(people => {
        return people.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      })
      cb(results)
    }
  },
  mounted() {
    this.people = this.loadAll();
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
.add-course-button {
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
