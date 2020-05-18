<template>
    <div id="app" ref="pageBox">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
      }
    },
    methods: {
      fixBox () {
        this.clientHeight = window.innerHeight
        this.clientWidth = window.innerWidth
        this.$refs.pageBox.style.height = this.clientHeight + 'px'
        this.$refs.pageBox.style.widows = this.clientWidth + 'px'
      }
    },
    mounted () {
      this.fixBox()
      const that = this
      window.onresize = () => {
        return (() => {
          that.fixBox()
        })()
      }
    }
  }
</script>
<style>
    *{
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        list-style-type: none;
    }
    #app{
        font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        overflow: hidden;
    }
    .el-scrollbar__wrap {
        overflow: auto;
    }
    .el-select-dropdown__wrap {
        overflow: scroll;
    }
</style>
