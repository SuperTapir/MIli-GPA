<template>
  <div class="queryResultTeam">
    <el-button type="primary" @click="open()">提交</el-button>
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
  methods: {
    open() {
      let type
      let duration
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.statusNo === 0) {
            type = 'success'
            duration = 0
          } else {
            type = 'error'
            duration = 4500
          }
          this.$notify({
            title: this.queryResult[this.statusNo].title,
            type: type,
            message: this.queryResult[this.statusNo].content,
            duration: duration
          })
        }, 100)
      })
    }
  },
  computed: {
    queryResult() {
      return [{
        'title': '查询成功',
        'content': `您的平均学分绩点为 ${this.gpa}`
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
</style>
