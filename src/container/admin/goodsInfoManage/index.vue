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

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" type="selection">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <Goods @ok="refresh"></Goods>
    </el-dialog>
  </div>
</template>

<script>
import { getAllClassification } from "../../../api/admin/classifationApi";
import Goods from "./goods/index";

export default {
  components: { Goods: Goods },
  data() {
    return {
      dialogFormVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    this.refresh();
  },

  methods: {
    refresh() {
      getAllClassification().then(res => {
        this.treeData = res.data.data[0].children;
      });
    },
    handleNodeClick() {},
    showDialog(type = "add") {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>

