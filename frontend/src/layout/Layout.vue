<template>
    <div id="window">
      <SideBar />
      <div class="main-content">
        <MainContent /> 
      </div>
    </div>
</template>
  
<script>

import MainContent from './MainContent.vue'
import SideBar from './SideBar.vue'

export default {
    components: { SideBar, MainContent },
    name: 'Layout',
}
</script>

<style lang="less" scoped>
#window {
  display: flex;
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.main-content {
  flex: 1;
  padding: 10px;
  margin-left: 150px;
  background-color: #fcfbef;
  min-height: 100%;
}
</style>