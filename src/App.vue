<template>
    <div id="app" ref="pageBox">
        <main-map
                :timelineTime="timeText"
                @pathClick="handlePathClick"
                @pointClick="handlePointClick">
        </main-map>
        <page-right
                :data="date"
                :timelineTime="timeText"
                :pathIndex="pathIndex"
                :pointIndex="pointIndex">
        </page-right>
        <time-line @timeChange="handleTimeChange" :date="date"></time-line>
        <date-box @dateUpdated="handleDateChange"></date-box>
        <traffic-congestion-box></traffic-congestion-box>
    </div>
</template>

<script>
  import MainMap from '@/components/main-map'
  import PageRight from '@/components/page-right'
  import Timeline from '@/components/time-line'
  import DateBox from '@/components/date-box'
  import TrafficCongestionBox from '@/components/explain/traffic-congestion-box'
  export default {
    name: 'App',
    components: {
      'main-map': MainMap,
      'page-right': PageRight,
      'time-line': Timeline,
      'date-box': DateBox,
      'traffic-congestion-box': TrafficCongestionBox
    },
    data () {
      return {
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
        timeText: this.$store.state.date+' '+this.$store.state.timeToText(0)+':00',
        timelineTime: 0,
        pointIndex: null,
        pathIndex: null,
        date: this.$store.state.date
      }
    },
    methods: {
      fixBox () {
        this.clientHeight = window.innerHeight
        this.clientWidth = window.innerWidth
        this.$refs.pageBox.style.height = this.clientHeight + 'px'
        this.$refs.pageBox.style.widows = this.clientWidth + 'px'
      },
      handleDateChange (value) {
        this.pointIndex = null
        this.pathIndex = null
        this.timelineTime = 0
        this.timeText= this.$store.state.date+' '+this.$store.state.timeToText(this.timelineTime)+':00'
        this.date = value
      },
      handleTimeChange (value) {
        this.timelineTime = value
        this.timeText= this.$store.state.date+' '+this.$store.state.timeToText(this.timelineTime)+':00'
      },
      handlePointClick (index) {
        this.pointIndex = index
        this.pathIndex = null
        console.log('point '+index)
      },
      handlePathClick (index) {
        this.pathIndex = index
        this.pointIndex = null
        console.log('path '+index)
      }
    },
    mounted () {
      this.fixBox()
      const that = this
      window.onresize = () => {
        return (() => {
          that.fixBox()
        })()
      }
    }
  }
</script>
<style>
    *{
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        list-style-type: none;
    }
    #app{
        font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        overflow: hidden;
    }
    .el-scrollbar__wrap {
        overflow: auto;
    }
    .el-select-dropdown__wrap {
        overflow: scroll;
    }
</style>
