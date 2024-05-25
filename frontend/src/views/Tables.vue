<template>
    <div class="view">
        <div style="padding-left:4px">
          <h2>管理表格</h2>   
        </div>
        <div class="body-area">
          <table-paginated-list></table-paginated-list> 
        </div>

    </div>
</template>
  
<script>
import TableManager from '../components/TableManager.vue'
import TablePaginatedList from '../components/TablePaginatedList.vue'
export default {
  components: {TableManager, TablePaginatedList},
  name: 'Tables',
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
}
</style>