<template>
  <div class="userMangerContainer">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="name" label="真实名字">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column prop="birthday" label="生日">
      </el-table-column>
      <el-table-column prop="gender" label="性别">
      </el-table-column>
      <el-table-column prop="userType" label="用户类型">
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.state ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUsers } from '../../../api/admin/userApi'

export default {
  name: 'User',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const res = await getUsers()
      this.tableData = res.data.data
      console.log(res.data.data)
    }
  }

}
</script>
