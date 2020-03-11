import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = 'http://47.100.13.188/v1'

export default new Vuex.Store({
  state: {
    api: api,
    page: null,
    initState: [false, false, false, false],
    pathData: [],
    exits: [],
    points: [],
    paths: [],
    center: [],
    date: '2019-09-23',
    time: 0,
    timeToText: function (time) {
      let val = 7*60+time*5
      return (''+((val/60<10?'0':'')+parseInt(val/60))+':'+((val%60<10?'0':'')+val%60))
    },
    speeds: new Map(),
    channels: new Map(),
    averageSpeed: 0
  },
  mutations: {
    savePage (state, page) {
      state.page = page
    },
    getPathData (state) {
      let that = state.page
      that.$http.get('path.json')
        .then(data => {
          if (data.data.code === 200) {
            let Data = data.data
            state.pathData = []
            for (let item of Data.path) {
              state.pathData.push(item)
            }
            state.initState[0] = true
            that.$store.commit('getExitData')
          } else {
            that.$message.error('error')
          }
        })
    },
    getExitData (state) {
      let that = state.page
      that.$http.get(state.api + '/exit/get_id')
        .then(data => {
          let Data = data.data.data
          let index = 0
          state.exits = []
          for (let it of Data) {
            while (it/1000 > state.pathData[index].stake) index++;
            state.exits.push({
              lon: state.pathData[index].lon,
              lat: state.pathData[index].lat,
              id: it
            })
          }
          state.initState[1] = true
          that.$store.commit('getPointData')
        })
        .catch(() => {
          that.$message.error('error')
        })
    },
    getPointData (state) {
      let that = state.page
      that.$http.get(state.api + '/point/get_id')
        .then(data => {
          let index = 0
          let Data = data.data.data
          state.points = []
          for (let it of Data) {
            while (index<state.pathData.length && it/1000 > state.pathData[index].stake) index++;
            if (index>=state.pathData.length) break
            state.points.push({
              lon: state.pathData[index].lon,
              lat: state.pathData[index].lat,
              id: it
            })
          }
          state.initState[2] = true
          that.$store.commit('pathInit')
        })
        .catch(error => {
          console.log(error)
          that.$message.error('error')
        })
    },
    pathInit (state) {
      let index = 0
      let tmp = []
      state.paths = []
      for (let it of state.pathData){
        if (index < state.points.length) {
          if (state.points[index].id/1000 < it.stake) {
            state.paths.push(tmp)
            tmp = []
            index++
          }
        }
        tmp.push([it.lon, it.lat])
      }
      if (tmp.length > 0) {
        state.paths.push(tmp)
      }

      state.center = []
      for (let index in state.paths) {
        state.center.push([
          (state.paths[index][0][0] + state.paths[index][state.paths[index].length-1][0])/2,
          (state.paths[index][0][1] + state.paths[index][state.paths[index].length-1][1])/2
        ])
      }

      state.initState[3] = true
    },
    dateUpdate (state, date) {
      state.date = date
    },
    timeUpdate (state, time) {
      state.time = time
    },
    overviewUpdate (state, data) {
      state.speeds = new Map()
      state.channels = new Map()
      let sum = 0, cnt = 0
      for (let item of data) {
        if (item.speed !== null) {
          sum+=item.speed
          cnt++
          item.speed=Math.round(item.speed)
        }
        state.speeds.set(item.point_id, item.speed)
        state.channels.set(item.point_id, item.channel)
      }
      state.averageSpeed = (sum/cnt).toFixed(2)
    }
  },
  actions: {
  },
  modules: {
  }
})
