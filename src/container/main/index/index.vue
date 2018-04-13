<template>
  <div class="indexContainer">
    <el-card>
      <div class="goodsList">
        <div class="goodsItem" v-for="(item, index) in data.content" :key="index">
          <el-card :body-style="{ padding: '10px', width: '100%'}">
            <img class="goodsImg" :src="item.majorImage.length > 0 ? 'http://' + item.majorImage[0].path : 'http://www.atool.org/placeholder.png?size=180x240'" alt="88">
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getIndexGoods } from '../../../api/main/indexApi'

export default {
  data () {
    return {
      data: {}
    }
  },

  created () {
    getIndexGoods().then(res => {
      this.data = res.data.data
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
.goodsImg {
  width: 180px;
  height: 240px;
}

.goodsList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 1000px;
  margin: 0 auto;
}
.goodsItem {
  padding: 5px;
}
</style>
