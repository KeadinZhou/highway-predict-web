<template>
    <div class="time-line">
        <el-slider v-model="timeValue" :show-tooltip="false" class="time-line-line" @change="handleTimeChange"></el-slider>
        <el-button
                :icon="!pause?'el-icon-video-pause':'el-icon-video-play'"
                :title="pause?'Click to Continue':'Click to Pause'"
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
        },3000)
        if (that.pause) return
        that.timeValue = (that.timeValue + 1) % 101
        that.handleTimeChange()
      },
      handleTimeChange(){
        this.$emit('timeChange',this.timeValue);
      }
    },
    created () {
      this.getData()
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
