
<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="500px" class="aside">
      <div>
        <h3 class="text">选中的信息：</h3>
        <ul>
          <li v-for="(row, index) in savedRows" :key="index" class="saved-row">
            日期: {{ row.date }} 姓名: {{ row.name }}
            <el-button type="danger" @click="removeSavedRow(index, row)" class="delete-button">删除</el-button>
          </li>
        </ul>
      </div>
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
                      prop="date"
                      label="课程编码"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="课程名称"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="学分"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="place"
                      label="校区"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="课程类别"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="setting"
                      label="课程性质"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="situation"
                      label="选择情况"
                      show-overflow-tooltip>
                    </el-table-column>
          <!-- 根据实际需要添加其他列 -->
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
import axios from 'axios';

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
    fetchTableData() {
      axios.get('http://localhost:8080/api/table-data') // 替换为实际的Spring Boot API端点
        .then(response => {
          this.tableData = response.data;
          this.syncTableSelection(); // 同步保存的行与表格选择状态
        })
        .catch(error => {
          console.error('获取表格数据出错:', error);
        });
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
    saveSelection() {
      // 如果需要，实现保存逻辑到后端
      // 这里仅作为演示，在本地更新保存的行数据
      this.multipleSelection.forEach(row => {
        if (!this.isRowSaved(row)) {
          this.savedRows.push(row);
        }
      });
      this.syncTableSelection();
    },
    isRowSaved(row) {
      return this.savedRows.some(savedRow => savedRow.date === row.date && savedRow.name === row.name);
    },
    loadSavedRows() {
      const savedRows = localStorage.getItem('savedRows');
      if (savedRows) {
        this.savedRows = JSON.parse(savedRows);
      }
      this.syncTableSelection();
    },
    syncTableSelection() {
      this.$nextTick(() => {
        this.savedRows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      });
    },
    removeSavedRow(index, row) {
      this.savedRows.splice(index, 1);
      localStorage.setItem('savedRows', JSON.stringify(this.savedRows));
      this.$refs.multipleTable.toggleRowSelection(row, false);
    }
  }
};
</script>
<style>
.el-container {
  font-family: Arial, sans-serif;
}
.mytable{
  top:-8px;
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

.button{
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
.text{
  margin-top:1px;
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
</style>
