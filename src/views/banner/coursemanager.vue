<template>
  <div class="app-container">
    <!-- 筛选框 -->
    <div class="filter-container1">
      <el-select v-model="listQuery.status" size="small" placeholder="课程状态" clearable class="filter-item">
        <el-option label="可选" :value="'已开始'" />
        <el-option label="不可选" :value="'未开始'" />
      </el-select>

      <el-select v-model="listQuery.filled" size="small" placeholder="是否选满" clearable class="filter-item">
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>

      <el-select v-model="listQuery.institution" size="small" placeholder="开课学院" class="filter-item">
        <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-autocomplete v-model="listQuery.teacherName" class="inline-input" size="small" :fetch-suggestions="querySearch" placeholder="课程负责人" />

      <el-select v-model="listQuery.score" size="small" placeholder="学分" class="filter-item">
        <el-option v-for="item in options_score" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="listQuery.time" size="small" placeholder="学时" class="filter-item">
        <el-option v-for="item in options_time" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <div class="button-container">
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
      </div>
    </div>

    <div class="filter-container2">
      <el-input v-model="listQuery.courseId" size="small" placeholder="请输入课程编号" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.courseName" size="small" placeholder="请输入课程名称" clearable class="filter-item w-200" />
      <div class="button-container">
        <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh">
          重置
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="Loading" border fit height="100%" class="table-container" highlight-current-row>
      <el-table-column fixed label="课程编号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column label="开课部门" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.institution }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程负责人" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.teacherName }}
        </template>
      </el-table-column>
      <el-table-column label="总课时" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="学分" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="选课情况" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentNumOfStu }}/{{ scope.row.ceilingOfPersonnel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开课地点" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classRoomNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span :class="{'status-label': true, 'available': scope.row.status === '已开始', 'not-available': scope.row.status === '未开始'||scope.row.status === '已结束'}">
            {{ scope.row.status === '已开始' ? '可选' : '不可选' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="edit(scope)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="del(scope)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-button class="add-course-button" type="primary" size="large" @click="create">
      添加课程
    </el-button>

    <!-- 新增课程对话框 -->
    <el-dialog :visible.sync="addDialogVisible" title="新增课程信息">
      <el-form ref="dataForm" :model="temp" label-width="120px" label-position="right">
        <el-form-item label="课程名称">
          <el-input v-model="temp.courseName" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="开课部门">
          <el-input v-model="temp.institution" placeholder="请输入开课部门" />
        </el-form-item>
        <el-form-item label="课程负责人">
          <el-input v-model="temp.teacherName" placeholder="请输入课程负责人" />
        </el-form-item>
        <el-form-item label="教师工号">
          <el-input v-model="temp.teacherId" placeholder="请输入教师工号" />
        </el-form-item>
        <el-form-item label="课程类型">
          <el-input v-model="temp.courseType" placeholder="请输入课程类型" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="temp.score" placeholder="请输入学分" />
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="temp.time" placeholder="请输入学时" />
        </el-form-item>
        <el-form-item label="开课学期">
          <el-input v-model="temp.semester" placeholder="请输入开课学期" />
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="temp.introduction" placeholder="请输入课程描述" />
        </el-form-item>
        <el-form-item label="人数上限">
          <el-input v-model="temp.ceilingOfPersonnel" placeholder="请输入人数上限" />
        </el-form-item>
        <el-form-item label="开课地点">
          <el-input v-model="temp.classRoomNo" placeholder="请输入开课地点" />
        </el-form-item>
        <el-form-item label="四位标识码">
          <el-input v-model="temp.identificationCode" placeholder="请输入四位标识码" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" placeholder="请选择状态">
            <el-option label="可选" :value="'已开始'" />
            <el-option label="不可选" :value="'未开始'" />
          </el-select>
        </el-form-item>
        <div class="text-right">
          <el-button type="danger" @click="addDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submit('add')">
            确定
          </el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 编辑课程对话框 -->
    <el-dialog :visible.sync="editDialogVisible" title="编辑课程状态">
      <el-form ref="statusForm" :model="temp" label-width="120px" label-position="right">
        <el-form-item label="状态">
          <el-select v-model="temp.status" placeholder="请选择状态">
            <el-option label="可选" :value="'已开始'" />
            <el-option label="不可选" :value="'未开始'" />
          </el-select>
        </el-form-item>
        <div class="text-right">
          <el-button type="danger" @click="editDialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submit('edit')">
            确定
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getlist, searchCourses, detailCourses, updateCourse, createCourse, deleteCourse } from '@/api/t_check_course'

const _temp = {
  courseId: '',
  courseName: '',
  institution: '',
  status: '',
  teacherName: '',
  time: '',
  score: '',
  currentNumOfStu: '',
  ceilingOfPersonnel: '',
  classRoomNo: '',
  identificationCode: '',
  semester: '',
  teacherId: '',
  courseType: '',
  introduction: ''
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
        { value: '32', label: '32' },
        { value: '40', label: '40' }
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
        time: '',
        score: '',
        currentNumOfStu: '',
        ceilingOfPersonnel: '',
        classRoomNo: '',
        teacherId: '',
        courseType: '',
        introduction: ''
      },
      total: 0,
      list: [],
      filteredList: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      dialogType: 'create',
      temp: Object.assign({}, _temp),
      loading: false,
      currentPage: 1,
      pageSize: 10
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
        const response = await getlist()
        this.list = response.data
        this.filteredList = this.list
      } catch (error) {
        console.error('Error fetching course list:', error)
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
      this.addDialogVisible = true
    },
    async edit(scope) {
      try {
        const courseDetails = await detailCourses(scope.row.courseId)
        this.temp = {
          ...this.temp,
          courseId: courseDetails.data.courseId,
          status: courseDetails.data.status
        }
        this.dialogType = '编辑'
        this.editDialogVisible = true
      } catch (error) {
        this.$message.error('获取课程详情失败')
      }
    },
    async saveChanges() {
      try {
        const response = await updateCourse(this.temp.courseId, { status: this.temp.status })
        if (response.status === 200) {
          this.$message({
            message: '课程状态更新成功',
            type: 'success'
          })
          this.editDialogVisible = false
          this.fetchData() // 更新数据
        }
      } catch (error) {
        this.$message.error('课程状态更新失败')
      }
    },
    async submit(type) {
      if (type === 'edit') {
        await this.saveChanges()
      } else if (type === 'add') {
        try {
          const response = await createCourse(this.temp)
          if (response.status === 200) {
            this.$message({
              message: '课程添加成功',
              type: 'success'
            })
            this.addDialogVisible = false
            this.fetchData() // 更新数据
          }
        } catch (error) {
          this.$message.error('课程添加失败')
        }
      }
    },
    async del(scope) {
      try {
        await this.$confirm('确认删除该条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const response = await deleteCourse(scope.row.courseId)
        if (response.status === 200) {
          this.$message({
            message: '课程删除成功',
            type: 'success'
          })
          this.fetchData() // 更新数据
        }
      } catch (error) {
        this.$message.error('课程删除失败')
      }
    },
    async search() {
      await this.fetchFilteredData()
    },
    async refresh() {
      this.listQuery = {
        courseId: '',
        courseName: '',
        institution: '',
        status: '',
        teacherName: '',
        time: '',
        score: '',
        currentNumOfStu: '',
        ceilingOfPersonnel: '',
        classRoomNo: '',
        teacherId: '',
        courseType: '',
        introduction: ''
      }
      await this.fetchData()
    },
    async fetchFilteredData() {
      this.listLoading = true
      try {
        const formData = new FormData()
        for (const key in this.listQuery) {
          if (Object.prototype.hasOwnProperty.call(this.listQuery, key)) {
            formData.append(key, this.listQuery[key])
          }
        }
        // 将filled属性转换为布尔值
        if (formData.has('filled')) {
          formData.set('filled', formData.get('filled') === 'true')
        }
        formData.append('currentPage', this.currentPage)
        formData.append('pageSize', this.pageSize)
        const response = await searchCourses(formData)
        this.filteredList = response.data.courses
        this.total = response.data.total
      } catch (error) {
        console.error('Failed to fetch filtered data:', error)
      } finally {
        this.listLoading = false
      }
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
   width: 80px;
   text-align: center;
 }
 .available {
   background-color: green;
   background-image: green;
 }
 .not-available {
   background-color: red;
   background-image: red;
 }
 </style>
