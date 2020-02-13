<template>
    <div>
        <box-frame title="Point In&Out Flow Trend">
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
        }
      }
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      getData (pointIndex) {
        const that = this
        that.chartData.rows = []
        for (let time=0; time <= 24; time++) {
          that.chartData.rows.push({
            time: time,
            in: Math.round(Math.random() * 500),
            out: Math.round(Math.random() * 400)+400
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
