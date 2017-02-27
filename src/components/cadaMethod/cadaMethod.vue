<template>
  <div>
    <el-row>
      <el-col :span="4">&nbsp;</el-col>
      <el-col :span="8" class="table-header">成绩</el-col>
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
              <el-form-item prop="grade">
                <el-input v-model="item.grade"></el-input>
              </el-form-item>
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

let checkGrade = function(rules, value, callback) {
  let grade = parseInt(value, 10)
  setTimeout(function() {
    if (!Number.isInteger(grade) && value !== '') {
      callback(new Error('请输入数字值'))
    } else {
      if (grade > 100 || grade < 0) {
        callback(new Error('必须介于0～100'))
      } else {
        callback()
      }
    }
  }, 800)
}
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
        grade: '',
        credit: ''
      }, {
        grade: '',
        credit: ''
      }, {
        grade: '',
        credit: ''
      }, {
        grade: '',
        credit: ''
      }, {
        grade: '',
        credit: ''
      }],
      queryStatusNo: -1,
      rules: {
        grade: [{
          validator: checkGrade,
          trigger: 'change,blur'
        }],
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
        grade: '',
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
        this.input[i].grade = ''
        this.input[i].credit = ''
      }
    },
    getGpaFromPoint(point) {
      let gpa = 0
      switch (true) {
        case (point <= 100) && (point >= 90):
          gpa = 4
          break
        case (point < 90) && (point >= 85):
          gpa = 3.7
          break
        case (point < 85) && (point >= 82):
          gpa = 3.3
          break
        case (point < 82) && (point >= 78):
          gpa = 3
          break
        case (point < 78) && (point >= 75):
          gpa = 2.7
          break
        case (point < 75) && (point >= 72):
          gpa = 2.3
          break
        case (point < 72) && (point >= 68):
          gpa = 2
          break
        case (point < 68) && (point >= 66):
          gpa = 1.7
          break
        case (point < 66) && (point >= 64):
          gpa = 1.5
          break
        case (point < 64) && (point >= 60):
          gpa = 1
          break
        case (point < 60) && (point >= 0):
          gpa = 0
          break
        default:
          gpa = -1
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
        if (input[i].grade === '' && input[i].credit === '') {
          continue
        }
        if ((parseInt(input[i].grade, 10) >= 0 && parseInt(input[i].grade, 10) <= 100) && (parseInt(input[i].credit, 10) >= 0 && parseInt(input[i].credit, 10) <= 10)) {
          up += (getGpaFromPoint(parseInt(input[i].grade, 10)) * parseInt(input[i].credit, 10))
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
.table-header
  text-align center
  font-size 1.2em
  line-height 36px
.controler-wrapper
  padding-bottom 300px
  .query-dialog-controler
    display inline-block
    margin-right 10px  
.slide-enter-active
  transition all .65s ease
.slide-leave-active
  transition all .65s ease
.slide-enter,
.slide-leave-active
  transform translate3d(500px, 0, 0)
  opacity 0
</style>
