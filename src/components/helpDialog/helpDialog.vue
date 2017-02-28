<template>
  <div class="helpTeam">
    <i @click="helpDialogVisible = true" class="el-icon-information"></i>
    <el-dialog title="采用算法" v-model="helpDialogVisible" size="large" top="5%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="标准四分制" name="first">
          <p>
            <img src="../helpDialog/standMathML.png" height="93" width="290" class="img-responsive">
          </p>
          <el-table :data="gridData.standMethod">
            <el-table-column property="grade" label="成绩" style="width: 50%"></el-table-column>
            <el-table-column property="credit" label="绩点" style="width: 50%"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="财大四分制" name="second">
          <p>
            <img src="../helpDialog/caidaMathML.png" height="44" width="333" class="img-responsive">
          </p>
          <el-table :data="gridData.caidaMethod">
            <el-table-column property="grade" label="成绩" style="width: 50%"></el-table-column>
            <el-table-column property="credit" label="绩点" style="width: 50%"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="等级制" name="third">
          <img src="../helpDialog/rankMathML.png" height="73" width="201" class="img-responsive">
          <el-table :data="gridData.rankMethod">
            <el-table-column property="rank" label="等级" style="width: 50%"></el-table-column>
            <el-table-column property="rankPoint" label="成绩点数" style="width: 50%"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="helpDialogVisible = false">我知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: 'first',
      helpDialogVisible: false,
      gridData: {
        standMethod: [{
          grade: '90 ~ 100',
          credit: 4
        }, {
          grade: '80 ~ 89.9',
          credit: 3
        }, {
          grade: '70 ~ 79.9',
          credit: 2
        }, {
          grade: '60 ~ 69.9',
          credit: 1
        }, {
          grade: '60分以下',
          credit: 0
        }],
        caidaMethod: [{
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
        }],
        rankMethod: [{
          rank: 'A',
          rankPoint: 4
        }, {
          rank: 'B',
          rankPoint: 3
        }, {
          rank: 'C',
          rankPoint: 2
        }, {
          rank: 'D',
          rankPoint: 1
        }, {
          rank: 'E',
          rankPoint: 0
        }]
      }
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.helpTeam
  display inline-block
  color #8492a6
</style>
