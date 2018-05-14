<template>
    <div class="myInfoContainer">
        <el-form ref="form" :model="form" label-width="80px" style="width: 350px; margin: 0 auto;">
            <el-form-item label="昵称">
                <el-input class="formInput"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input class="formInput"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input class="formInput"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-from-item>
                <el-button type="primary" @click="onSubmit">保存信息</el-button>
            </el-from-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        gender: 1
      }
    }
  },
  methods: {
    onSubmit () {
      alert(55)
    }
  }
}
</script>

<style lang="less" scoped>
.formInput {
  width: 200px !important;
}
</style>
