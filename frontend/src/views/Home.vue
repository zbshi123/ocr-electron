<template>
    <div>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
      <input type="file" @change="handleFileUpload">
      <button @click="uploadFile">上传文件</button>

      <!-- 展示上传的图片 -->
    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" style="max-width: 300px; max-height: 300px;">
    </div>
</template>
  
<script>
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';


  export default {
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
        ipc.invoke(ipcApiRoute.test, [1,2,3]).then((result) => {
          console.log(result);
          alert(result);
        })
      }
    }
  }
</script>
  