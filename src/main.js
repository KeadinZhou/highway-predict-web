import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import axios from 'axios'
import VueAMap from 'vue-amap'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '9a7e7f380a7953213bbecffa284de3e6',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('savePage', this)
  }
}).$mount('#app')
