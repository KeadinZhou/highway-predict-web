<template>
    <div>
        <box-frame title="Change Point Flow">
            <el-button circle type="danger" icon="el-icon-close" title="Cancel" @click="flow=0"></el-button>
            <el-input-number
                    class="flow-change"
                    v-model="flow"
                    :precision="2"
                    :step="0.1">
            </el-input-number>
            <el-button circle type="success" icon="el-icon-check" title="Submit" @click="$message.success('Submit')"></el-button>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  export default {
    name: "change-point-flow",
    components: {
      'box-frame': BoxFrame
    },
    data () {
      return {
        flow: 0
      }
    }
  }
</script>

<style scoped>
    .flow-change{
        margin: 20px 50px;
    }
</style>
