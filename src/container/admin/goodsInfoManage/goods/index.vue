<template>
  <div class="goods">
    <div class="title">
      <span class="text">商品标题:</span>
      <el-input :disabled="disabled" width="100px;" v-model="form.name" placeholder="请输入商品标题"></el-input>
    </div>

    <div class="description">
      <span class="text">商品描述:</span>
      <el-input :disabled="disabled" type="textarea" :row="2" v-model="form.description">
      </el-input>
    </div>

    <div class="block">
      <el-col :span="10">
        <span class="demonstration">分类：</span>
        <el-cascader :disabled="disabled" :options="options" v-model="selectedClassification" @change="handleChange">
        </el-cascader>
      </el-col>

      <el-col :span="10">
        <span class="demonstration">库存：</span>
        <el-input-number :disabled="disabled" label="库存：" v-model="form.inventory"></el-input-number>
      </el-col>
    </div>

    <div class="block">
      <el-col :span="10">
        <span class="demonstration">原价：</span>
        <el-input :disabled="disabled" label="原价：" v-model="form.price"></el-input>
      </el-col>

      <el-col :span="10">
        <span class="demonstration">折后价：</span>
        <el-input label="折后价:" :disabled="disabled" v-model="form.discountPrice"></el-input>
      </el-col>

    </div>

    <div class="main_image">
      主图：
      <el-upload action="admin/resources" name="fileName"
        :disabled="disabled"
        list-type="picture-card"
        :on-preview="handleMajorPictureCardPreview"
        :on-remove="handleMajorRemove"
        :on-success="handleMajorSuccess"
        :file-list="majorImages"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <div class="detail_image">
      详细图：
      <el-upload action="admin/resources"
        :disabled="disabled"
        name="fileName"
        list-type="picture-card"
        :on-preview="handleMinorPictureCardPreview"
        :on-remove="handleMinorRemove"
        :on-success="handleMinorSuccess"
        :file-list="minorImages"
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
import { getAllClassification } from '../../../../api/admin/classifationApi'
import { saveGoods } from '../../../../api/admin/goodsApi'

export default {
  name: 'Goods',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      selectedClassification: [],
      majorImages: [],
      minorImages: [],
      options: [],
      form: {
        pkId: '',
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

  props: ['displayType', 'goods'],

  computed: {
    disabled: function () {
      return this.displayType === 2
    }
  },

  watch: {
    selectedClassification: function (val) {
      this.form.classificationId = JSON.stringify(val)
    },
    displayType: function () {
      this.mount()
    },
    goods: function (val) {
      this.mount()
    },
    majorImages: function (val) {
    }
  },

  created () {
    getAllClassification().then(res => {
      this.options = res.data.data[0].children
    })
  },

  methods: {
    mount () {
      const form = Object.assign({}, this.form, this.goods.goods)
      this.selectedClassification = JSON.parse(this.goods.goods.classificationId)
      form.majorImages = this.goods.majorImages
      form.minorImages = this.goods.minorImages

      this.changeForm(form)

      const majorImages = this.form.majorImages.map(item => {
        return { url: 'http://' + item.path }
      })

      const minorImages = this.form.minorImages.map(item => {
        return { url: 'http://' + item.path }
      })

      this.changeImages(majorImages, minorImages)
    },
    changeImages (majorImages, minorImages) {
      this.majorImages = majorImages
      this.minorImages = minorImages

      this.form.majorImages = majorImages
      this.form.minorImages = minorImages
    },
    changeForm (form) {
      this.form = form
    },
    handleMajorRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleMajorPictureCardPreview (file) {
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
      const majorImages = JSON.parse(JSON.stringify(this.majorImages))
      majorImages.push({ pkId: res.data.pkId, url: 'http://' + res.data.path, status: 'success' })

      this.changeImages(majorImages, this.minorImages)
    },

    handleMinorSuccess (res, file, fileList) {
      const minorImages = JSON.parse(JSON.stringify(this.minorImages))
      minorImages.push({ pkId: res.data.pkId, url: 'http://' + res.data.path })

      this.changeImages(this.majorImages, minorImages)
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
