<template>
  <div class="app-container">
    <div class="filter-container1">
      <el-select
        v-model="listQuery.college"
        size="small"
        placeholder="选择学院"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in options_college"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
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
          @click="search"
          class="button-item"
        >
          搜索
        </el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
          class="button-item"
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
          {{ scope.row.college }}
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
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
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
      :visible.sync="dialogVisible"
      width="70%"
      :title="dialogType === '查看编辑' ? '教师信息' : '新增教师信息'"
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
              <el-input v-model="temp.teacherId" placeholder="请输入教师工号" />
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="temp.teacherName" placeholder="请输入教师姓名" />
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="temp.title" placeholder="请输入职称" />
            </el-form-item>
            <el-form-item label="所属学院">
              <el-select v-model="temp.college" placeholder="请选择学院">
                <el-option
                  v-for="item in options_college"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="temp.email" placeholder="请输入电子邮箱" />
            </el-form-item>
            <el-form-item label="照片">
              <el-upload
                action="#"
                list-type="picture-card"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogImageUrl" size="tiny">
                <img :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个人简介">
              <el-input
                type="textarea"
                v-model="temp.bio"
                placeholder="请输入个人简介"
                rows="10"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
  teacherId: '',
  teacherName: '',
  college: '',
  title: '',
  email: '',
  photo: '',
  bio: ''
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
        college: undefined,
        teacherId: '',
        teacherName: ''
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
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // 模拟数据
      this.list = [
        { teacherId: 'T001', teacherName: '张三', college: '计算机学院', title: '教授', email: 'zhangsan@example.com', photo: 'http://example.com/photo1.jpg', bio: '张三教授的个人简介' },
        { teacherId: 'T002', teacherName: '李四', college: '农学院', title: '副教授', email: 'lisi@example.com', photo: 'http://example.com/photo2.jpg', bio: '李四副教授的个人简介' },
        { teacherId: 'T003', teacherName: '王五', college: '人文学院', title: '讲师', email: 'wangwu@example.com', photo: 'http://example.com/photo3.jpg', bio: '王五讲师的个人简介' },
        { teacherId: 'T004', teacherName: '赵六', college: '工程学院', title: '助教', email: 'zhaoliu@example.com', photo: 'http://example.com/photo4.jpg', bio: '赵六助教的个人简介' }
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
      this.fileList = this.temp.photo ? [{ name: '照片', url: this.temp.photo }] : [];
    },
    async del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.list.findIndex(item => item.teacherId === scope.row.teacherId);
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
          const index = this.list.findIndex(item => item.teacherId === this.temp.teacherId);
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    },
    handleRemove(file, fileList) {
      this.temp.photo = '';
      this.fileList = fileList;
    },
    handleSuccess(response, file, fileList) {
      this.temp.photo = URL.createObjectURL(file.raw);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    search() {
      this.filterList()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        college: undefined,
        teacherId: '',
        teacherName: ''
      }
      this.filteredList = this.list;
    },
    filterList() {
      this.filteredList = this.list.filter(item => {
        return (
          (!this.listQuery.college || item.college.includes(this.listQuery.college)) &&
          (!this.listQuery.teacherId || item.teacherId.includes(this.listQuery.teacherId)) &&
          (!this.listQuery.teacherName || item.teacherName.includes(this.listQuery.teacherName))
        );
      });
      this.total = this.filteredList.length;
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
