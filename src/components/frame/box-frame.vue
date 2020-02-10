<template>
    <div class="box-frame">
        <div class="box-title" @click="showSwitch">
            {{title}}
        </div>
        <el-collapse-transition>
            <div class="box-main" v-show="boxMainShow">
                <slot></slot>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
  export default {
    name: "box-frame",
    props: {
      title: String
    },
    data () {
      return {
        boxMainShow: true
      }
    },
    methods: {
      showSwitch () {
        this.boxMainShow = !this.boxMainShow
      }
    }
  }
</script>

<style scoped>
    .box-frame{
        width: 100%;
        margin-top: 20px;
    }
    .box-title{
        height: 30px;
        background: #409EFF;
        color: white;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
    .box-main{
        background: white;
    }
</style>
