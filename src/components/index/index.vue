<template>
  <div>
    <el-container>
      <el-header></el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>基本管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/user">
                  <el-menu-item index="1-1">用户管理</el-menu-item>
                </router-link>
                <router-link to="/admin/classification">
                  <el-menu-item index="1-2">分类管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/goods">
                  <el-menu-item index="3-1">商品信息</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <panel>
            <router-view slot="content"></router-view>
          </panel>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Panel from '@/components/Panel/index.vue'

export default {
  data () {
    return {}
  },
  components: { panel: Panel },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.el-header {
  background: #5f606b;
}
</style>
