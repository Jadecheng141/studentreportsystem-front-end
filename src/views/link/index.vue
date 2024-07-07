<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select
        v-model="listQuery.tacademy"
        size="small"
        placeholder="选择学院"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in options_college"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="listQuery.teacherId"
        size="small"
        placeholder="请输入教师工号"
        clearable
        class="filter-item w-150"
      />
      <el-input
        v-model="listQuery.teacherName"
        size="small"
        placeholder="请输入教师姓名"
        clearable
        class="filter-item w-150"
      />
      <div class="button-container">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          class="button-item"
          @click="search"
        >
          搜索
        </el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          class="button-item"
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
        label="教师工号"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.teacherId }}
        </template>
      </el-table-column>
      <el-table-column
        label="教师姓名"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.teacherName }}
        </template>
      </el-table-column>
      <el-table-column
        label="所属学院"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.tacademy }}
        </template>
      </el-table-column>
      <el-table-column
        label="职称"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="fetchData"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      :title="dialogType === '查看' ? '教师信息' : '新增教师信息'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="教师工号">
              <el-input v-model="temp.teacherId" placeholder="请输入教师工号" :disabled="dialogType === '查看'" />
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="temp.teacherName" placeholder="请输入教师姓名" :disabled="dialogType === '查看'" />
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="temp.title" placeholder="请输入职称" :disabled="dialogType === '查看'" />
            </el-form-item>
            <el-form-item label="所属学院">
              <el-select v-model="temp.tacademy" placeholder="请选择学院" :disabled="dialogType === '查看'">
                <el-option
                  v-for="item in options_college"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="temp.temail" placeholder="请输入电子邮箱" :disabled="dialogType === '查看'" />
            </el-form-item>
            <el-form-item label="照片">
              <!--  <el-upload
                action="#"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :disabled="dialogType === '查看'"
              >
                <i class="el-icon-plus" v-if="dialogType !== '查看'"></i>
              </el-upload> -->
              <img :src="temp.figureUrl" alt="">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人简介">
              <el-input
                v-model="temp.introduction"
                type="textarea"
                placeholder="请输入个人简介"
                rows="10"
                :disabled="dialogType === '查看'"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <el-button v-if="dialogType !== '查看'" type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button v-if="dialogType !== '查看'" type="primary" @click="submit">
          确定
        </el-button>
        <el-button v-else type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getlist, searchCourses, detailCourses } from '@/api/s_check_teacher'
const _temp = {
  teacherId: '',
  teacherName: '',
  tacademy: '',
  title: '',
  temail: '',
  figureUrl: '',
  introduction: '',
  imageBytes: ''
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
        teacherId: '',
        teacherName: '',
        tacademy: '',
        title: '',
        temail: '',
        figureUrl: '',
        introduction: '',
        imageBytes: ''

      },
      total: 0,
      list: [],
      filteredList: [],
      listLoading: true,
      dialogVisible: false,
      dialogType: 'create',
      temp: Object.assign({}, _temp),
      loading: false,
      dialogImageUrl: '',
      fileList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const formData = new FormData()
      formData.append('currentPage', this.currentPage)
      formData.append('pageSize', this.pageSize)
      try {
        const response = await getlist(formData)
        this.list = response.data.teachers
        this.filteredList = this.list
        this.total = response.data.total
      } catch (error) {
        console.error('Error fetching teacher list:', error)
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
    async view(scope) {
      try {
        const response = await detailCourses(scope.row.teacherId)
        this.temp = response.data
        this.dialogType = '查看'
        this.dialogVisible = true
      } catch (error) {
        console.error('Failed to fetch course details:', error)
      }
    },
    submit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const index = this.list.findIndex(item => item.teacherId === this.temp.teacherId)
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
    },
    handleRemove(file, fileList) {
      this.temp.photo = ''
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      this.temp.photo = URL.createObjectURL(file.raw)
      this.fileList = fileList
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async search() {
      await this.fetchFilteredData()
    },
    async refresh() {
      this.listQuery = {
        teacherId: '',
        teacherName: '',
        tacademy: '',
        title: '',
        temail: '',
        figureUrl: '',
        introduction: '',
        imageBytes: ''
      }
      await this.fetchData()
    },
    async fetchFilteredData() {
      this.listLoading = true
      const formData = new FormData()
      for (const key in this.listQuery) {
        if (Object.prototype.hasOwnProperty.call(this.listQuery, key)) {
          formData.append(key, this.listQuery[key])
        }
      }
      formData.append('currentPage', this.currentPage)
      formData.append('pageSize', this.pageSize)
      try {
        const response = await searchCourses(formData)
        this.filteredList = response.data.teachers
        this.total = response.data.total
      } catch (error) {
        console.error('Failed to fetch filtered data:', error)
      } finally {
        this.listLoading = false
      }
    }
  }
}
</script>

<style scoped>
.filter-container1 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}
.filter-item {
  margin-right: 5px;
  margin-bottom: 5px;
}
.w-150 {
  width: 150px;
}
.button-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.text-right {
  text-align: right;
}
.add-teacher-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
