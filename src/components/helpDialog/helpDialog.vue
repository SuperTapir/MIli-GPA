<template>
  <div class="helpTeam">
    <i type="info" @click="helpDialogVisible = true" class="el-icon-information"></i>
    <el-dialog title="帮助信息" v-model="helpDialogVisible" size="large" top="5%">
      <p>对于本程序
        <br><strong>课程名称</strong> 为
        <mark>选填项</mark>
        <br>
        <strong>成绩</strong> 和 <strong>学分</strong>
        <mark>必填项</mark>
        <br>
        <img src="../helpDialog/mathML.png" style="width: 100%; height: auto;max-width: 100%; display: block;">
      </p>
      <el-table :data="gridData">
        <el-table-column property="grade" label="成绩" style="width: 50%"></el-table-column>
        <el-table-column property="credit" label="绩点" style="width: 50%"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="helpDialogVisible = false">我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script type="text/ecmascript-6">
export default {
  props: {
  },
  data() {
    return {
      helpDialogVisible: false,
      gridData: [{
        grade: '90 ~ 100',
        credit: 4
      }, {
        grade: '85 ~ 89.9',
        credit: 3.7
      }, {
        grade: '82 ~ 84.9',
        credit: 3.3
      }, {
        grade: '78 ~ 81.9',
        credit: 3
      }, {
        grade: '75 ~ 77.9',
        credit: 2.7
      }, {
        grade: '72 ~ 74.9',
        credit: 2.3
      }, {
        grade: '68 ~ 71.9',
        credit: 2
      }, {
        grade: '66 ~ 67.9',
        credit: 1.7
      }, {
        grade: '64 ~ 65.9',
        credit: 1.5
      }, {
        grade: '60 ~ 63.9',
        credit: 1
      }, {
        grade: '60分以下',
        credit: 0
      }]
    }
  },
  computed: {
    queryResult() {
      return [{
        'title': '查询成功',
        'content': '您的平均学分绩点为' + this.gpa
      }, {
        'title': '查询失败',
        'content': '请检查您的数据有效性'
      }, {
        'title': '查询失败',
        'content': '请不要提交空表'
      }]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.helpTeam
  display inline-block
  margin-right 10px
</style>
