<template>
<div class="goodsInfoManage">
  <div class="title">
    <span class="text">商品标题:</span> <el-input width="100px;" v-model="title" placeholder="请输入商品标题"></el-input>
  </div>

  <div class="description">
    <span class="text">商品描述:</span>
    <el-input
      type="textarea"
      :row="2"
      >
    </el-input>
  </div>

  <div class="main_image">
    主图：
    <el-upload
      action="resources"
      name="fileName"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

  <div class="detail_image">
    详细图：
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
      }
    }
}
</script>

<style lang="less">
@import './index.less';

.el-input {
}
</style>
