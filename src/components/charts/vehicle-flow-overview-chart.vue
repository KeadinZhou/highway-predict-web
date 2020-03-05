<template>
    <ve-histogram
            :extend="extend"
            :data="chartData"
            :legend-visible="false">
    </ve-histogram>
</template>

<script>
  export default {
    name: "vehicle-flow-overview-chart",
    props: {
      chartData: Object
    },
    data () {
      return {
        extend: {
          xAxis: {
            triggerEvent: true,
            axisLabel: {
              margin: 15,
              rotate: 45
            }
          },
        }
      }
    }
  }
</script>

<style scoped>

</style>
