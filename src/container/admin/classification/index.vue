<template>
  <div>
    <el-tree :data="treeData" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
    </el-tree>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="tmpLabel" placeholder="请输入分类名称"></el-input>
      <span slot="footer">
        <el-button type="primary" @click="append">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="deleteDialogVisible" width="30%">
      你确定删除该节点吗？
      <span slot="footer">
        <el-button type="primary" @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sureDelete">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as classificationApi from '../../../api/admin/classifationApi'

export default {
  name: 'classification',
  data () {
    return {
      treeData: [],
      tmpLabel: '',
      dialogVisible: false,
      deleteDialogVisible: false,
      tmpData: {}
    }
  },

  created () {
    this.fetchAll()
  },

  methods: {
    showDialog (data) {
      this.dialogVisible = true
      this.tmpData = data
    },

    async append () {
      if (!this.tmpLabel) {
        this.$message.error('名称必须为空！')
        return
      }

      classificationApi.saveClassification({
        parentId: this.tmpData.value,
        name: this.tmpLabel
      })
      const allResponse = await this.fetchAll()

      if (allResponse.data.code === '0000') {
        this.dialogVisible = false
        this.tmpLabel = ''
      }
    },

    fetchAll () {
      return classificationApi
        .getAllClassification()
        .then(res => {
          this.treeData = res.data.data
          return res
        })
        .catch(err => console.log(err))
    },

    showDeleteDialog (node, data) {
      this.deleteDialogVisible = true
      this.tmpData = data
    },

    async sureDelete () {
      classificationApi.deleteClassification(
        this.tmpData.value
      )

      await this.fetchAll()

      this.deleteDialogVisible = false
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.showDialog(data)}
            >
              新增
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.showDeleteDialog(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
