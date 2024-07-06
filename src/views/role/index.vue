<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="500px" class="aside">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选中的信息</span>
        </div>
        <el-table
          :data="savedRows"
          style="width: 100%">
          <el-table-column
            prop="courseId"
            label="课程编码"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button type="danger" @click="removeSavedRow(scope.$index, scope.row)" class="delete-button">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-aside>

    <!-- 主内容 -->
    <el-container>
      <el-header class="header">
        <div class="button">
          <el-link :underline="false" href="http://localhost:9529/#/setting/menu" target="_blank" class="mytable">我的课表</el-link>
        </div>
      </el-header>
      <el-main class="main">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="courseId"
            label="课程编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="score"
            label="学分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="classRoomNo"
            label="教室编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="courseType"
            label="课程类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="currentNumOfStu"
            label="当前学生人数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="ceilingOfPersonnel"
            label="人数上限"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="教师姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="introduction"
            label="课程简介"
            width="200">
          </el-table-column>
        </el-table>
        <div class="button-group">
          <el-button @click="saveSelection()">确定选择</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getCourses, getSelectedCourses, saveSelectedCourses, deleteCourse } from '@/api/selectcourse';

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      savedRows: []
    };
  },
  mounted() {
    this.fetchTableData(); // 组件挂载时获取数据
    this.loadSavedRows();
  },
  methods: {
    async fetchTableData() {
      try {
        const response = await getCourses();
        this.tableData = response.data;
         console.log('response:',response.data);
        this.syncTableSelection(); // 同步保存的行与表格选择状态
      } catch (error) {
        console.error('获取表格数据出错:', error);
      }
    },
    async loadSavedRows() {
      try {
        const response = await getSelectedCourses();
        this.savedRows = response.data;
        this.syncTableSelection(); // 同步保存的行与表格选择状态
      } catch (error) {
        console.error('加载已选课程出错:', error);
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async saveSelection() {
      try {
        const selectedCourseIds = this.multipleSelection.map(row => row.courseId);
        await saveSelectedCourses(selectedCourseIds);
        this.multipleSelection.forEach(row => {
          if (!this.isRowSaved(row)) {
            this.savedRows.push(row);
          }
        });
        this.syncTableSelection();
        this.storeSavedRows(); // 更新本地存储
      } catch (error) {
        console.error('保存选中的课程出错:', error);
      }
    },
    async removeSavedRow(index, row) {
      try {
        await deleteCourse(row.courseId);
        this.savedRows.splice(index, 1);
        this.storeSavedRows(); // 更新本地存储
        this.$refs.multipleTable.toggleRowSelection(row, false);
      } catch (error) {
        console.error('删除选中的课程出错:', error);
      }
    },
    isRowSaved(row) {
      return this.savedRows.some(savedRow => savedRow.courseId === row.courseId);
    },
    storeSavedRows() {
      localStorage.setItem('savedRows', JSON.stringify(this.savedRows));
    },
    syncTableSelection() {
      this.$nextTick(() => {
        this.savedRows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      });
    }
  }
};
</script>

<style>
.el-container {
  font-family: Arial, sans-serif;
}
.mytable {
  top: -20px;
}
.aside {
  background-color: #f5f7fa;
  padding: 20px;
  border-right: 1px solid #ebeef5;
}

.header {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.main {
  padding: 20px;
}

.button-group {
  margin-top: 20px;
}

.button {
  border-radius: 20px;
  width: 120px;
  background-image: linear-gradient(to bottom right, white, LightBlue);
  margin-left: 450px;
  height: 40px;
  margin-top: 10px;
}

.saved-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ebeef5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 50px;
}

.course-info {
  display: flex;
  flex-direction: column;
}

.course-info span {
  margin-bottom: 5px;
}

.delete-button {
  margin-left: 20px;
}

.el-header, .el-footer {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #f5f7fa;
  color: #333;
  text-align: center;
  line-height: 200px;
  padding: 20px;
}

.el-main {
  background-color: #f5f7fa;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 20px;
}

.text {
  margin-top: 1px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-table .el-checkbox__inner {
  border-color: #409eff;
}

.el-table .el-checkbox__inner:hover, .el-table .el-checkbox__inner.is-checked {
  background-color: #409eff;
  border-color: #409eff;
}

.box-card {
  width: 100%;
}
.clearfix{
  height: 20px;
}
</style>
