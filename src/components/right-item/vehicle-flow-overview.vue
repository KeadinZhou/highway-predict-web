<template>
    <div>
        <box-frame title="Vehicle Flow Overview">
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
      timelineTime: Number
    },
    components: {
      'box-frame': BoxFrame,
      'vehicle-flow-overview-chart': VehicleFlowOverviewChart
    },
    data () {
      return {
        chartData: {
          columns: ['points', 'flow'],
          rows: [
            {'points': 1, 'flow': 100},
            {'points': 2, 'flow': 434},
            {'points': 3, 'flow': 455},
            {'points': 4, 'flow': 345},
            {'points': 5, 'flow': 123},
            {'points': 6, 'flow': 78},
            {'points': 7, 'flow': 644},
            {'points': 8, 'flow': 633},
            {'points': 9, 'flow': 788}
          ]
        }
      }
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      getData (timelineTime) {
        const that = this
        for (let item of that.chartData.rows) {
          item.flow = Math.round(Math.random() * 1000)
        }
      }
    },
    created () {
      this.getData(0)
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
