<template>
    <div style="width: calc(50% - 5px)">
        <h2 style="text-align: center">{{data[0]}}</h2>
        <explain-line-chart :chart-data="chartData" :mark-point="markPoint"></explain-line-chart>
    </div>
</template>

<script>
  import ExplainLine from '@/components/charts/explain-line-chart'
  export default {
    name: "explain-line",
    props: {
      data: Array,
      nowTime: String
    },
    components: {
      'explain-line-chart': ExplainLine
    },
    data () {
      return {
        chartData: {
          columns: ['time', 'val'],
          rows: []
        },
        time: this.nowTime.split(' ')[1],
        val: 0,
        markPoint: {
          symbolSize: 20,
          symbol: 'arrow',
          data: [],
          itemStyle: {
            color: 'red'
          }
        }
      }
    },
    methods: {
      whichOne () {
        let s=this.data[0]
        if (s.indexOf('lane')!==-1) return 1;
        if (s.indexOf('speed')!==-1) return 2;
        if (s.indexOf('car')!==-1) return 3;
        if (s.indexOf('enter')!==-1) return 4;
        if (s.indexOf('exit')!==-1) return 5;
      },
      calcTime () {
        let s=this.data[0]
        if (s.indexOf('past')===-1) return
        let dx=Number(s.split(' ')[1]), h=Number(this.time.split(':')[0]), m=Number(this.time.split(':')[1])
        m-=dx
        while (m<0) {
          m+=60
          h-=1
        }
        this.time = (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':00'
      },
      dataInit () {
        let flag = this.whichOne()
        this.chartData.rows = []
        for (let item of this.data[1]) {
          switch (flag) {
            case 1: {
              this.chartData.rows.push({
                time: item.datetime.split(' ')[1],
                val: item.channel
              })
              break;
            }
            case 2: {
              this.chartData.rows.push({
                time: item.datetime.split(' ')[1],
                val: item.speed
              })
              break;
            }
            case 3: {
              this.chartData.rows.push({
                time: item.datetime.split(' ')[1],
                val: item.car
              })
              break;
            }
            case 4: {
              this.chartData.rows.push({
                time: item.datetime.split(' ')[1],
                val: item.enter
              })
              break;
            }
            case 5: {
              this.chartData.rows.push({
                time: item.datetime.split(' ')[1],
                val: item.exit
              })
              break;
            }
          }
          if (this.chartData.rows[this.chartData.rows.length-1].time === this.time) {
            this.val = this.chartData.rows[this.chartData.rows.length-1].val
          }
        }
        this.markPoint.data.push({
          name: 'Attention',
          coord: [this.time, this.val]
        })
      }
    },
    created() {
      this.calcTime()
      this.dataInit()
    }
  }
</script>

<style scoped>

</style>
