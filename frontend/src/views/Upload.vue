<template>
    <div>
    <!--
     <camera />
      <br>     
     -->
           
      <image-uploader />
      <br>
      <image-displayer />
    </div>
  </template>
  
  <script>
import PictureUpload from '../components/PictureUpload.vue';
import ImageUploader from '../components/ImageUploader.vue';
import ImageDisplayer from '../components/ImageDisplayer.vue';
import Camera from '../components/Camera.vue';
  export default {
    components: { PictureUpload, ImageUploader, ImageDisplayer, Camera },
    name: 'Upload',
    data() {
      return {

      }
    }
  }
  </script>