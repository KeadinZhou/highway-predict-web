<template>
    <ve-histogram
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
      }
    }
  }
</script>

<style scoped>

</style>
