<template>
    <div>
<!--        <box-frame title="Enter & Exit Traffic">-->
        <box-frame title="进出流量">
            <div>
                <point-in-out-trend-chart :chart-data="chartData"></point-in-out-trend-chart>
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  import PointInOutTrend from '@/components/charts/point-in-out-trend-chart'
  export default {
    name: "point-in-out-trend",
    props: {
      pointIndex: Number
    },
    components: {
      'box-frame': BoxFrame,
      'point-in-out-trend-chart': PointInOutTrend
    },
    data () {
      return {
        chartData: {
          columns: ['time', 'in', 'out'],
          rows: []
        },
        updated: false
      }
    },
    methods: {
      getData (pointIndex) {
        const that = this
        that.chartData.rows = []
        that.$http.get(that.$store.state.api + '/exit/by_date_and_id?id='+pointIndex+'&date='+that.$store.state.date)
          .then(data => {
            let Data = data.data.data
            for (let item of Data){
              if(item.exit_id !== pointIndex) continue
              let time = item.datetime.split(" ")[1].split(":")
              that.chartData.rows.push({
                time: time[0]+':'+time[1],
                in: (item.enter?item.enter:0),
                out: (item.exit?item.exit:0)
              })
            }
            that.updated = true
          })
          .catch((error)=>{
            that.$message.error('error')
            console.log(error)
          })
      }
    },
    created () {
      this.getData(this.pointIndex)
    },
    watch: {
      pointIndex: function () {
        this.getData(this.pointIndex)
      }
    }
  }
</script>

<style scoped>

</style>
