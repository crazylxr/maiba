<template>
  <div class="goodsInfoManage">
    <div class="goodsTree">
      <el-card>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-card>
    </div>

    <div class="goodsList">
      <el-card>
        <div class="toolbar">
          <el-button @click="showDialog('add')" size="mini" type="primary">新增</el-button>
          <el-button size="mini" type="primary">批量删除</el-button>
        </div>

        <el-table :data="mapTableData()" style="width: 100%" border>
          <el-table-column prop="goodsId" label="商品id" type="selection">
          </el-table-column>
          <el-table-column prop="goodsId" label="商品id" width="130">
          </el-table-column>
          <el-table-column prop="name" label="商品名字">
          </el-table-column>
          <!-- <el-table-column prop="description" label="商品描述">
          </el-table-column> -->
          <el-table-column prop="price" label="价格" width="75">
          </el-table-column>
          <el-table-column prop="discountPrice" label="折后价" width="75">
          </el-table-column>
          <el-table-column prop="inventory" label="库存" width="50">
          </el-table-column>
          <el-table-column prop="volume" label="销量" width="50">
          </el-table-column>
          <el-table-column prop="shelf" label="是否上架" width="80">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" @click="deleteGoodsById(scope.row)"  size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <Goods  :displayType="displayType" :goods="goodsForId"  @ok="refresh"></Goods>
    </el-dialog>
  </div>
</template>

<script>
import { getAllClassification } from '../../../api/admin/classifationApi'
import { getGoods, deleteGoods, getGoodsById } from '../../../api/admin/goodsApi'
import Goods from './goods/index'

export default {
  components: { Goods: Goods },
  data () {
    return {
      dialogFormVisible: false,
      goodsForId: {},
      treeData: [],
      displayType: 0, // 0 新增， 1 编辑， 2 查看
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: []
    }
  },
  created () {
    this.refresh()
  },

  methods: {
    async handleNodeClick () {

    },
    async changeGoodsForId (id) {
      const res = await getGoodsById(id)
      this.goodsForId = res.data.data
      console.log(this.goodsForId)
    },
    async view (row) {
      this.displayType = 2
      await this.changeGoodsForId(row.pkId)
      this.dialogFormVisible = true
    },
    async edit (row) {
      console.log(row)
      this.displayType = 1
      this.dialogFormVisible = true
    },
    async deleteGoodsById (row) {
      deleteGoods(row.pkId)
      this.refresh()
    },
    async refresh () {
      getAllClassification().then(res => {
        this.treeData = res.data.data[0].children
      })

      const res = await getGoods()
      const tableData = res.data.data.content
      this.tableData = tableData

      this.dialogFormVisible = false
    },
    showDialog (type = 'add') {
      this.dialogFormVisible = true
    },
    mapTableData () {
      const _tableData = JSON.parse(JSON.stringify(this.tableData))
      return _tableData.map(item => {
        item.shelf = item.shelf ? '是' : '否'
        return item
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
