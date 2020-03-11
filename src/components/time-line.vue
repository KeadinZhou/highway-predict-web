<template>
    <div class="time-line">
        <el-slider
                v-model="timeValue"
                :min="0"
                :max="132"
                :show-tooltip="true"
                :format-tooltip="this.$store.state.timeToText"
                class="time-line-line"
                @change="handleTimeChange">
        </el-slider>
        <el-button
                :icon="!pause?'el-icon-video-pause':'el-icon-video-play'"
                :title="pause?'Click to Play':'Click to Pause'"
                @click="pause=!pause"
                style="font-size: 22px"
                type="text"
                size="mini">
        </el-button>
    </div>
</template>

<script>
  export default {
    name: "time-line",
    props: {
      date: String
    },
    data () {
      return {
        timeValue: 0,
        pause: false
      }
    },
    methods: {
      getData () {
        const that = this
        setTimeout( () => {
          that.getData()
        },5000)
        if (that.pause) return
        that.timeValue = (that.timeValue + 1) % 133
        that.handleTimeChange()
      },
      handleTimeChange(){
        this.$store.commit('timeUpdate',this.timeValue)
        this.$emit('timeChange',this.timeValue)
      }
    },
    created () {
      this.getData()
    },
    watch: {
      date: function () {
        this.pause = false
        this.timeValue = 0
      }
    }
  }
</script>

<style scoped>
    .time-line{
        width: calc( 100% - 600px - 80px);
        position: fixed;
        bottom: 50px;
        left: 40px;
        background: rgba(255,255,255,.6);
        border-radius: 18px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        justify-items: center;
    }
    .time-line-line{
        width: 92%;
        margin-left: 2%;
    }
</style>
