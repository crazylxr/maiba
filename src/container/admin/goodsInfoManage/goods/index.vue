<template>
  <div class="goods">
    <div class="title">
      <span class="text">商品标题:</span>
      <el-input width="100px;" v-model="title" placeholder="请输入商品标题"></el-input>
    </div>

    <div class="description">
      <span class="text">商品描述:</span>
      <el-input type="textarea" :row="2" v-model="form.description">
      </el-input>
    </div>

    <div class="block">
      <el-col :span="10">
        <span class="demonstration">分类：</span>
        <el-cascader :options="options" v-model="selectedClassification" @change="handleChange">
        </el-cascader>
      </el-col>

      <el-col :span="10">
        <span class="demonstration">库存：</span>
        <el-input-number label="库存：" v-model="form.inventory"></el-input-number>
      </el-col>
    </div>

    <div class="block">
      <el-col :span="10">
        <span class="demonstration">原价：</span>
        <el-input label="原价：" v-model="form.price"></el-input>
      </el-col>

      <el-col :span="10">
        <span class="demonstration">折后价：</span>
        <el-input label="折后价:" v-model="form.discountPrice"></el-input>
      </el-col>

    </div>

    <div class="main_image">
      主图：
      <el-upload action="admin/resources" name="fileName" list-type="picture-card" :on-preview="handleMajorPictureCardPreview" :on-remove="handleMajorRemove" :on-success="handleMajorSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <div class="detail_image">
      详细图：
      <el-upload action="admin/resources" name="fileName" list-type="picture-card"  :on-preview="handleMinorPictureCardPreview" :on-remove="handleMinorRemove" :on-success="handleMinorSuccess">
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
import { getAllClassification } from '../../../../api/admin/classifationApi'
import { saveGoods } from '../../../../api/admin/goodsApi'

export default {
  name: 'Goods',
  data () {
    return {
      title: '',
      dialogImageUrl: '',
      dialogVisible: false,
      selectedClassification: [],
      options: [],
      form: {
        name: '',
        description: '',
        majorImages: [],
        minorImages: [],
        inventory: 2,
        discountPrice: 50,
        price: 100,
        classificationId: []
      }
    }
  },

  watch: {
    selectedClassification: function (val) {
      this.form.classificationId = JSON.stringify(val)
    },
    title: function (val) {
      this.form.name = val
    }
  },

  created () {
    getAllClassification().then(res => {
      this.options = res.data.data[0].children
    })
  },
  methods: {
    handleMajorRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleMajorPictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleMinorRemove (file, fileList) {
      console.log(file, fileList)
    },

    handleMinorPictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleMajorSuccess (res, file, fileList) {
      this.form.majorImages.push(res.data.pkId)
      console.log(res)
    },

    handleMinorSuccess (res, file, fileList) {
      this.form.minorImages.push(res.data.pkId)
      console.log(res)
    },

    save () {
      this.$emit('ok')
      saveGoods(this.form)
      this.dialogVisible = false
    },

    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less">
@import "./index.less";

</style>
