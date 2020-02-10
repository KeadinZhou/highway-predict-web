<template>
    <div>
        <box-frame title="Change Path Lanes">
            <el-button circle type="danger" icon="el-icon-close" title="Cancel" @click="lane=4"></el-button>
            <el-input-number
                    class="flow-change"
                    v-model="lane"
                    :min="0"
                    :step="1">
            </el-input-number>
            <el-button circle type="success" icon="el-icon-check" title="Submit" @click="$message.success('Submit')"></el-button>
        </box-frame>
    </div>
</template>

<script>
  import BoxFrame from '@/components/frame/box-frame'
  export default {
    name: "change-path-lanes",
    components: {
      'box-frame': BoxFrame
    },
    data () {
      return {
        lane: 4
      }
    }
  }
</script>

<style scoped>
    .flow-change{
        margin: 20px 50px;
    }
</style>
