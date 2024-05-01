<template>
    <div>
      <post-data />
    </div>
  </template>
  
  <script>
import InvokePython from '../components/discarded/InvokePython.vue'
import PictureUpload from '../components/discarded/PictureUpload.vue'
import PostData from '../components/PostData.vue'
import TableComponent from '../components/DynamicTable.vue'
import ImageTable from '../components/discarded/ImageTable.vue'
  export default {
    components: { TableComponent, InvokePython, PostData, PictureUpload, ImageTable },
    name: 'Test2',
    data() {
      return {
      }
    }
  }
  </script>
  