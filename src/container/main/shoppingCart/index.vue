<template>
    <div class="shoppingCart">
        <SiteNav></SiteNav>
        <h2 class="title">购物车</h2>
        <div class="content">
            <el-table 
                :summary-method="getSummaries"
                show-summary
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
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

export default {
  data () {
    return {
      multipleSelection: [],
      tableData: [
        {
          number: 2,
          imgUrl: 'http://localhost:8100/goods-service/7689be55-8229-4901-bf5e-78b0b724c26e.png',
          price: 5000,
          totalPrice: 10000,
          name: '华硕飞行堡垒第四代 测试更新'
        },
        {
          number: 2,
          imgUrl: 'http://localhost:8100/goods-service/7689be55-8229-4901-bf5e-78b0b724c26e.png',
          price: 5000,
          totalPrice: 10000,
          name: '华硕飞行堡垒第四代 测试更新'
        },
        {
          number: 2,
          imgUrl: 'http://localhost:8100/goods-service/7689be55-8229-4901-bf5e-78b0b724c26e.png',
          price: 5000,
          totalPrice: 10000,
          name: '华硕飞行堡垒第四代 测试更新'
        },
        {
          number: 2,
          imgUrl: 'http://localhost:8100/goods-service/7689be55-8229-4901-bf5e-78b0b724c26e.png',
          price: 5000,
          totalPrice: 10000,
          name: '华硕飞行堡垒第四代 测试更新'
        }
      ]
    }
  },
  components: {
    SiteNav: SiteNav
  },
  methods: {
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
        const { columns, data } = param
        return columns.map((item, index) => {
            if (index === 0) {
                return '合计'
            }

            if(index === 4) {
                return '已选商品 ' + this.multipleSelection.length + ' 件'
            }

            if (index === 5) {
                return '总价为：￥' + this.multipleSelection.reduce((a, b) => {
                    return a + b.number * b.price
                }, 0)
            }

            return '';
        })
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
