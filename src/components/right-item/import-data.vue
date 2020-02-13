<template>
    <div class="import-data">
        <input type="file" id="trueUpload" />

        <el-divider>Import Data</el-divider>
        <el-button-group>
            <el-button @click="upload" style="width: 100px">Vehicle</el-button>
            <el-button @click="upload" style="width: 100px">Toll</el-button>
        </el-button-group>
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
