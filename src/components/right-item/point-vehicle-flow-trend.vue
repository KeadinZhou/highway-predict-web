<template>
    <div>
        <box-frame title="Point Vehicle Flow Trend">
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
    name: "point-vehicle-flow-trend",
    props: {
      pointIndex: Number
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
      getData (pointIndex) {
        const that = this
        that.chartData.rows = []
        for (let time=0; time <= 100; time++) {
          that.chartData.rows.push({
            time: time,
            flow: Math.round(Math.random() * 1000)
          })
        }
        console.log(that.chartData)
      }
    },
    created () {
      this.getData(0)
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
