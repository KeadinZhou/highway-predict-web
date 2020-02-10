<template>
    <div class="import-data">
        <input type="file" id="trueUpload" />
        <el-button @click="upload">Import Data</el-button>
    </div>
</template>

<script>
  export default {
    name: "import-data",
    methods: {
      upload () {
        document.getElementById('trueUpload').click()
      }
    }
  }
</script>

<style scoped>
    .import-data{
        margin: 40px 0;
    }
    #trueUpload{
        display: none;
    }
</style>
