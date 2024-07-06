<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.value_academy" size="small" placeholder="所属学院" clearable class="filter-item">
        <el-option v-for="item in options_academy" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="listQuery.keywordid" size="small" placeholder="请输入学生学号" clearable class="filter-item w-200" />
      <el-input v-model="listQuery.keywordname" size="small" placeholder="请输入学生姓名" clearable class="filter-item w-200" />
      <el-button size="small" type="primary" icon="el-icon-search" @click="search" class="filter-item">
        搜索
      </el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh" class="filter-item">
        重置
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="Loading" border fit height="100%" class="table-container" highlight-current-row>
      <el-table-column label="学生学号" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="所属学院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.academy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报道信息填写" align="center">
        <template slot-scope="scope">
          <span :class="{'status-dot': true, 'completed': scope.row.reportInfoCompleted, 'not-completed': !scope.row.reportInfoCompleted}"></span>
        </template>
      </el-table-column>
      <el-table-column label="宿舍确认" align="center">
        <template slot-scope="scope">
          <span :class="{'status-dot': true, 'completed': scope.row.dormConfirmed, 'not-completed': !scope.row.dormConfirmed}"></span>
        </template>
      </el-table-column>
      <el-table-column label="是否缴费" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.feePaid" @change="updateFeeStatus(scope.row)"></el-checkbox>
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
          <el-input v-model="temp.id" placeholder="请输入学生学号" />
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="temp.username" placeholder="请输入学生姓名" />
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
          <img v-if="temp.avatar" :src="temp.avatar" class="avatar" />
        </el-form-item>
      </el-form>
      <div class="text-right">
        <!-- <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button> -->
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import { getList, updateFeeStatus } from '@/api/user'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  username: '',
  phone: '',
  academy: '',
  dorm: '',
  email: '',
  avatar: '',
  reportInfoCompleted: false,
  dormConfirmed: false,
  feePaid: false
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
        page: 1,
        limit: 20,
        value_academy: '',
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
        { id: '20190001', username: '张三', phone: '12345678901', academy: '计算机学院', dorm: '1号楼101', email: 'zhangsan@example.com', avatar: 'https://via.placeholder.com/150', reportInfoCompleted: false, dormConfirmed: true, feePaid: false },
        { id: '20190002', username: '李四', phone: '12345678902', academy: '农学院', dorm: '2号楼202', email: 'lisi@example.com', avatar: 'https://via.placeholder.com/150', reportInfoCompleted: false, dormConfirmed: true, feePaid: true },
        { id: '20190003', username: '王五', phone: '12345678903', academy: '人文学院', dorm: '3号楼303', email: 'wangwu@example.com', avatar: 'https://via.placeholder.com/150', reportInfoCompleted: true, dormConfirmed: false, feePaid: false },
        { id: '20190004', username: '赵六', phone: '12345678904', academy: '工程学院', dorm: '4号楼404', email: 'zhaoliu@example.com', avatar: 'https://via.placeholder.com/150', reportInfoCompleted: true, dormConfirmed: true, feePaid: true }
      ];
      this.total = this.list.length;
      this.filteredList = this.list;
      this.listLoading = false;
    },
    changeStatus(status, scope) {
      scope.row.status = status
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
      this.filterList()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        value_academy: '',
        keywordid: '',
        keywordname: ''
      }
      this.filteredList = this.list
    },
    submit() {
      const temp = Object.assign({}, this.temp)
      // Save logic
      this.dialogVisible = false
      this.fetchData()
    },
    updateFeeStatus(row) {
      // 模拟更新状态
      row.feePaid = !row.feePaid;
      this.$message.success('缴费状态更新成功');
    },
    filterList() {
      this.filteredList = this.list.filter(item => {
        return (
          (!this.listQuery.value_academy || item.academy.includes(this.listQuery.value_academy)) &&
          (!this.listQuery.keywordid || item.id.includes(this.listQuery.keywordid)) &&
          (!this.listQuery.keywordname || item.username.includes(this.listQuery.keywordname))
        );
      });
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
