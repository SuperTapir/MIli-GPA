<template>
  <div class="queryResultTeam">
    <el-button type="primary" @click="queryDialogVisible = true">提交</el-button>
    <el-dialog v-if="queryResult[statusNo]" :title="queryResult[statusNo].title" v-model="queryDialogVisible" size="large">
      <span>{{queryResult[statusNo].content}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="queryDialogVisible = false">我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    statusNo: {
      type: Number
    },
    gpa: {
      default: -1
    }
  },
  data() {
    return {
      queryDialogVisible: false
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
.queryResultTeam
  display inline-block
  margin-right 10px
</style>
