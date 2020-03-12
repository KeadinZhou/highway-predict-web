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
                 lang="zh">
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

<!--            <el-amap-text-->
<!--                v-for="(center, index) in this.$store.state.center"-->
<!--                :text="''+$store.state.channels.get($store.state.points[index>=$store.state.points.length?$store.state.points.length-1:index].id)"-->
<!--                :position="center"-->
<!--                :offset="[-20,-20]"-->
<!--                :extData="{index:index}"-->
<!--                :key="'road'+index">-->
<!--            </el-amap-text>-->

            <el-amap-text
                v-for="(item, index) in textData"
                topWhenClick
                :text="item.text"
                :position="item.position"
                :offset="[(item.text.length/2)*(-25)-25-20,-20]"
                :key="'text'+index">
            </el-amap-text>

            <el-amap-text
                v-for="(center, index) in this.$store.state.center"
                :text="''+$store.state.speeds.get($store.state.points[index>=$store.state.points.length?$store.state.points.length-1:index].id)"
                :position="center"
                :offset="[50,30]"
                :title="'The average speed of road '+index"
                :key="'speed'+index">
            </el-amap-text>
        </el-amap>
    </div>
</template>

<script>
  import VueAMap from 'vue-amap'
  VueAMap.initAMapApiLoader({
    key: '9a7e7f380a7953213bbecffa284de3e6',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
  })
  export default {
    name: "main-map",
    props: {
      timelineTime: String,
      VueAMap
    },
    data () {
      return {
        pathDataInited: false,
        updated: false,
        roadsUpdated: false,
        speedsUpdated: false,
        zoom: 11,
        center: [120.71402834961201+0.18, 30.642591064591393],
        textData: [
          {text: '亭枫枢纽', position: [120.99461656374115, 30.851251798697746]},
          {text: '嘉善(大云)互通', position: [120.94967772150358+0.02, 30.7963762049402]},
          {text: '步云枢纽', position: [120.91368362271082, 30.77024791893028]},
          {text: '嘉兴互通', position: [120.87039961938245, 30.740092797905948]},
          {text: '嘉兴枢纽', position: [120.77140840317637, 30.668120048202425]},
          {text: '嘉兴2号枢纽副', position: [120.74861162574523, 30.657275645402517]},
          {text: '王店互通', position: [120.7131379621995, 30.64214062552325]},
          {text: '嘉兴服务区', position: [120.6785093390154, 30.62196118174122]},
          {text: '屠甸收费站', position: [120.63501856608474, 30.576722921826878]},
          {text: '桐乡收费站', position: [120.54907869763679, 30.530444896612266]},
          {text: '桐乡枢纽', position: [120.51124588834229, 30.50969224622895]},
          {text: '长安服务区', position: [120.46611296932716, 30.48598062756517]},
          {text: '长安互通', position: [120.43842570208021, 30.474246122274714]},
          {text: '沈士枢纽转杭甬高速', position: [120.398617006375+0.02, 30.438400448146467]}
        ],
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

