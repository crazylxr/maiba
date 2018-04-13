<template>
  <div class="indexContainer">
    <el-card>

    </el-card>
  </div>
</template>

<script>
import { getIndexGoods } from '../../../api/main/indexApi'

export default {
  data() {
      return {

      }
  },

  created() {
    getIndexGoods().then(res => {
      console.log(res);
    });
  }
}
</script>
