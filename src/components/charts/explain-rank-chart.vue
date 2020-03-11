<template>
    <ve-bar :data="chartData" :settings="chartSettings" :legend-visible="false" height="500px"></ve-bar>
</template>

<script>
  export default {
    name: "explain-rank-chart",
    props: {
      chartData: Object,
      chartSettings: Object
    }
  }
</script>

<style scoped>

</style>
