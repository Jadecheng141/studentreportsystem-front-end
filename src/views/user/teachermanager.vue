<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.academy" size="small" placeholder="所属学院" clearable class="filter-item">
        <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="listQuery.studentId" size="small" placeholder="请输入学生学号" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.studentName" size="small" placeholder="请输入学生姓名" clearable class="filter-item w-200" />
      <el-button size="small" type="primary" icon="el-icon-search" @click="search" class="filter-item">
        搜索
      </el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh" class="filter-item">
        重置
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="加载中" border fit height="100%" class="table-container" highlight-current-row>
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
          <span :class="{'status-dot': true, 'completed': scope.row.state1, 'not-completed': !scope.row.state1}"></span>
        </template>
      </el-table-column>
      <el-table-column label="宿舍确认" align="center">
        <template slot-scope="scope">
          <span :class="{'status-dot': true, 'completed': scope.row.state2, 'not-completed': !scope.row.state2}"></span>
        </template>
      </el-table-column>
      <el-table-column label="是否缴费" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.state3" @change="updateFeeStatus(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="edit(scope)">
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
          <el-input v-model="temp.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="temp.academy" placeholder="请选择学院">
            <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍">
          <el-input v-model="temp.dorm" placeholder="请输入宿舍" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="temp.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="照片">
          <img :src="temp.figureUrl" class="avatar" />
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
import { searchCourses } from '@/api/studentmanager'
import { deepClone } from '@/utils'

const _temp = {
  studentId: '',
  studentName: '',
  phone: '',
  academy: '',
  state1: false,
  state2: false,
  state3: false,
  dorm: '',
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
        phone: '',
        academy: '',
        state1: false,
        state2: false,
        state3: false,
        dorm: '',
        email: '',
        figureUrl: '',
        page: 1,
        limit: 10
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
        const response = await searchCourses(this.listQuery);
        this.list = response.data.list; // 确保这与您的API响应结构一致
        this.total = response.data.total; // 确保这与您的API响应结构一致
        this.filteredList = this.list;
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        this.listLoading = false;
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
    edit(scope) {
      this.temp = Object.assign({}, scope.row)
      this.dialogVisible = true
      this.dialogType = '查看'
    },
    search() {
      this.listQuery.page = 1; // 搜索时重置到第一页
      this.fetchData();
    },
    refresh() {
      this.listQuery = deepClone(_temp);
      this.fetchData();
    },
    submit() {
      const temp = Object.assign({}, this.temp);
      // 保存逻辑
      this.dialogVisible = false;
      this.fetchData();
    },
    updateFeeStatus(row) {
      // 模拟更新状态
      row.state3 = !row.state3;
      this.$message.success('缴费状态更新成功');
    },
    handlePaginationChange(page) {
      this.listQuery.page = page;
      this.fetchData();
    },
    handleLimitChange(limit) {
      this.listQuery.limit = limit;
      this.fetchData();
    }
  }
}
</script>

<script>
import { searchCourses, getlist, createCourse, deleteCourse, updateCourse } from '@/api/t_check_teacher'
import Pagination from '@/components/Pagination'
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
      this.listLoading = true;
      try {
        const response = await getlist();
        this.list = response.data;
        this.total = this.list.length;
        this.filteredList = this.list;
      } catch (error) {
        console.error('Error fetching teacher data:', error);
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
      }).then(async () => {
        try {
          await deleteCourse(scope.row.teacherId);
          this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } catch (error) {
          console.error('Failed to delete teacher:', error);
          this.$message({
            type: 'error',
            message: '删除失败，请重试。'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async submit() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          try {
            if (this.dialogType === '新增') {
              await createCourse(this.temp);
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            } else {
              await updateCourse(this.temp);
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            }
            this.fetchData();
            this.dialogVisible = false;
          } catch (error) {
            console.error(`Failed to ${this.dialogType === '新增' ? 'create' : 'update'} teacher:`, error);
            this.$message({
              type: 'error',
              message: `${this.dialogType === '新增' ? '添加' : '更新'}失败，请重试。`
            });
          }
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
    async search() {
      await this.fetchFilteredData();
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        college: undefined,
        teacherId: '',
        teacherName: ''
      }
      this.fetchData();
    },
    async fetchFilteredData() {
      this.listLoading = true;
      try {
        const response = await searchCourses(this.listQuery);
        this.filteredList = response.data;
        this.total = this.filteredList.length;
      } catch (error) {
        console.error('Failed to fetch filtered data:', error);
      } finally {
        this.listLoading = false;
      }
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
