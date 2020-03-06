<template>
    <div class="main-map">
        <el-amap vid="amap"
                 v-if="pathDataInited"
                 :zoom="zoom"
                 :center="center"
                 :scrollWheel="false"
                 :touchZoom="false"
                 :dragEnable="false"
                 :zoomEnable="false"
                 :doubleClickZoom="false"
                 :keyboardEnable="false"
                 lang="en">
            <el-amap-polyline
                v-for="(path,index) in $store.state.paths"
                :path="path"
                :strokeColor="getSpeedColor($store.state.speeds.get($store.state.points[index>=$store.state.points.length?$store.state.points.length-1:index].id))"
                :strokeWeight="10"
                lineJoin="round"
                :zIndex="50"
                cursor="pointer"
                :key="'path'+index">
            </el-amap-polyline>

            <el-amap-circle-marker
                v-for="(point,index) in $store.state.exits"
                :center="[point.lon,point.lat]"
                :radius="10"
                :zIndex="60"
                :strokeWeight="0"
                strokeColor="#000"
                fillColor="#F00"
                cursor="pointer"
                :fillOpacity="1"
                :events="pointEvents"
                :extData="{index:point.id}"
                :key="'point'+index">
            </el-amap-circle-marker>

            <el-amap-circle-marker
                v-for="(watch_point,index) in $store.state.points"
                :center="[watch_point.lon,watch_point.lat]"
                :radius="7"
                :zIndex="60"
                :strokeWeight="0"
                fillColor="#FFF"
                cursor="pointer"
                :fillOpacity="1"
                :events="pathEvents"
                :extData="{index:watch_point.id}"
                :key="'watch_point'+index">
            </el-amap-circle-marker>
            <el-amap-text
                v-for="(center, index) in this.$store.state.center"
                :text="''+$store.state.channels.get($store.state.points[index>=$store.state.points.length?$store.state.points.length-1:index].id)"
                :position="center"
                :offset="[-20,-20]"
                :extData="{index:index}"
                :key="'road'+index">
            </el-amap-text>

            <el-amap-text
                v-for="(center, index) in this.$store.state.center"
                :text="'Speed:'+$store.state.speeds.get($store.state.points[index>=$store.state.points.length?$store.state.points.length-1:index].id)"
                :position="center"
                :offset="[50,30]"
                :title="'The average speed of road '+index"
                :key="'speed'+index">
            </el-amap-text>
        </el-amap>
    </div>
</template>

<script>
  export default {
    name: "main-map",
    props: {
      timelineTime: String
    },
    data () {
      return {
        pathDataInited: false,
        updated: false,
        roadsUpdated: false,
        speedsUpdated: false,
        zoom: 11,
        center: [120.71402834961201+0.18, 30.642591064591393],
        paths: [],
        roads: [],
        speeds: [],
        points: [],
        positions: [],
        pointEvents: {
          click: (e) => {
            let pointIndex = e.target.F.extData.index
            this.$emit('pointClick',pointIndex);
          }
        },
        pathEvents: {
          click: (e) => {
            let pathIndex = e.target.F.extData.index
            this.$emit('pathClick',pathIndex);
          }
        },
        watch_points: []
      }
    },
    methods: {
      getSpeedColor (speed) {
        if (speed === null) return '#909399'
        if (speed >= 80) return '#67C23A'
        if (speed >= 50) return '#E6A23C'
        return '#F56C6C'
      },
      roadInit () {
        const that = this
        that.roadsUpdated = false
        that.roads = []
        for (let index in that.paths) {
          that.roads.push({
            index: index,
            cnt: Math.round(Math.random() * 7) + 1
          })
        }
        that.roadsUpdated = true
      },
      // eslint-disable-next-line no-unused-vars
      updateRoadData (time) {
        const that = this
        that.speedsUpdated = false
        that.speeds = []
        for (let index in that.paths) {
          that.speeds.push({
            index: index,
            speed: Math.round(Math.random() * 150)
          })
        }
        that.speedsUpdated = true
        that.updated = true
      },
      checkPathInit () {
        let that = this
        if(!that.$store.state.initState[3]){
          setTimeout(() => {
            that.checkPathInit()
          }, 500)
          return
        }
        that.pathDataInited = true
      }
    },
    created () {
      // this.getData()
      this.checkPathInit()
    },
    watch: {
      timelineTime: function () {
        // this.updateRoadData(this.timelineTime)
      }
    }
  }
</script>

<style scoped>
    .main-map{
        width: 100%;
        height: 100%;
    }
</style>

