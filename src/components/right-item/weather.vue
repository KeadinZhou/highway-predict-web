<template>
    <div>
        <box-frame title="Weather">
            <div class="weather-box">
                <div class="weather-box-icon">
                    <i :class="weatherIcon"></i>
                </div>
                <div class="weather-box-text">
                    <div style="font-size: 32px">
                        <b>{{weatherText}}</b>
                    </div>
                    <div style="font-size: 20px">
                        {{temperatureMin}} ~ {{temperatureMax}} °C
                    </div>
                </div>
            </div>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  export default {
    name: "weather",
    props: {
      timelineTime: Number
    },
    components: {
      'box-frame': BoxFrame
    },
    data () {
      return {
        weather: 0,
        weatherText: '晴',
        weatherIcon: '',
        temperatureMin: 0,
        temperatureMax: 1,
      }
    },
    methods: {
      updateTextAndIcon () {
        const that = this
        switch (that.weather) {
          case 0:
            that.weatherText = '晴'
            that.weatherIcon = 'el-icon-sunny'
            break
          case 1:
            that.weatherText = '多云转晴'
            that.weatherIcon = 'el-icon-cloudy-and-sunny'
            break
          case 2:
            that.weatherText = '多云'
            that.weatherIcon = 'el-icon-cloudy'
            break
          case 3:
            that.weatherText = '雨'
            that.weatherIcon = 'el-icon-heavy-rain'
            break
          case 4:
            that.weatherText = '雷雨'
            that.weatherIcon = 'el-icon-lightning'
            break
          case 5:
            that.weatherText = '雪'
            that.weatherIcon = 'el-icon-light-rain'
            break
        }
      },
      // eslint-disable-next-line no-unused-vars
      getData (timelineTime) {
        const that = this
        that.weather = Math.round(Math.random() * 5)
        that.temperatureMin = Math.round(Math.random() * 10)
        that.temperatureMax = that.temperatureMin + Math.round(Math.random() * 25)
        that.updateTextAndIcon()
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
    .weather-box{
        width: 100%;
        height: 100px;
        color: black;
        display: flex;
    }
    .weather-box-icon{
        margin: 10px 20px 10px 150px;
        font-size: 80px;
    }
    .weather-box-text{
        margin: 10px 0;
        text-align: center;
    }
</style>
