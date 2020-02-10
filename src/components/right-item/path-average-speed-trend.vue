<template>
    <div>
        <box-frame title="Path Average Speed Trend">
            <div>
                <point-vehicle-flow-trend-chart :chart-data="chartData"></point-vehicle-flow-trend-chart>
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
        chartData: {
          columns: ['time', 'flow'],
          rows: []
        }
      }
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      getData (pathIndex) {
        const that = this
        that.chartData.rows = []
        for (let time=0; time <= 100; time++) {
          that.chartData.rows.push({
            time: time,
            flow: Math.round(Math.random() * 150)
          })
        }
        console.log(that.chartData)
      }
    },
    created () {
      this.getData(0)
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
