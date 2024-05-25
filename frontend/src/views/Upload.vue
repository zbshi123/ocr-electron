<template>
  <div class="view">
    <div style="padding-left:4px">
      <h2>上传图片或照片</h2>   
    </div>
    <div class="radio-box">
      <input class="radio-input" type="radio" id="fileUpload" value="file" v-model="uploadMode">
      <label class="radio-label" for="fileUpload">文件上传</label>
      <input class="radio-input" type="radio" id="cameraUpload" value="camera" v-model="uploadMode">
      <label class="radio-label" for="cameraUpload">拍照上传</label>
    </div>
    <camera v-if="uploadMode === 'camera'"></camera>  
    <image-uploader v-if="uploadMode === 'file'"></image-uploader>
    <br>
    <image-displayer />
  </div>
</template>
  
<script>
import PictureUpload from '../components/discarded/PictureUpload.vue';
import ImageUploader from '../components/ImageUploader.vue';
import ImageDisplayer from '../components/ImageDisplayer.vue';
import Camera from '../components/Camera.vue';
export default {
  components: { PictureUpload, ImageUploader, ImageDisplayer, Camera },
  name: 'Upload',
  data() {
    return {
      uploadMode: "file",
    }
  }
}
</script>

<style scoped>
.view {
  height:100%;
}

.radio-box {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding-left: 4px;
}

.radio-input {
  margin-right: 3px;
}

.radio-label {
  margin-right: 10px;
}


</style>