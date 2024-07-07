
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
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope)"
            >
              查看编辑
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
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="fetchDataWithFilter"
    />

    <el-button
      class="add-teacher-button"
      type="primary"
      size="large"
      @click="create"
    >
      添加教师
    </el-button>

    <el-dialog
      :visible.sync="addDialogVisible"
      width="70%"
      title="新增教师信息"
    >
      <el-form
        ref="addForm"
        :model="addTemp"
        label-width="120px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="教师工号">
              <el-input v-model="addTemp.teacherId" placeholder="请输入教师工号" />
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="addTemp.teacherName" placeholder="请输入教师姓名" />
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="addTemp.title" placeholder="请输入职称" />
            </el-form-item>
            <el-form-item label="所属学院">
              <el-select v-model="addTemp.tacademy" placeholder="请选择学院">
                <el-option
                  v-for="item in options_college"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="addTemp.temail" placeholder="请输入电子邮箱" />
            </el-form-item>
            <!-- <el-form-item label="照片">
              <el-upload
                class="avatar-uploader"
                action=" "
                :http-request="uploadFile"
                :show-file-list="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <!--              <el-dialog :visible.sync="dialogImageUrl" size="tiny">
                <img :src="dialogImageUrl" alt="">
              </el-dialog> -->
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人简介">
              <el-input
                v-model="addTemp.introduction"
                type="textarea"
                placeholder="请输入个人简介"
                rows="10"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <el-button type="danger" @click="addDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submitAdd">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="editDialogVisible"
      width="70%"
      title="编辑教师信息"
    >
      <el-form
        ref="editForm"
        :model="editTemp"
        label-width="120px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="教师工号">
              <el-input v-model="editTemp.teacherId" placeholder="请输入教师工号" />
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="editTemp.teacherName" placeholder="请输入教师姓名" />
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="editTemp.title" placeholder="请输入职称" />
            </el-form-item>
            <el-form-item label="所属学院">
              <el-select v-model="editTemp.tacademy" placeholder="请选择学院">
                <el-option
                  v-for="item in options_college"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="editTemp.temail" placeholder="请输入电子邮箱" />
            </el-form-item>
          <!--  <el-form-item label="照片">
              <el-upload
                class="avatar-uploader"
                action=" "
                :http-request="uploadFile"
                :show-file-list="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <el-dialog :visible.sync="dialogImageUrl" size="tiny">
                <img :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人简介">
              <el-input
                v-model="editTemp.introduction"
                type="textarea"
                placeholder="请输入个人简介"
                rows="10"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-right">
        <el-button type="danger" @click="editDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submitEdit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getlist, searchCourses, createCourse, deleteCourse, updateCourse } from '@/api/t_check_teacher'
import { deepClone } from '@/utils'

const _temp = {
  teacherId: '',
  teacherName: '',
  tacademy: '',
  title: '',
  temail: '',
  figureUrl: '',
  introduction: ''
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
        introduction: ''
      },
      total: 0,
      currentPage: 1,
      pageSize: 10,
      list: [],
      filteredList: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      addTemp: Object.assign({}, _temp),
      editTemp: Object.assign({}, _temp),
      loading: false,
      imageUrl: null,
      dialogImageUrl: '',
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        const formData = new FormData()
        formData.append('formData', this.currentPage)
        formData.append('formData', this.pageSize)
        const response = await getlist(formData)
        this.list = response.data.teachers // 确保响应数据结构与预期匹配
        this.total = response.data.total // 确保总数与响应数据结构匹配
        this.filteredList = this.list
        console.log('response:', response.data)
      } catch (error) {
        console.error('Error fetching teacher data:', error)
      } finally {
        this.listLoading = false
      }
    },
    resetTemp() {
      this.addTemp = Object.assign({}, _temp)
      this.editTemp = Object.assign({}, _temp)
    },
    create() {
      this.resetTemp()
      this.fileList = [] // 清空文件列表
      this.addDialogVisible = true
    },
    async edit(scope) {
      this.editTemp = deepClone(scope.row)
      this.editDialogVisible = true
      this.fileList = this.editTemp.figureUrl ? [{ name: '照片', url: this.editTemp.figureUrl }] : []
    },
    async del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteCourse(scope.row.teacherId)
          const index = this.list.findIndex(item => item.teacherId === scope.row.teacherId)
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
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageUrl = e.target.result // 将图片的 base64 URL 保存到数据中
        console.log('imageUrl:', e.target.result)
      }
      reader.readAsDataURL(file) // 将文件读取为 Data URL
    },
    uploadFile(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      console.log('上传图片')
      this.previewImage(file.file)
      this.$axios.post('/AdmInfo/Addteacher/uploadTeacherPhoto', formData).then(response => {
        if (response.status === 'success') {
          this.$message.success('照片上传成功')
        } else {
          this.$message.error('照片上传失败')
        }
      }).catch(error => {
        // 处理错误
        console.error(error)
        this.$message.error('照片上传失败')
      })
    },
    async submitAdd() {
      try {
        await createCourse(this.addTemp)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.fetchData()
        this.addDialogVisible = false
      } catch (error) {
        this.$message({
          type: 'error',
          message: '操作失败!'
        })
      }
    },
    async submitEdit() {
      try {
        await updateCourse(this.editTemp)
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.fetchData()
        this.editDialogVisible = false
      } catch (error) {
        this.$message({
          type: 'error',
          message: '操作失败!'
        })
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
    },
    handleRemove(file, fileList) {
      this.editTemp.figureUrl = ''
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      this.editTemp.figureUrl = URL.createObjectURL(file.raw)
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
    search() {
      this.fetchDataWithFilter()
    },
    async fetchDataWithFilter() {
      this.listLoading = true
      try {
        console.log('传入数据', this.listQuery)
        const formData = new FormData()
        for (const key in this.listQuery) {
          if (Object.prototype.hasOwnProperty.call(this.listQuery, key)) {
            formData.append(key, this.listQuery[key])
          }
        }
        formData.append('currentPage', this.currentPage)
        formData.append('pageSize', this.pageSize)
        const response = await searchCourses(formData)
        this.filteredList = response.data.teachers // 确保响应数据结构与预期匹配
        this.total = response.data.total // 确保总数与响应数据结构匹配
        console.log('response:', response.data)
      } catch (error) {
        console.error('Error fetching filtered teacher data:', error)
      } finally {
        this.listLoading = false
      }
    },
    refresh() {
      this.listQuery = {
        teacherId: '',
        teacherName: '',
        tacademy: '',
        title: '',
        temail: '',
        figureUrl: '',
        introduction: ''
      }
      this.fetchData()
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
