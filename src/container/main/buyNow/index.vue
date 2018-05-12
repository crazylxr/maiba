<template>
  <div class="buyNow">
    <SiteNav></SiteNav>
    <el-card style="width: 1000px; margin: 0 auto;">
      <el-card>
        <div slot="header" class="clearfix">
          <span>确认收货地址</span>
        </div>
        <div>
          <el-radio-group v-model="addressIndex">
            <el-radio v-for="(item, index) in address" :label="index" :key="index">
              {{ `${item.address}(${item.name} 收)` }}
            </el-radio>
          </el-radio-group>
        </div>
      </el-card>

      <el-card>
        <div slot="header" class="clearfix">
          <span>确认订单信息</span>
          <div class="content">
            <el-table :summary-method="getSummaries" show-summary :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="60"></el-table-column>
              <el-table-column label="商品图片" align="center">
                <template slot-scope="scope">
                  <img class="goodsPic" :src="scope.row.imgUrl" alt="图片加载失败,刷新试试">
                </template>
              </el-table-column>
              <el-table-column label="商品信息" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.number" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="金额" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.price * scope.row.number }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="operator">
            <el-button type="primary" @click="submitOrder">提交订单</el-button>
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import SiteNav from '../../../components/SiteNav/index'
import { getAddress } from '../../../api/main/personalCenterApi'
import { getGoodsById } from '../../../api/main/indexApi'
import { saveOrder } from '../../../api/main/buyNowApi'

export default {
  data () {
    return {
      ids: [],
      address: [],
      multipleSelection: [],
      addressIndex: 0,
      tableData: []
    }
  },
  components: {
    SiteNav: SiteNav
  },
  created () {
    this.fetchAddress()
    this.fetchGoods()
  },
  methods: {
    async submitOrder () {
      if (this.multipleSelection.length === 0) {
        this.$message({ message: '请选择商品!', type: 'warning' })
        return
      }
      const addressId = this.address[this.addressIndex].pkId
      await saveOrder({
        addressId: addressId,
        orderItems: this.multipleSelection
      })

      this.$router.push({ name: 'colorEgg' })
    },
    async fetchGoods () {
      this.ids = JSON.parse(this.$route.params.ids)

      this.ids.forEach(item => {
        getGoodsById(item).then(res => {
          const singleGoods = res.data.data
          const tmp = {
            number: 1,
            imgUrl:
              'http://' +
              singleGoods.majorImages[0].path.replace('//', '/goods-service/'),
            price: singleGoods.goods.price,
            name: singleGoods.goods.name
          }

          this.tableData.push(tmp)
          console.log(res.data.data)
        })
      })
    },
    async fetchAddress () {
      const res = await getAddress()
      this.address = res.data.data
      console.log(this.address)
    },
    getSummaries (param) {
      const { columns } = param
      return columns.map((item, index) => {
        const map = {
          0: function handle () {
            return '合计'
          },
          4: function handle () {
            return (
              <span>
                已选商品 {this.renderText(this.multipleSelection.length)} 件
              </span>
            )
          },
          5: function handle () {
            const totalPrice = this.multipleSelection.reduce((a, b) => {
              return a + b.number * b.price
            }, 0)

            return <span>总价为： {this.renderText('￥' + totalPrice)}</span>
          },
          6: function handle () {
            return <el-button type="primary">结算</el-button>
          }
        }

        return map[index] ? map[index].apply(this) : ''
      })
    },
    renderText (text) {
      return <span style="color: #66b1f1;font-size: 16px;">{text}</span>
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
.el-radio {
  margin-left: 20px;
}
.operator {
  margin-top: 15px;
  text-align: right;
}
</style>
