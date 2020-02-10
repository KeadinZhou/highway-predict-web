<template>
    <div id="app" ref="pageBox">
        <main-map
                :timelineTime="timelineTime"
                @pathClick="handlePathClick"
                @pointClick="handlePointClick">
        </main-map>
        <page-right
                :timelineTime="timelineTime"
                :pathIndex="pathIndex"
                :pointIndex="pointIndex">
        </page-right>
        <time-line @timeChange="handleTimeChange"></time-line>
    </div>
</template>

<script>
  import MainMap from '@/components/main-map'
  import PageRight from '@/components/page-right'
  import Timeline from '@/components/time-line'
  export default {
    name: 'App',
    components: {
      'main-map': MainMap,
      'page-right': PageRight,
      'time-line': Timeline
    },
    data () {
      return {
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
        timelineTime: 0,
        pointIndex: null,
        pathIndex: null
      }
    },
    methods: {
      fixBox () {
        this.clientHeight = window.innerHeight
        this.clientWidth = window.innerWidth
        this.$refs.pageBox.style.height = this.clientHeight + 'px'
        this.$refs.pageBox.style.widows = this.clientWidth + 'px'
      },
      handleTimeChange (value) {
        this.timelineTime = value
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
</style>
