<template>
<div>
  <el-card class="box-card">
    <slot name="content"></slot>
  </el-card>
  </div>
</template>

<script>
  export default {
      name: 'panel'
  }
</script>
