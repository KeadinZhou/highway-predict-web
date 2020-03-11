<template>
    <ve-line
            :data="chartData"
            height="500px"
            :mark-point="markPoint"
            :legend-visible="false">
    </ve-line>
</template>

<script>
  export default {
    name: "explain-line-chart",
    props: {
      chartData: Object,
      markPoint: Object
    },
    created() {
      console.log(this.markPoint)
    }
  }
</script>

<style scoped>

</style>
