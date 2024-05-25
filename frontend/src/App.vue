<template>
  <layout />
</template>

<script>
import Layout from './layout/Layout.vue'

export default {
  components: { Layout },
  name: 'App',
  setup() {
    document.getElementById('loadingPage').remove()
  }
}
</script>

<style lang="less">
body, html {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
