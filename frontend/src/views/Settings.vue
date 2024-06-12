<template>
  <div>
    <div style="padding-left:4px">
      <h2>设置</h2>
      <directory></directory>
      <br>
      <test></test>
    </div>
  </div>
</template>
  
<script>
import SqliteDb from '../components/discarded/SqliteDb.vue'
import Directory from '../components/settings/Directory.vue'
import Test from '../components/test/Test.vue'
export default {
  components: {SqliteDb, Directory, Test },
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