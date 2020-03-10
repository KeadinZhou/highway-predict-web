<template>
    <div>

        <el-dialog
                :title="'Traffic Congestion ('+this.$store.state.date+')'"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                append-to-body
                width="1650px">
            <el-table :data="tableData" class="table-box">
                <el-table-column label="ID" align="center" width="90">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column label="Time" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.time }}
                    </template>
                </el-table-column>
                <el-table-column label="Speed" align="center" width="150">
                    <template slot-scope="scope">
                        {{ scope.row.speed }}
                    </template>
                </el-table-column>
                <el-table-column label="History" align="center" width="150">
                    <template slot-scope="scope">
                        {{ scope.row.history }}
                    </template>
                </el-table-column>
                <el-table-column label="Explain" align="center" width="100">
                    <template slot-scope="scope">
                        <span style="cursor:pointer;" @click="explain(scope.row)"><i class="el-icon-view"></i></span>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div v-if="explainImg">-->
<!--                <img class="explain-img" :src="'data:image/png;base64,'+explainImg" alt="">-->
<!--            </div>-->
            <el-image
                    v-if="explainImg"
                    style="width: 100%; height: 300px"
                    :src="'data:image/png;base64,'+explainImg"
                    fit="none">
            </el-image>
        </el-dialog>

        <div class="traffic-congestion-box">
            <el-button type="info" round @click="dialogVisible=true">Traffic Congestion</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "traffic-congestion-box",
    data () {
      return {
        dialogVisible: false,
        tableData: [{
          id: 148248,
          time: '2019-09-23 07:00:00',
          speed: 80,
          history: 100
        }, {
          id: 79100,
          time: '2019-09-23 08:00:00',
          speed: 80,
          history: 100
        }],
        explainImg: ''
      }
    },
    methods: {
      explain(data) {
        const that = this
        that.explainImg = ''
        that.$http.get(that.$store.state.api + '/point/explain_by_datetime_and_id?datetime='+data.time+'&id='+data.id)
          .then(data => {
            let Data = data.data.data
            that.explainImg = Data
            console.log(Data)
          })
          .catch((error)=>{
            that.$message.error('error')
            console.log(error)
          })
      },
      handleClose (next){
        this.explainImg = ''
        next()
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
    .table-box{
        position: relative;
        left: calc(100% / 2 - 600px);
        width: 1200px;
        margin-bottom: 50px;
    }
</style>
