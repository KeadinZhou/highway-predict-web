<template>
    <div class="page-right-box">
        <h2>G60 Highway Demo</h2>
        <el-collapse-transition>
            <div v-if="pointIndex!=null">
                <el-divider>Point {{pointIndex}} Detail</el-divider>
                <point-vehicle-flow-trend :pointIndex="pointIndex"></point-vehicle-flow-trend>
                <change-point-flow></change-point-flow>
            </div>
        </el-collapse-transition>

        <el-collapse-transition>
            <div v-if="pathIndex!=null">
                <el-divider>Path {{pointIndex}} Detail</el-divider>
                <path-average-speed-trend :pathIndex="pathIndex"></path-average-speed-trend>
                <change-path-lanes></change-path-lanes>
            </div>
        </el-collapse-transition>

        <el-divider>Entire Road</el-divider>
        <weather :timelineTime="timelineTime"></weather>
        <average-speed :timelineTime="timelineTime"></average-speed>
        <vehicle-flow-overview :timelineTime="timelineTime"></vehicle-flow-overview>
        <import-data></import-data>
    </div>
</template>

<script>
  // import BoxFrame from '@/components/frame/box-frame'
  import ImportData from '@/components/right-item/import-data'
  import Weather from '@/components/right-item/weather'
  import AverageSpeed from '@/components/right-item/average-speed'
  import VehicleFlowOverview from '@/components/right-item/vehicle-flow-overview'
  import PointVehicleFlowTrend from '@/components/right-item/point-vehicle-flow-trend'
  import ChangePointFlow from '@/components/right-item/change-point-flow'
  import PathAverageSpeedTrend from '@/components/right-item/path-average-speed-trend'
  import ChangePathLanes from '@/components/right-item/change-path-lanes'
  export default {
    name: "page-right-box",
    props: {
      timelineTime: Number,
      pointIndex: Number,
      pathIndex: Number
    },
    components: {
      // 'box-frame': BoxFrame,
      'weather': Weather,
      'average-speed': AverageSpeed,
      'vehicle-flow-overview': VehicleFlowOverview,
      'import-data': ImportData,
      'point-vehicle-flow-trend': PointVehicleFlowTrend,
      'change-point-flow': ChangePointFlow,
      'path-average-speed-trend': PathAverageSpeedTrend,
      'change-path-lanes': ChangePathLanes
    }
  }
</script>

<style scoped>
    .page-right-box{
        width: 500px;
        /*height: 1000px;*/
        margin: 30px 0;
        color: white;
    }
    h2{
        margin-bottom: 50px;
    }
</style>
