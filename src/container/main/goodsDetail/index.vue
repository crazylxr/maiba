<template>
    <div id="goodsDetail">
        <SiteNav></SiteNav>
        <div class="content">
            <div class="product-info">
                <div class="preview-wrap">
                    <div class="preview">
                        <img class="preview_img" :src="majorImages[majorImgIndex]" alt="无图">
                    </div>
                    <div class="spec-list">
                        <ul>
                            <li v-for="item in 3" :key="item">
                                <img :class="{ redBorder: item === majorImgIndex }" :src="majorImages[item]" @mouseover="changeMajorImg(item)" alt="主图">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="itemInfo-wrap">
                    <h3>{{ goodsInfo.name }}</h3>

                    <div class="summary-price-wrap">
                        <div class="summary-price">
                            <span class="property-type">原价</span>
                            <span class="property-cont">￥{{ goodsInfo.price }}</span>
                        </div>
                        <div class="discount-price">
                            <span class="property-type">折扣价</span>
                            <span class="property-cont">￥{{ goodsInfo.discountPrice }}</span>
                        </div>
                    </div>

                    <div class="inventory">
                        <span class="property-type">库存</span>
                        <span class="property-cont">{{ goodsInfo.inventory }}</span>
                    </div>

                    <div class="spec">
                        <span class="property-type">规格</span>
                        <ul>
                            <li>
                                <el-button size="mini">规格1</el-button>
                            </li>
                            <li>
                                <el-button size="mini">规格2</el-button>
                            </li>
                            <li>
                                <el-button size="mini">规格3</el-button>
                            </li>
                            <li>
                                <el-button size="mini">规格4</el-button>
                            </li>
                        </ul>
                    </div>

                    <div class="amount">
                        <span class="property-type">数量</span>
                        <el-input-number size="mini" v-model="amount"></el-input-number>
                    </div>

                    <div class="action">
                        <el-button type="primary" @click="buyNow">立即购买</el-button>
                        <el-button type="success" @click="addShoppingCart">加入购物车</el-button>
                    </div>
                </div>

            </div>

            <div class="introduce">
                <div class="toolbar">
                    <el-tabs type="border-card">
                        <el-tab-pane label="商品介绍">
                            <div class="description-text">
                                <p>{{ goodsInfo.description }}</p>
                            </div>
                            <div class="description-imgs">
                                <img :src="item" alt="副图" :key="index" v-for="(item, index) in minorImages">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="商品评价">
                            <ul class="comment">
                                <li>
                                    <div class="user">
                                        <img class="avtor" src="//wwc.alicdn.com/avatar/getAvatar.do?userIdStr=vFkSPFHuXH*evF8LPmHSXHP-MCM-MGl-XFcyPGgyM08WvFNuOHQ4MFvYPm*HXFhh&width=40&height=40&type=sns" alt="">
                                        <span class="nickname">勿忘心安111</span>
                                    </div>
                                    <div class="content">
                                        <p>
                                            收到货后自己动手把老电脑上的1TG机械硬盘拆下，装到了新主机里做存储盘用，这就解决了120G固态硬盘小的问题。主机配置不错，非常平稳流畅，千把元能淘到这样好的宝贝非常满意，在这里对店主表示深切地感谢！全5分好评！！！！！ 收到货后自己动手把老电脑上的1TG机械硬盘拆下，装到了新主机里做存储盘用，这就解决了120G固态硬盘小的问题。主机配置不错，非常平稳流畅，千把元能淘到这样好的宝贝非常满意，在这里对店主表示深切地感谢！全5分好评！！！！！
                                        </p>
                                        <p class="time">
                                            2018年04月17日 18:12
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="user">
                                        <img class="avtor" src="//wwc.alicdn.com/avatar/getAvatar.do?userIdStr=vFkSPFHuXH*evF8LPmHSXHP-MCM-MGl-XFcyPGgyM08WvFNuOHQ4MFvYPm*HXFhh&width=40&height=40&type=sns" alt="">
                                        <span class="nickname">勿忘心安111</span>
                                    </div>
                                    <div class="content">
                                        <p>
                                            收到货后自己动手把老电脑上的1TG机械硬盘拆下，装到了新主机里做存储盘用，这就解决了120G固态硬盘小的问题。主机配置不错，非常平稳流畅，千把元能淘到这样好的宝贝非常满意，在这里对店主表示深切地感谢！全5分好评！！！！！ 收到货后自己动手把老电脑上的1TG机械硬盘拆下，装到了新主机里做存储盘用，这就解决了120G固态硬盘小的问题。主机配置不错，非常平稳流畅，千把元能淘到这样好的宝贝非常满意，在这里对店主表示深切地感谢！全5分好评！！！！！
                                        </p>
                                        <p class="time">
                                            2018年04月17日 18:12
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SiteNav from '../../../components/SiteNav/index'
import { getGoodsById } from '../../../api/main/indexApi'
import { saveShoppingCart } from '../../../api/main/goodsDetailApi'

export default {
  data () {
    return {
      majorImgIndex: 0,
      goodsInfo: {},
      amount: 1,
      majorImages: [],
      minorImages: []
    }
  },
  components: {
    SiteNav: SiteNav
  },
  created () {
    this.getGoods()
  },
  methods: {
    async buyNow () {
      this.$router.push({ name: 'buyNow', params: { ids: JSON.stringify([this.$route.params.id]) } })
    },
    async addShoppingCart () {
      const res = await saveShoppingCart(Object.assign({}, this.goodsInfo, { number: this.amount }))
      this.$router.push({ name: 'shoppingCart' })
      console.log(res)
    },
    changeMajorImg (index) {
      this.majorImgIndex = index
    },
    async getGoods () {
      const res = await getGoodsById(this.$route.params.id)
      this.goodsInfo = res.data.data.goods
      this.majorImages = res.data.data.majorImages.map(item => {
        return 'http://' + item.path.replace('//', '/goods-service/')
      })
      this.minorImages = res.data.data.minorImages.map(item => {
        return 'http://' + item.path.replace('//', '/goods-service/')
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

.content {
  width: 800px;
  margin: 0 auto;
}
.product-info {
  display: flex;
}

.itemInfo-wrap {
  width: 390px;
  padding: 0 20px;
}

.preview-wrap {
  display: flex;
  flex-direction: column;
  width: 40%;
}
.preview {
  height: 320px;
  border: 1px solid #cecece;
}
.preview img {
  width: 100%;
  height: 320px;
}
.spec-list ul {
  display: flex;
  flex-direction: row;
  list-style: none;

  li img {
    width: 80px;
    margin: 3px;
    border: 1px solid #999;
  }
}

.redBorder {
  border: 2px solid #f56c6c !important;
}

.summary-price-wrap {
  padding: 10px;
  background: #f3f3f3;
  color: #333;
}

.property-type {
  display: inline-block;
  width: 60px;
  font-size: 14px;
}
.summary-price {
  margin-bottom: 10px;
  .property-cont {
    font-weight: 800;
    text-decoration: line-through;
  }
}
.discount-price {
  .property-cont {
    color: #007aaa;
    font-size: 22px;
  }
}
.inventory {
  margin-top: 10px;
  padding-left: 10px;
}
.amount {
  margin-top: 10px;
  padding-left: 10px;
  vertical-align: middle;
}

.action {
  margin-top: 40px;
  text-align: center;
}
.spec {
  display: flex;
  align-items: center;
  padding-left: 10px;

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0px;
  }

  li {
    display: inline-block;
    margin: 5px;
  }
}

.description-imgs {
  img {
    width: 100%;
  }
}

.comment {
  display: flex;
  list-style: none;
  flex-direction: column;

  li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }

  li:nth-child(1) {
    padding-top: 0;
  }

  .user {
    img {
      width: 40px;
      height: 40px;
    }

    .nickname {
      display: inline-block;
      width: 40px;
      overflow: hidden;
      font-size: 12px;
      word-break: keep-all;
      text-overflow: ellipsis;
    }
  }

  .content {
    padding-left: 10px;
    font-size: 13px;
    letter-spacing: 1px;
    color: #444;

    p {
      margin: 0;
    }
    .time {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
