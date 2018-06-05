 <template>
  <div class="orderManager">
    <SiteNav></SiteNav>
    <div class="content">
      <h2 class="title">我的订单</h2>
      <div class="oprator">
        <el-radio-group v-model="label" @change="filterState">
          <el-radio-button label="全部订单"></el-radio-button>
          <el-radio-button label="待发货"></el-radio-button>
          <el-radio-button label="待收货"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="contentTable">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="name" label="商品图片" align="center">
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
              <span>{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.price * scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="changeState(scope.row.orderPkId, scope.row.state)">{{ scope.row.state === 2 ? '确认收货' : '无' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrderByState,
  getAllOrders,
  updateStateByOrderId
} from '../../../api/admin/orderApi.js'
import SiteNav from '../../../components/SiteNav/index'

export default {
  data () {
    return {
      tableData: [],
      label: '全部订单', // radio label
      state: 0
    }
  },
  components: {
    SiteNav: SiteNav
  },
  created () {
    getAllOrders(1).then(res => {
      this.changeTable(res)
    })
  },
  methods: {
    changeTable (res) {
      const source = res.data ? res.data.data : []
      this.tableData = source.map(item => {
        let t = item.goods.data.goods
        item.imgUrl = 'http://' + item.goods.data.majorImages[0].path.replace('//', '/goods-service/')
        return Object.assign({}, t, item)
      })
      console.log(source)
    },
    handleSelectionChange (val) {},
    filterState (val) {
      const map = {
        全部订单: 0,
        待发货: 1,
        待收货: 2,
        已完成: 3
      }

      this.state = map[val]

      if (this.state === 0) {
        getAllOrders().then(res => {
          this.changeTable(res)
        })

        return
      }

      getOrderByState (this.state).then(res => {
        this.changeTable(res)
      })
    },
    changeState (id, state) {
      if (state > 2) {
        return
      }
      updateStateByOrderId(id, ++state).then(res => {
        getAllOrders().then(res => {
          this.changeTable(res)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 800px;
  margin: 0 auto;
}
.title {
  text-align: center;
}
</style>
