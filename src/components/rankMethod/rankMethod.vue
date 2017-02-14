<template>
  <div class="caida-method-wrapper">
    <el-row>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="8" class="table-header">等级</el-col>
      <el-col :span="8" class="table-header">学分</el-col>
    </el-row>
    <transition-group name="slide">
      <div class="row-item" v-for="(item, index) in input" :key="item">
        <el-form :model="item" :rules="rules" ref="item">
          <el-row :gutter="10">
            <el-col :span="4" class="table-header">
              科目{{ index + 1 }}
            </el-col>
            <el-col :span="8">
              <el-select v-model="item.rank" placeholder="Rank" class="rank-select">
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="D" value="D"></el-option>
                <el-option label="E" value="E"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="credit">
                <el-input v-model="item.credit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button @click.prevent="removeItem(index)" :disabled="stopRemove" icon="delete"></el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </transition-group>
    <el-row class="controler-wrapper">
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="20">
        <div @click="calculateGPA()" class="query-dialog-controler">
          <query-result-dialog :statusNo="queryStatusNo" :gpa="gpa" ></query-result-dialog>
        </div>
        <el-button @click="addItem()">新增科目</el-button>
        <el-button @click="resetInput()">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>



<script type="text/ecmascript-6">
import queryResultDialog from './queryResult/queryResult'

const STATUS_OK = 0
const STATUS_ERR = 1
const STATUS_EMPTY = 2

let checkCredit = function(rules, value, callback) {
  let credit = parseInt(value, 10)
  setTimeout(function() {
    if (!Number.isInteger(credit) && value !== '') {
      callback(new Error('请输入数字值'))
    } else {
      if (credit > 10 || credit < 0) {
        callback(new Error('必须介于0～10'))
      } else {
        callback()
      }
    }
  }, 800)
}
export default ({
  components: {
    'query-result-dialog': queryResultDialog
  },
  data() {
    return {
      gpa: -1,
      rowNum: 5,
      stopRemove: false,
      input: [{
        rank: '',
        credit: ''
      }, {
        rank: '',
        credit: ''
      }, {
        rank: '',
        credit: ''
      }, {
        rank: '',
        credit: ''
      }, {
        rank: '',
        credit: ''
      }],
      queryStatusNo: -1,
      rules: {
        credit: [{
          validator: checkCredit,
          trigger: 'change,blur'
        }]
      }
    }
  },
  methods: {
    addItem() {
      if (this.stopRemove) {
        this.stopRemove = false
      }
      this.input.push({
        rank: '',
        credit: ''
      })
      this.rowNum++
    },
    removeItem(index) {
      if (this.rowNum <= 2) {
        this.stopRemove = true
      }
      this.input.splice(index, 1)
      this.rowNum--
    },
    resetInput() {
      for (let i = 0; i < this.input.length; i++) {
        this.input[i].rank = ''
        this.input[i].credit = ''
      }
    },
    getGpaFromPoint(rank) {
      let gpa = -1
      switch (rank) {
        case 'A':
          gpa = 4
          break
        case 'B':
          gpa = 3
          break
        case 'C':
          gpa = 2
          break
        case 'D':
          gpa = 1
          break
        case 'E':
          gpa = 0
          break
      }
      return gpa
    },
    calculateGPA() {
      let i = 0
      let flag = 1
      let up = 0
      let down = 0
      let input = this.input
      let getGpaFromPoint = this.getGpaFromPoint
      for (i = 0; i < this.rowNum; i++) {
        if (input[i].rank === '' && input[i].credit === '') {
          continue
        }
        if (parseInt(input[i].credit, 10) >= 0 && parseInt(input[i].credit, 10) <= 10) {
          up += (getGpaFromPoint(input[i].rank) * parseInt(input[i].credit, 10))
          down += parseInt(input[i].credit, 10)
        } else {
          flag = 0
          break
        }
      }
      if (flag === 0) {
        this.queryStatusNo = STATUS_ERR
        console.log(this.queryStatusNo)
      } else if (isNaN(up / down)) {
        this.queryStatusNo = STATUS_EMPTY
        console.log(this.queryStatusNo)
      } else {
        this.queryStatusNo = STATUS_OK
        this.gpa = (up / down).toFixed(2)
        console.log(this.queryStatusNo + 'gpa:' + this.gpa)
      }
    }
  }
})

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin"
.caida-method-wrapper
  .table-header
    text-align center
    font-size 1.2em
    line-height 36px
  .rank-select
    width 100%
  .controler-wrapper
    padding-bottom 300px
    .query-dialog-controler
      display inline-block
      margin-right 10px
  input
    width 100%
.slide-enter-active
  transition all .65s ease
.slide-leave-active
  transition all .65s ease
.slide-enter,
.slide-leave-active
  transform translate3d(500px, 0, 0)
  opacity 0
</style>
