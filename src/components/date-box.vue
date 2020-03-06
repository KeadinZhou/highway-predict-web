<template>
    <div class="out-box">
        <div class="date-box">
            <div style="font-size: 14px; margin-bottom: 5px"><b>Choose the Observed Time</b></div>
            <el-select v-model="dateChose">
                <el-option
                        v-for="item in dateList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
  export default {
    name: "date-box",
    data () {
      return {
        dateList: [
          '2019-09-23',
          '2019-09-24',
          '2019-09-25',
          '2019-09-26',
          '2019-09-27',
          '2019-09-28',
          '2019-09-29',
          '2019-09-30'
        ],
        dateChose: '2019-09-23'
      }
    },
    watch: {
      dateChose: function () {
        this.$store.commit('dateUpdate', this.dateChose)
        this.$store.commit('timeUpdate', 0)
        this.$emit('dateUpdated', this.dateChose)
      }
    }
  }
</script>

<style scoped>
    .date-box{
        width: 200px;
        margin: 20px;
        text-align: center;
    }
    .out-box{
        position: fixed;
        left: 40px;
        top: 40px;
        background: rgba(255,255,255,.7);
        border-radius: 18px;
    }
</style>
