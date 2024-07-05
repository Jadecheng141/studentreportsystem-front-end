<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="职位" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="明细">
          <template slot-scope="scope">
            <el-link :href="scope.row.addressLink" v-if="scope.row.addressLink" target="_blank">
              {{ scope.row.addressText }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [
          { date: '党委书记', name: '舒立春', addressLink: 'https://www.cqu.edu.cn/info/3021/1941.htm', addressText: '查看' },
          { date: '党委常务副书记', name: '王时龙', addressLink: 'https://www.cqu.edu.cn/info/3031/1961.htm', addressText: '查看' },
          { date: '党委常委副书记', name: '陶举虎', addressLink: 'https://www.cqu.edu.cn/info/3041/1971.htm', addressText: '查看' },
          { date: '党委副书记', name: '冯亚栋', addressLink: 'https://www.cqu.edu.cn/info/3051/1991.htm', addressText: '查看' },
          { date: '校长、党委书记', name: '王树新', addressLink: 'https://www.cqu.edu.cn/info/3061/2011.htm', addressText: '查看' },
          { date: '副校长', name: '邓绍江', addressLink: 'https://www.cqu.edu.cn/info/3081/2091.htm', addressText: '查看' },
          { date: '副校长', name: '卢义玉', addressLink: 'https://www.cqu.edu.cn/info/3081/2081.htm', addressText: '查看' },
          { date: '副校长', name: '李剑', addressLink: 'https://www.cqu.edu.cn/info/3081/2071.htm', addressText: '查看' },
          { date: '副校长', name: '刘贵文', addressLink: 'https://www.cqu.edu.cn/info/3081/2061.htm', addressText: '查看' },
          { date: '副校长', name: '杨俊', addressLink: 'https://www.cqu.edu.cn/info/3081/2051.htm', addressText: '查看' },
          { date: '副校长', name: '饶俊松', addressLink: 'https://www.cqu.edu.cn/info/3081/50361.htm', addressText: '查看' },
          { date: '党委常委', name: '舒立春', addressLink: '', addressText: '' },
          { date: '党委常委', name: '王树新', addressLink: '', addressText: '' },
          { date: '党委常委', name: '王时龙', addressLink: '', addressText: '' },
          { date: '党委常委', name: '陶举虎', addressLink: '', addressText: '' },
          { date: '党委常委', name: '冯业栋', addressLink: '', addressText: '' },
          { date: '党委常委', name: '邓绍江', addressLink: '', addressText: '' },
          { date: '党委常委', name: '卢义玉', addressLink: '', addressText: '' },
          { date: '党委常委', name: '李剑', addressLink: '', addressText: '' },
          { date: '党委常委', name: '刘贵文', addressLink: '', addressText: '' },
          { date: '党委常委', name: '杨俊', addressLink: '', addressText: '' },
          { date: '党委常委', name: '饶劲松', addressLink: '', addressText: '' },
          { date: '党委常委', name: '李学静', addressLink: '', addressText: '' },
          { date: '党委常委', name: '李成祥', addressLink: '', addressText: '' },
          { date: '校长助理', name: '朱才朝', addressLink: '', addressText: '' },
          { date: '校长助理', name: '李英民', addressLink: '', addressText: '' },
        ]
      }
    }
  };
</script>
