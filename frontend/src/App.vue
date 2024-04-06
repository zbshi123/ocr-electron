<template>
  <div id="app">
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
  margin: 0px;
  padding: 0px;
}

#app {
  display: flex;
  height: 100%;
  background-color: #a8a1a1;
}
</style>
