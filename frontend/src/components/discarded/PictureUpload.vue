<template>
    <div class="container">
      <input type="file" @change="handleFileUpload">
      <a-button @click="uploadFile">上传图片</a-button>
      <div class="area1">
        <div class="area1-left">
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image">

        </div>
        <div class="area1-right">
            <img v-if="processedImageUrl" :src="processedImageUrl" alt="Uploaded Image">
        </div>
      </div>
      <div class="area2">
        <div v-if="loading">发送中...</div>
      </div>
    </div>
    
</template>

<script>
import { ipcApiRoute } from '../../api/main';
import { ipc } from '../../utils/ipcRenderer';
import axios from 'axios';

export default {
  components: {  },
  name: 'PictureUpload',
  data() {
    return {
      file: null, // 存储上传的文件
      imageUrl: null, // 存储上传的图片 URL
      processedImageUrl: null, // 存储处理后的图片
      loading: false,
      response: null,
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
      try {
          this.loading = true;
          // 要发送的数据
          const data = { key: this.imageUrl }; // 根据需要替换为你的数据
          // 发送 POST 请求
          axios.post('http://127.0.0.1:7074/api/post_data', data).then(res => {
                console.log(res);
                this.response = JSON.stringify(res);
                this.processedImageUrl = this.imageUrl;
          });
         
        } catch (error) {
          console.error('发送请求错误:', error);
        } finally {
          this.loading = false;
        }
    },
    uploadFileByIPC() {
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
    },
  }
}
</script>


<style scoped>
    .container {
      border: 2px solid rgb(0, 0, 0);
      margin-bottom: 2px;
      padding: 2px;    
    }

  .area1 {
    height: 100%;
    width: 100%;
    background-color: #bd1818;;
    display: flex;
    align-items: center; /* 在交叉轴上居中对齐 */
    justify-content: space-between; /* 在主轴上均匀分布，首尾不留间隔 */
  }

  .area1-left {
    flex:1; /*flex指定元素在flexbox中的伸缩比例 */
    height:300px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area1-right {
    flex: 1;
    height:300px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 300px;
    max-height: 300px;
  }
</style>