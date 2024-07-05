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
        @select="handleSelect"
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
      :data="list"
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
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
        label="开课部门"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.truename }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程负责人"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        label="总课时"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column
        label="学分"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column
        label="选课人数"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.last_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开课地点"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus($event, scope)"
          />
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
              查看
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

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType ==='查看'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="用户名">
          <el-input v-model="temp.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="temp.truename" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="temp.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="temp.type">
            <el-radio label="管理员">管理员</el-radio>
            <el-radio label="编辑">编辑</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-checkbox-group v-model="temp.role">
            <el-checkbox label="超级管理员" />
            <el-checkbox label="编辑人员" />
            <el-checkbox label="审核人员" />
            <el-checkbox label="客服人员" />
            <el-checkbox label="普通用户" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="temp.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
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
import { getList } from '@/api/user'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  username: '',
  truename: '',
  role: [],
  type: '管理员',
  email: '',
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
        { value: '选项1', label: '0' },
        { value: '选项2', label: '0.5' },
        { value: '选项3', label: '1' },
        { value: '选项4', label: '2' },
        { value: '选项5', label: '3' }
      ],
      options_time: [
        { value: '选项1', label: '16' },
        { value: '选项2', label: '24' },
        { value: '选项3', label: '32' }
      ],
      options_academy: [
        { value: '选项1', label: '计算机学院' },
        { value: '选项2', label: '农学院' },
        { value: '选项3', label: '人文学院' },
        { value: '选项4', label: '工程学院' },
        { value: '选项5', label: '理学院' },
        { value: '选项6', label: '管理学院' },
        { value: '选项7', label: '医学院' },
        { value: '选项8', label: '外国语学院' },
        { value: '选项9', label: '法学院' },
        { value: '选项10', label: '教育学院' },
        { value: '选项11', label: '艺术学院' }
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
      listLoading: true,
      dialogVisible: false,
      dialogType: 'create',
      temp: Object.assign({}, _temp),
      loading:false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    loadAll() {
                return [
                  { "value": "刘大江" },
                  { "value": "冯永" },
                  { "value": "但敬佩" },
                  { "value": "叶春晓" }
                ];
              },
    async fetchData() {
      this.listLoading = true
       getList(this.listQuery).then(response => {
              this.list = response.data.items
              this.total = response.data.total
              this.listLoading = false
            })
    },
      resetTemp() {
          this.temp = Object.assign({}, _temp)
        },
   /* changeStatus(status, scope) {
      scope.row.status = status
    }, */
    async edit(scope) {
      this.temp = deepClone(scope.row)
      this.dialogType = '查看'
      this.dialogVisible = true
    },
    submit() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false
        }
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    search() {
      this.fetchData()
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
      this.fetchData()
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
</style>
