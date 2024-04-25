<template>
    <div>
      <input type="file" @change="handleFileUpload">
      <button @click="uploadFile">上传图片</button>
      <div class="area1">
        <div class="area2-left">
          <!-- 展示上传的图片 -->
          <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image">

        </div>
        <div class="area2-right">
          fds
        </div>
      </div>
      
      <camera/>
    </div>
    
</template>
  
<script>
import { ipcApiRoute } from '../api/main';
import Camera from '../components/Camera.vue';
import JsonDb from '../components/JsonDb.vue';
import { ipc } from '../utils/ipcRenderer';

export default {
  components: { Camera, JsonDb },
  name: 'Home',
  data() {
    return {
      title: 'Home Page',
      content: 'This is the home page content.',
      file: null, // 存储上传的文件
      imageUrl: null // 存储上传的图片 URL
    }
  },
  methods: {
    handleFileUpload(event) {
      // 获取上传的文件
      this.file = event.target.files[0];
      // 使用 FileReader 将文件转换为 Data URL
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result; // 将 Data URL 赋值给 imageUrl
        console.log(this.imageUrl);
      };
    },
    uploadFile() {
      if (!this.file) {
        alert("请先选择文件");
        return;
      }

      // 执行文件上传的逻辑，比如发送文件到服务器等
      console.log("上传文件:", this.file);
      // 这里可以编写上传文件的代码，比如使用 axios 发送文件到服务器等
      ipc.invoke(ipcApiRoute.imgResolve, [this.imageUrl]).then((result) => {
        console.log(result);
        alert(result);
      })
    }
  }
}
</script>
  
<style scoped>
  .area1 {
    height: 100%;
    width: 100%;
    background-color: #bd1818;;
    display: flex;
    align-items: center; /* 在交叉轴上居中对齐 */
    justify-content: space-between; /* 在主轴上均匀分布，首尾不留间隔 */
  }

  .area2-left {
    flex:1; /*flex指定元素在flexbox中的伸缩比例 */
    height:300px;
    background-color: #5f719e;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area2-right {
    flex: 1;
    height:300px;
    background-color: aquamarine;
  }

  img {
    max-width: 300px;
    max-height: 300px;
  }
</style>