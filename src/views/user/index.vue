<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select
        v-model="listQuery.status"
        size="small"
        placeholder="课程状态"
        clearable
        class="filter-item"
      >
        <el-option label="可选" :value="'已开始'" />
        <el-option label="不可选" :value="'未开始'" />
      </el-select>
      <el-select
        v-model="listQuery.filled"
        size="small"
        placeholder="是否选满"
        clearable
        class="filter-item"
      >
        <el-option label="是" :value="true" />
        <el-option label="否" :value="false" />
      </el-select>
      <el-select v-model="listQuery.institution" size="small" placeholder="开课学院" class="filter-item">
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
        v-model="listQuery.teacherName"
        :fetch-suggestions="querySearch"
        placeholder="课程负责人"
      ></el-autocomplete>
      <el-select v-model="listQuery.score" size="small" placeholder="学分" class="filter-item">
        <el-option
          v-for="item in options_score"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="listQuery.time" size="small" placeholder="学时" class="filter-item">
        <el-option
          v-for="item in options_time"
          :key="item.value"
          :label="item.label">
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
        v-model="listQuery.courseId"
        size="small"
        placeholder="请输入课程编号"
        clearable
        class="filter-item w-200"
      />
      <el-input
        v-model="listQuery.courseName"
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
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column
        label="开课部门"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.institution }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程负责人"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.teacherName }}
        </template>
      </el-table-column>
      <el-table-column
        label="课程类型"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.courseType }}
        </template>
      </el-table-column>
      <el-table-column
        label="总课时"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column
        label="学分"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column
        label="开课学期"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.semester }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span :class="{'status-label': true, 'available': scope.row.status === '已开始', 'not-available': scope.row.status === '未开始'}">
            {{ scope.row.status === '已开始' ? '可选' : '不可选' }}
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
          <el-button type="primary" size="mini" @click="view(scope)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === '编辑' ? '编辑课程信息' : '查看课程信息'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="课程编号">
          <el-input v-model="temp.courseId" placeholder="请输入课程编号" disabled/>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="temp.courseName" placeholder="请输入课程名称" disabled/>
        </el-form-item>
        <el-form-item label="开课部门">
          <el-input v-model="temp.institution" placeholder="请输入开课部门" disabled/>
        </el-form-item>
        <el-form-item label="开课学期">
          <el-input v-model="temp.semester" placeholder="请输入开课学期" disabled/>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="temp.score" placeholder="请输入学分" disabled/>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="temp.introduction" placeholder="请输入课程描述" disabled/>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { deepClone } from '@/utils'
import { getlist, searchCourses } from '@/api/s_check_course'

const _temp = {
  courseId: '',
  courseName: '',
  institution: '',
  status: '',
  teacherName: '',
  time:'',
  score: '',
  semister:'',
  courseType:'',
  filled:''
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
        courseId: '',
        courseName: '',
        institution: '',
        status: '',
        teacherName: '',
        time:'',
        score: '',
        semister:'',
        courseType:'',
        filled: null // 设置为 null 以确保其为布尔值或 null
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
      this.listLoading = true;
      try {
        const response = await getlist();
        console.log('Fetched Data:', response.data); // 打印返回的数据
        this.list = response.data;
        this.filteredList = this.list;
        this.total = response.data.total;
      } catch (error) {
        console.error('Error fetching course list:', error);
      } finally {
        this.listLoading = false;
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
    async view(scope) {
      this.temp = deepClone(scope.row)
      this.dialogType = '查看'
      this.dialogVisible = true
    },
    async search() {
      this.fetchFilteredData()
    },
    async refresh() {
      this.listQuery = {
        courseId: '',
        courseName: '',
        institution: '',
        status: '',
        teacherName: '',
        time:'',
        score: '',
        semister:'',
        courseType:'',
        filled: null
      }
      await this.fetchData()
    },
    async fetchFilteredData() {
      this.listLoading = true;
      try {
        const response = await searchCourses(this.listQuery);
        this.filteredList = response.data.items;
        this.total = response.data.total;
      } catch (error) {
        console.error('Failed to fetch filtered data:', error);
      } finally {
        this.listLoading = false;
      }
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
