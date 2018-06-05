<template>
  <div class="indexContainer">
    <SiteNav></SiteNav>
    <el-card style="text-align: center;">
      <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
        <el-cascader :options="options" v-model="selectedClassification" @change="handleChange">
        </el-cascader>

        <el-form-item label="标题：">
          <el-input v-model="searchForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item
          label="价格:"
          prop="startPrice"
          :rules="[
          ]"
        >
          <el-input
            type="startPrice"
            v-model.number="searchForm.startPrice"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="~"
          prop="endPrice"
          :rules="[]"
        >
          <el-input type="endPrice" v-model.number="searchForm.endPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div class="goodsList">
        <div class="goodsItem"  @click="toDetail(item)" v-for="(item, index) in data.content" :key="index">
          <el-card :body-style="{ padding: '10px', width: '100%'}">
            <img class="goodsImg" :src="item.majorImage.length > 0 ? 'http://localhost:8100/goods-service/' + item.majorImage[0].name + '.png' : 'http://www.atool.org/placeholder.png?size=180x240'" alt="88">
            <div class="info">
              <h5>{{ item.goods.name }}</h5>
              <span>{{ item.goods.price }}</span>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import SiteNav from '../../../components/SiteNav/index'
import { getIndexGoods } from '../../../api/main/indexApi'

export default {
  data () {
    return {
      data: {},
      searchForm: {
        title: '',
        startPrice: '',
        endPrice: '',
        selectedClassification: [],
        options:[]
      }
    }
  },

  components: {
    SiteNav: SiteNav
  },

  created () {
    getIndexGoods().then(res => {
      this.data = res.data.data
      console.log(res)
    })
  },

  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getIndexGoods(0, 10, this.searchForm).then(res => {
            this.data = res.data.data
          })
        } else {
          this.$message({
            message: '请输入正确的数据类型!',
            type: 'warning',
            duration: 1000
          })
          return false
        }
      })
    },
    toDetail (item) {
      const id = item.goods.pkId
      this.$router.push({ path: '/detail/' + id })
    }
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

.info {
  width: 240px;
}
</style>
