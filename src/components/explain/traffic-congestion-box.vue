<template>
    <div>
        <el-dialog
                :title="'路况异常分析 ('+this.$store.state.date+')'"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                append-to-body
                width="1800px">
            <div class="dialog-box">
                <el-table :data="tableData" class="table-box" v-loading="listLoading" border>
<!--                    <el-table-column label="Sensor" align="center" width="100">-->
                    <el-table-column label="卡口编号" align="center" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.point_id }}
                        </template>
                    </el-table-column>
<!--                    <el-table-column label="Time" align="center">-->
                    <el-table-column label="时间" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.datetime }}
                        </template>
                    </el-table-column>
<!--                    <el-table-column label="Speed" align="center" width="150">-->
                    <el-table-column label="车流速度" align="center" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.speed }}
                        </template>
                    </el-table-column>
                    <el-table-column label="历史车流速度" align="center" width="150">
<!--                    <el-table-column label="History" align="center" width="150">-->
                        <template slot-scope="scope">
                            {{ scope.row.median_speed }}
                        </template>
                    </el-table-column>
                    <el-table-column label="原因分析" align="center" width="100">
<!--                    <el-table-column label="Explain" align="center" width="100">-->
                        <template slot-scope="scope">
                            <span style="cursor:pointer;" @click="explain(scope.row,scope.$index)"><i :class="nowIndex===scope.$index?'el-icon-right':'el-icon-view'"></i></span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="explain-box" v-loading="explainLoading" v-if="tableData[0]">
                    <div style="text-align: center" v-if="explainData">
<!--                        Sensor: <b>{{tableData[nowIndex].point_id}}</b><el-divider direction="vertical"></el-divider>-->
<!--                        Time: <b>{{tableData[nowIndex].datetime}}</b><el-divider direction="vertical"></el-divider>-->
<!--                        Speed: <b>{{tableData[nowIndex].speed}}</b><el-divider direction="vertical"></el-divider>-->
<!--                        History: <b>{{tableData[nowIndex].median_speed}}</b><el-divider direction="vertical"></el-divider>-->
<!--                        Predict: <b>{{explainData.predict_y.toFixed(4)}}</b>-->
                        卡口编号: <b>{{tableData[nowIndex].point_id}}</b><el-divider direction="vertical"></el-divider>
                        时间: <b>{{tableData[nowIndex].datetime}}</b><el-divider direction="vertical"></el-divider>
                        车流速度: <b>{{tableData[nowIndex].speed}}</b><el-divider direction="vertical"></el-divider>
                        历史车流速度: <b>{{tableData[nowIndex].median_speed}}</b><el-divider direction="vertical"></el-divider>
                        预期速度: <b>{{explainData.predict_y.toFixed(4)}}</b>
                    </div>
                    <br>
                    <iframe v-if="explainUrl" :src="explainUrl" frameborder="0" width="100%" height="166px"></iframe>
                    <div v-if="explainData" class="charts-box">
                        <explain-rank :chart-data="explainData.effect"></explain-rank>
                        <explain-line :data="explainData.data[0]" :now-time="tableData[nowIndex].datetime"></explain-line>
                        <explain-line :data="explainData.data[1]" :now-time="tableData[nowIndex].datetime"></explain-line>
                        <explain-line :data="explainData.data[2]" :now-time="tableData[nowIndex].datetime"></explain-line>
                    </div>
                </div>
            </div>

        </el-dialog>

        <div class="traffic-congestion-box">
<!--            <el-button type="info" round @click="dialogVisible=true">Traffic Congestion</el-button>-->
            <el-button type="info" round @click="dialogVisible=true">路况异常分析</el-button>
        </div>
    </div>
</template>

<script>
  import ExplainRank from '@/components/explain/explain-rank'
  import ExplainLine from '@/components/explain/explain-line'
  export default {
    name: "traffic-congestion-box",
    components: {
      'explain-rank': ExplainRank,
      'explain-line': ExplainLine
    },
    data () {
      return {
        dialogVisible: false,
        listLoading: false,
        tableData: [],
        explainImg: '',
        explainHtml: '',
        explainUrl: '',
        explainData: null,
        explainLoading: false,
        nowIndex: 0
      }
    },
    methods: {
      explain(datas, index) {
        const that = this
        that.explainLoading = true
        that.explainImg = ''
        that.explainHtml = ''
        that.nowIndex = index
        that.explainData = null
        that.$http.get(that.$store.state.api + '/point/explain_by_datetime_and_id?datetime='+datas.datetime+'&id='+datas.point_id)
          .then(data => {
            let Data = data.data.data
            that.explainData = Data
            that.explainUrl = that.$store.state.api+'/point/explain_html_by_datetime_and_id?datetime='+datas.datetime+'&id='+datas.point_id
            that.explainLoading = false
            console.log(Data)
          })
          .catch((error)=>{
            that.$message.error('error')
            console.log(error)
          })
      },
      handleClose (next){
        this.explainImg = ''
        this.explainHtml = ''
        this.explainUrl = ''
        this.nowIndex = 0
        next()
      },
      getData(){
        const that = this
        that.listLoading = true
        that.explainImg = ''
        that.$http.get(that.$store.state.api + '/point/abnormal_by_date?date='+that.$store.state.date)
          .then(data => {
            let Data = data.data.data
            that.tableData = Data
            that.listLoading = false
            if (that.tableData[0]) {
              that.explain(that.tableData[0],0)
            }
            console.log(Data)
          })
          .catch((error)=>{
            that.$message.error('error')
            console.log(error)
          })
      }
    },
    watch: {
      dialogVisible: function (now) {
        console.log(now)
        if (now) {
          this.getData()
        }
      }
    }
  }
</script>

<style scoped>
    .traffic-congestion-box{
        position: fixed;
        right: 645px;
        bottom: 150px;
    }
    .dialog-box{
        width: 100%;
        display: flex;
    }
    .table-box{
        width: 700px;
    }
    .explain-box{
        width: 1000px;
        margin-right: 50px;
    }
    .charts-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
