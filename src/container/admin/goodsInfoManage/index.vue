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
      v-model="description"
      >
    </el-input>
  </div>

  <div class="block">
    <span class="demonstration">分类：</span>
    <el-cascader
      :options="options"
      v-model="selectedClassification"
      >
    </el-cascader>
  </div>

  <div class="main_image">
    主图：
    <el-upload
      action="resources"
      name="fileName"
      list-type="picture-card"
      :on-preview="handleMajorPictureCardPreview"
      :on-remove="handleMajorRemove"
      :on-success="handleMajorSuccess"
      >
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
      :on-preview="handleMinorPictureCardPreview"
      :on-remove="handleMinorRemove"
      :on-success="handleMinorSuccess"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

  <div class="operator">
    <el-button type="primary" @click="save(0)">保存</el-button>
    <el-button type="primary" @click="save(1)">上架</el-button>
  </div>
</div>
</template>

<script>
import { getAllClassification } from '../../../api/admin/classifationApi'

export default {
    data () {
        return {
            title: '',
            dialogImageUrl: '',
            dialogVisible: false,
            description: '',
            majorImages: [],
            minorImages: []
        }
    },
    created() {
        getAllClassification().then();
    },
    methods: {
        handleMajorRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleMajorPictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        handleMinorRemove(file, fileList) {
            console.log(file, fileList);
        },

        handleMinorPictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        handleMajorSuccess(res, file, fileList) {
            console.log(res);
        },

        handleMinorSuccess(res, file, fileList) {
            console.log(res);
        },

        save() {
            console.log(this.title);
            console.log(this.description);
        }
    }
}
</script>

<style lang="less">
@import './index.less';

.el-input {
}
</style>
