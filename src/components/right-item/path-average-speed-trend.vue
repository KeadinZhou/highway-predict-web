<template>
    <div>
<!--        <box-frame title="Sensor Point Speed Trend">-->
        <box-frame title="速度">
            <div>
                <point-vehicle-flow-trend-chart :chart-data="chartDataSpeed"></point-vehicle-flow-trend-chart>
            </div>
        </box-frame>
<!--        <box-frame title="PCU Trend">-->
        <box-frame title="车当量">
            <div>
                <point-vehicle-flow-trend-chart :chart-data="chartDataCar"></point-vehicle-flow-trend-chart>
            </div>
        </box-frame>
<!--        <box-frame title="Number of Lane">-->
        <box-frame title="车道数">
            <div>
                <point-vehicle-flow-trend-chart :chart-data="chartDataChannel"></point-vehicle-flow-trend-chart>
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  import PointVehicleFlowTrendChart from '@/components/charts/point-vehicle-flow-trend-chart'
  export default {
    name: "path-average-speed-trend",
    props: {
      pathIndex: Number
    },
    components: {
      'box-frame': BoxFrame,
      'point-vehicle-flow-trend-chart': PointVehicleFlowTrendChart
    },
    data () {
      return {
        chartDataSpeed: {
          columns: ['time', 'Speed'],
          rows: []
        },
        chartDataChannel: {
          columns: ['time', 'Channel'],
          rows: []
        },
        chartDataCar: {
          columns: ['time', 'Car'],
          rows: []
        }
      }
    },
    methods: {
      getData (pathIndex) {
        const that = this
        that.chartDataSpeed.rows = []
        that.chartDataChannel.rows = []
        that.chartDataCar.rows = []
        that.$http.get(that.$store.state.api + '/point/by_date_and_id?id='+pathIndex+'&date='+that.$store.state.date)
          .then(data => {
            let Data = data.data.data
            for (let item of Data){
              if(item.point_id !== pathIndex) continue
              let time = item.datetime.split(" ")[1].split(":")
              that.chartDataSpeed.rows.push({
                time: time[0]+':'+time[1],
                Speed: (item.speed?item.speed:0),
              })
              that.chartDataCar.rows.push({
                time: time[0]+':'+time[1],
                Car: (item.car?item.car:0)
              })
              that.chartDataChannel.rows.push({
                time: time[0]+':'+time[1],
                Channel: (item.channel?item.channel:0)
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
      this.getData(this.pathIndex)
    },
    watch: {
      pathIndex: function () {
        this.getData(this.pathIndex)
      }
    }
  }
</script>

<style scoped>

</style>
