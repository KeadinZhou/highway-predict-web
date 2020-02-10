<template>
    <ve-line
            :data="chartData"
            :legend-visible="false">
    </ve-line>
</template>

<script>
  export default {
    name: "point-vehicle-flow-trend-chart",
    props: {
      chartData: Object
    },
  }
</script>

<style scoped>

</style>
