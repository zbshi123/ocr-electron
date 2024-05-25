<template>
  <div>
    <div style="padding-left:4px">
      <h2>设置</h2>
      <sqlite-db></sqlite-db>
    </div>
  </div>
</template>
  
<script>
import SqliteDb from '../components/discarded/SqliteDb.vue'
export default {
  components: {SqliteDb },
  name: 'Settings',
  data() {
    return {

    }
  },
  methods: {
  
  }
}
</script>
  
<style scoped>
  
</style>