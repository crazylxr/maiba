<template>
  <div class="indexContainer">
    <el-card style="text-align: center;">
      <el-form :inline="true" :model="searchForm" class="searchForm">
        <el-form-item label="标题：">
          <el-input v-model="searchForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input v-model="searchForm.startPrice"></el-input>
        </el-form-item>
        <el-form-item label="~">
          <el-input v-model="searchForm.endPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

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
      data: {},
      searchForm: {
        title: '',
        startPrice: 0,
        endPrice: 100
      }
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
