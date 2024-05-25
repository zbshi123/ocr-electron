<template>
    <div class="view">
      <div style="padding-left:4px">
        <h2>识别图片</h2>   
      </div>
      <div class="body-area">
        <div class="left-area">
          <radio-vertical></radio-vertical>
        </div>
        <div class="right-area">
          <process-displayer></process-displayer>
        </div>        
      </div>
    </div>
</template>
  
<script>
import ProcessDisplayer from '../components/ProcessDisplayer.vue'
import Radio from '../components/Radio.vue'
import RadioVertical from '../components/RadioVertical.vue'
export default {
  components: {Radio, ProcessDisplayer, RadioVertical },
  name: 'Process',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.view {
  height: 100%;
}

.body-area {
  height: 90%;
  display: flex;
}

.left-area {
  height: 100%;
  width: 200px;
  margin-right: 10px;
}

.right-area {
  height: 100%;
  flex: 1;
}
</style>
  