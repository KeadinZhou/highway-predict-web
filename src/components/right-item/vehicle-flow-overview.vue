<template>
    <div>
<!--        <box-frame title="Vehicle Flow Trend">-->
        <box-frame title="实时路段交通量">
            <div>
                <vehicle-flow-overview-chart :chartData="chartData"></vehicle-flow-overview-chart>
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  import VehicleFlowOverviewChart from '@/components/charts/vehicle-flow-overview-chart'
  export default {
    name: "vehicle-flow-overview",
    props: {
      timelineTime: String
    },
    components: {
      'box-frame': BoxFrame,
      'vehicle-flow-overview-chart': VehicleFlowOverviewChart
    },
    data () {
      return {
        chartData: {
          columns: ['id', 'Car'],
          rows: []
        }
      }
    },
    methods: {
      getData (timelineTime) {
        const that = this
        that.chartData.rows = []
        that.$http.get(that.$store.state.api + '/point/by_datetime?datetime='+timelineTime)
          .then(data => {
            let Data = data.data.data
            that.$store.commit('overviewUpdate', Data)
            for (let item of Data){
              that.chartData.rows.push({
                id: item.point_id,
                // Speed: (item.speed?item.speed:0),
                Car: (item.car?item.car:0)
              })
            }
            that.updated = true
            console.log(that.chartData)
          })
          .catch((error)=>{
            that.$message.error('error')
            console.log(error)
          })
      }
    },
    created () {
      // this.getData(this.timelineTime)
    },
    watch: {
      timelineTime: function () {
        this.getData(this.timelineTime)
      }
    }
  }
</script>

<style scoped>

</style>
