<template>
    <div class="main">
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
    name: 'Main',
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
    }
  }
</script>
<style>
    .main{
        width: 100%;
        height: 100%;
    }
</style>
