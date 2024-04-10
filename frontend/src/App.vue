<template>
  <div id="window">
    <SideBar />
    <MainContent />
  </div>
</template>

<script>

import MainContent from './layout/MainContent.vue'
import SideBar from './layout/SideBar.vue'

export default {
  components: { SideBar, MainContent },
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

#window {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: #d5dbd5;
}
</style>
