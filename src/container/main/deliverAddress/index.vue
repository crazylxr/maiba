<template>
  <div class="deliverAddress">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveAddress">保存</el-button>
      </el-form-item>
    </el-form>

    <div class="addressList">
      <el-card>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="收货人" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" align="center">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码" align="center">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAddress, saveAddress } from '../../../api/main/personalCenterApi'

export default {
  data () {
    return {
      form: {
        name: '',
        tel: '',
        address: ''
      },
      tableData: []
    }
  },
  created () {
    this.fetchAddress()
  },
  methods: {
    async fetchAddress () {
      const res = await getAddress()
      this.tableData = res.data.data
      console.log(res)
    },
    async saveAddress () {
      const res = await saveAddress(this.form)
      console.log(res)
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
