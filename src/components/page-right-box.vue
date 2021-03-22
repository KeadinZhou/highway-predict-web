<template>
    <div class="page-right-box">
<!--        <h1>高速交通异常状态分析系统</h1>-->
        <h1>高速公路智慧决策系统</h1>
        <h3 style="margin-bottom: 50px">Intelligent Prognostics and Decision Support System for Expressway</h3>
<!--        <div id="title-last">欢迎你，<el-button type="text">Admin</el-button></div>-->
        <el-collapse-transition>
            <div v-if="pointIndex!=null">
<!--                <el-divider>Toll Station <b>{{pointIndex}}</b> Detail</el-divider>-->
                <el-divider>收费站 <b>{{pointIndex}}</b> 详情</el-divider>
<!--                <point-vehicle-flow-trend :pointIndex="pointIndex"></point-vehicle-flow-trend>-->
                    <point-in-out-trend :pointIndex="pointIndex"></point-in-out-trend>
                <change-point-flow v-if="false"></change-point-flow>
            </div>
        </el-collapse-transition>

        <el-collapse-transition>
            <div v-if="pathIndex!=null">
<!--                <el-divider>Sensor Point <b>{{pathIndex}}</b> Detail</el-divider>-->
                <el-divider>卡口 <b>{{pathIndex}}</b> 详情</el-divider>
                <path-average-speed-trend :pathIndex="pathIndex"></path-average-speed-trend>
                <change-path-lanes v-if="false"></change-path-lanes>
            </div>
        </el-collapse-transition>

<!--        <el-divider>Entire Road</el-divider>-->
        <el-divider>路段概况</el-divider>
        <now-time></now-time>
        <weather :timelineTime="timelineTime" v-if="false"></weather>
        <average-speed :timelineTime="timelineTime"></average-speed>
        <vehicle-flow-overview :timelineTime="timelineTime"></vehicle-flow-overview>

        <import-data v-if="false"></import-data>
    </div>
</template>

<script>
  // import BoxFrame from '@/components/frame/box-frame'
  import ImportData from '@/components/right-item/import-data'
  import Weather from '@/components/right-item/weather'
  import AverageSpeed from '@/components/right-item/average-speed'
  import VehicleFlowOverview from '@/components/right-item/vehicle-flow-overview'
  import PointInOutTrend from '@/components/right-item/point-in-out-trend'
  import ChangePointFlow from '@/components/right-item/change-point-flow'
  import PathAverageSpeedTrend from '@/components/right-item/path-average-speed-trend'
  import ChangePathLanes from '@/components/right-item/change-path-lanes'
  import NowTime from '@/components/right-item/now-time'
  export default {
    name: "page-right-box",
    props: {
      timelineTime: String,
      pointIndex: Number,
      pathIndex: Number
    },
    components: {
      // 'box-frame': BoxFrame,
      'weather': Weather,
      'average-speed': AverageSpeed,
      'vehicle-flow-overview': VehicleFlowOverview,
      'import-data': ImportData,
      'point-in-out-trend': PointInOutTrend,
      'change-point-flow': ChangePointFlow,
      'path-average-speed-trend': PathAverageSpeedTrend,
      'change-path-lanes': ChangePathLanes,
      'now-time': NowTime
    }
  }
</script>

<style scoped>
    .page-right-box{
        width: 500px;
        /*height: 1000px;*/
        margin: 30px 0;
        color: black;
    }
    #title-last{
        margin-top: 15px;
        margin-bottom: 20px;
        font-size: 14px;
    }
</style>
