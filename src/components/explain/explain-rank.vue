<template>
    <div style="width: calc(50% - 5px)">
        <h2 style="text-align: center">Effect Rank</h2>
        <explain-rank-chart :chart-data="realData" :chart-settings="chartSettings"></explain-rank-chart>
    </div>
</template>

<script>
  import ExplainRankChart from '@/components/charts/explain-rank-chart'
  export default {
    name: "explain-rank",
    components: {
      'explain-rank-chart': ExplainRankChart
    },
    props: {
      chartData: Object
    },
    data () {
      return {
        chartSettings: {
          metrics: ['val'],
          dataOrder: {
            label: 'val',
            order: 'desc'
          }
        },
        realData: {
          columns: ['name', 'val'],
          rows: []
        }
      }
    },
    methods: {
      dataInit() {
        this.realData.rows = []
        for (let item in this.chartData){
          this.realData.rows.push({
            name: item,
            val: Math.abs(this.chartData[item])
          })
        }
      }
    },
    created() {
      this.dataInit()
    }
  }
</script>

<style scoped>

</style>
