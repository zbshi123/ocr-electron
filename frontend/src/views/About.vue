<template>
    <div>
      <!-- 
      <table-component />
      -->
      
      <invoke-python />
      <post-data />
      <picture-upload />
      <image-table />
    </div>
  </template>
  
  <script>
import InvokePython from '../components/InvokePython.vue'
import PictureUpload from '../components/PictureUpload.vue'
import PostData from '../components/PostData.vue'
import TableComponent from '../components/DynamicTable.vue'
import ImageTable from '../components/ImageTable.vue'
  export default {
    components: { TableComponent, InvokePython, PostData, PictureUpload, ImageTable },
    name: 'About',
    data() {
      return {
        title: 'About Page',
        content: 'This is the about page content.'
      }
    }
  }
  </script>
  