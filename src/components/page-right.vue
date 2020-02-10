<template>
    <div class="page-right">
        <el-scrollbar class="scrollbar">
            <page-right-box
                    class="center-box"
                    :pointIndex="pointIndex"
                    :pathIndex="pathIndex"
                    :timelineTime="timelineTime">
            </page-right-box>
        </el-scrollbar>
    </div>
</template>

<script>
  import PageRightBox from '@/components/page-right-box'
  export default {
    name: "page-right",
    props: {
      timelineTime: Number,
      pointIndex: Number,
      pathIndex: Number
    },
    components: {
      'page-right-box': PageRightBox
    }
  }
</script>

<style scoped>
    .page-right{
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 600px;
        z-index: 500;
        background: rgba(100,100,100,.7);
        text-align: center;
    }
    .center-box{
        position: relative;
        left: 50%;
        transform: translate(-50%,0);
    }
    .scrollbar{
        height: 100%;
    }
</style>
