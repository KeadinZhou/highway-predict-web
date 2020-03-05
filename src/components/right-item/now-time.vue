<template>
    <div>
        <box-frame title="Current Time">
            <div class="now-time">
                {{$store.state.date + ' ' + $store.state.timeToText($store.state.time)}}
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  export default {
    name: "now-time",
    components: {
      'box-frame': BoxFrame
    }
  }
</script>

<style scoped>
    .now-time{
        text-align: center;
        font-size: 28px;
        color: black;
        line-height: 80px;
    }
</style>
