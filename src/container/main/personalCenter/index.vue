<template>
    <div class="personCenter">
        <SiteNav></SiteNav>
        <el-container>
            <el-aside style="width: 100%;">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">
                        <router-link to="/admin/classification">
                            我的资料
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/shoppingCart">
                            我的购物车
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <router-link to="/my/deliverAddress">
                            收获地址
                        </router-link>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main style="width: 100%;">
                <Panel>
                    <router-view slot="content"></router-view>
                </Panel>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import SiteNav from '../../../components/SiteNav/index'
import Panel from '@/components/Panel/index.vue'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  components: {
    SiteNav: SiteNav,
    Panel: Panel
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  flex-direction: column;
  width: 1000px;
  text-align: center;
  margin: 0 auto;
}
</style>
