<template>
    <div style="width: calc(50% - 5px)">
<!--        <h2 style="text-align: center">Effect Rank</h2>-->
        <h2 style="text-align: center">影响因素排行</h2>
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
      getNum (s) {
        return Number(s.split(' ')[1])
      },
      translate (s) {
        if (s === 'last sensor distance') return '到前一卡口距离'
        if (s === 'last toll distance') return '到前一收费站距离'
        if (s === 'next toll distance') return '到后一收费站距离'
        if (s === 'number of lane') return '车道数'
        let num = this.getNum(s), res = ''
        if (s.indexOf('car')!==-1) res+='车流量'
        else if (s.indexOf('speed')!==-1) res+='速度'
        else if (s.indexOf('enter')!==-1) res+='进流量'
        else if (s.indexOf('exit')!==-1) res+='出流量'
        res+='(-'+num+'分钟,'
        if (s.indexOf('last')!==-1) res+='前1'
        else if (s.indexOf('next')!==-1) res+='后1'
        else res+='当前'
        if (s.indexOf('toll')!==-1) res+='收费站'
        else res+='点'
        res+=')'
        return res
      },
      dataInit() {
        this.realData.rows = []
        for (let item in this.chartData){
          this.realData.rows.push({
            name: this.translate(item),
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
