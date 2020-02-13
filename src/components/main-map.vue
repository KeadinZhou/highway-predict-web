<template>
    <div class="main-map">
        <el-amap vid="amap"
                 v-if="updated"
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
                v-for="(path,index) in paths"
                :path="path.data"
                :strokeColor="getSpeedColor(index)"
                :strokeWeight="10"
                lineJoin="round"
                :zIndex="50"
                cursor="pointer"
                :events="pathEvents"
                :extData="{index:index}"
                :key="'path'+index">
            </el-amap-polyline>
            <el-amap-circle-marker
                v-for="(point,index) in points"
                :center="[point.lon,point.lat]"
                :radius="12"
                :zIndex="60"
                :strokeWeight="0"
                fillColor="#000"
                cursor="pointer"
                :events="pointEvents"
                :extData="{index:index}"
                :key="'point'+index">
            </el-amap-circle-marker>

            <el-amap-circle-marker
                v-for="(watch_point,index) in watch_points"
                :center="[watch_point.lon,watch_point.lat]"
                :radius="5"
                :zIndex="60"
                :strokeWeight="0"
                fillColor="#FFF"
                cursor="pointer"
                :events="pathEvents"
                :extData="{index:index}"
                :key="'watch_point'+index">
            </el-amap-circle-marker>

            <el-amap-text
                v-for="(watch_point, index) in watch_points"
                :text="''+Math.round(Math.random() * 8)"
                :position="[watch_point.lon, watch_point.lat]"
                :offset="[-40,-30]"
                cursor="pointer"
                :title="'The lanes number of road '+index+ '\nClick to change it'"
                :extData="{index:index}"
                :key="'road'+index">
            </el-amap-text>

            <el-amap-text
                    v-for="(speed, index) in speeds"
                    :text="'Speed:'+speed.speed"
                    :position="positions[index]"
                    :offset="[40,40]"
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
      timelineTime: Number
    },
    data () {
      return {
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
      getSpeedColor (index) {
        let speed = this.speeds[index].speed
        if (speed >= 80) return '#67C23A'
        if (speed >= 50) return '#E6A23C'
        return '#F56C6C'
      },
      positionsInit () {
        const that = this
        that.updated = false
        for (let index in that.paths) {
          that.positions.push([
            (that.paths[index].data[0][0] + that.paths[index].data[that.paths[index].data.length-1][0])/2,
            (that.paths[index].data[0][1] + that.paths[index].data[that.paths[index].data.length-1][1])/2
          ])
        }
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
      getData () {
        const that = this
        that.$http.get(that.$store.state.api + '/highway')
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data
              that.paths = Data.paths
              that.points = Data.points
              that.watch_points = Data.watch_points
              that.positionsInit()
              that.roadInit()
              that.updateRoadData(0)
            } else {
              that.$message.error('error')
            }
          })
      }
    },
    created () {
      this.getData()
    },
    watch: {
      timelineTime: function () {
        this.updateRoadData(this.timelineTime)
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

<!--<template>-->
<!--    <div class="amap-demo">-->
<!--        <el-amap vid="amap" :zoom="zoom" :center="center">-->
<!--            <el-amap-polyline :path="polyline.path" :events="polyline.events"></el-amap-polyline>-->
<!--        </el-amap>-->
<!--    </div>-->
<!--</template>-->

<!--<style>-->
<!--    .amap-demo {-->
<!--        height: 100%;-->
<!--        width: 100%;-->
<!--    }-->
<!--</style>-->

<!--<script>-->
<!--  module.exports = {-->
<!--    data() {-->
<!--      return {-->
<!--        zoom: 12,-->
<!--        center: [121.5273285, 31.25515044],-->
<!--        polyline: {-->
<!--          path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],-->
<!--          events: {-->
<!--            click: (e) => {-->
<!--              alert('click polyline');-->
<!--              console.log(e)-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      };-->
<!--    }-->
<!--  };-->
<!--</script>-->
