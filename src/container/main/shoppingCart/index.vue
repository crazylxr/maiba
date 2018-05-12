<template>
    <div class="shoppingCart">
        <SiteNav></SiteNav>
        <h2 class="title">购物车</h2>
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
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import SiteNav from '../../../components/SiteNav/index'
import { getShoppingCartByUserId } from '../../../api/main/shoppingCart'

export default {
  data () {
    return {
      multipleSelection: [],
      tableData: []
    }
  },
  components: {
    SiteNav: SiteNav
  },
  created () {
    getShoppingCartByUserId(localStorage.getItem('userId')).then(res => {
      this.tableData = res.data.data.map(item => {
        item.imgUrl = 'http://' + item.imgUrl.replace('//', '/goods-service/')
        return item
      })
      console.log(res)
    })
  },
  methods: {
    toBuyNow () {
      const ids = this.multipleSelection.map(res => res.goodsId)
      if (ids.length && ids.length > 0) {
        this.$router.push({ name: 'buyNow', params: { ids: JSON.stringify(ids) } })
      } else {
        this.$message({ message: '请选择商品!', type: 'warning' })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
            return <el-button type="primary" onClick={ this.toBuyNow }>结算</el-button>
          }
        }

        return map[index] ? map[index].apply(this) : ''
      })
    },
    renderText (text) {
      return <span style="color: #66b1f1;font-size: 16px;">{text}</span>
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto;
  width: 1000px;
}
.title {
  text-align: center;
}
.goodsPic {
  width: 100px;
  height: 100px;
}
</style>
