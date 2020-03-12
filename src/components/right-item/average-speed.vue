<template>
    <div>
<!--        <box-frame title="Average Speed">-->
        <box-frame title="平均车流速度">
            <div class="speed-box">
                <b>{{$store.state.averageSpeed}} km/h</b>
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  export default {
    name: "average-speed",
    props: {
      timelineTime: String
    },
    components: {
      'box-frame': BoxFrame
    },
    data () {
      return {
        speed: 0
      }
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      getData (timelineTime) {
        const that = this
        that.speed =  Math.round(Math.random() * 150)
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
    .speed-box{
        text-align: center;
        font-size: 32px;
        color: black;
        line-height: 80px;
    }
</style>
