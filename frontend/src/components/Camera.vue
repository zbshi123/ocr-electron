<template>
  <div class="container">
    <div class="area1">
      <div class="button-area">
        <button id="button1" @click="toggleCamera">{{ isCameraOn ? '关闭相机' : '开启相机' }}</button>
        <button id="button2" @click="takePicture" :disabled="!isCameraOn">截取照片</button>
        <button id="button3" @click="uploadFile">上传照片</button>

      </div>
      <div class="video-area">
        <video ref="video" autoplay></video>
      </div>        
    </div>
    <div class="line"></div>
    <div class="area2">
      <div v-if="thumbnails.length > 0">
        <div v-for="(thumbnail, index) in thumbnails" :key="index" class="thumbnail">
          <img :src="thumbnail.url" :alt="'Thumbnail ' + (index + 1)">
          <button @click="removeThumbnail(index)">取消</button> 
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';
  export default {
    name: 'Camera',
    mounted() {
      //this.startCamera();
    },
    data() {
      return {
        isCameraOn: false,
        videoStream: null,
        imageUrl: '',
        thumbnails: [], // { url: e.target.result, file }
        all_list: []
      };
    },
    methods: {
      async startCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.video.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      },

      async toggleCamera() {
        if (!this.isCameraOn) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.$refs.video.srcObject = stream;
            this.isCameraOn = true;
            this.videoStream = stream;
          } catch (error) {
            console.error('Error accessing camera:', error);
          }
        } else {
          if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.$refs.video.srcObject = null;
            this.isCameraOn = false;
          }
        }
      },
      takePicture() {
        const canvas = document.createElement('canvas');
        canvas.width = this.$refs.video.videoWidth;
        canvas.height = this.$refs.video.videoHeight;
        canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
        this.imageUrl = canvas.toDataURL('image/png');
        this.thumbnails.push({url: this.imageUrl});
      },
      removeThumbnail(index) {
        this.thumbnails.splice(index, 1);
      },
      generateTag(number) {
        // 获取当前时间的时间戳（毫秒级）
        const timestamp = new Date().getTime();
        // 生成标签字符串
        const tag = `${timestamp}-${number}`;

        return tag;
      },
      jsonDbAddImage(tag, url) {
        const params = {
          action: "add",
          image: {
            tag: tag,
            image_url: url
          }
        }
        // 调用json数据库操作
        ipc.invoke(ipcApiRoute.jsondbOperation, params).then(res => {
          console.log('res:', res);
          this.all_list = res.all_list;
          this.$message.success(`success`);
          console.log(this.all_list);
        }) 
      },
      dbAddImage(description, url) {
        const params = {
          function_name: "addImage",
          image: {
            description: description,
            image_url: url
          }
        }
        // 调用sqlite数据库操作
        ipc.invoke(ipcApiRoute.sqlitedbOperation, params).then(res => {
          console.log('res:', res);
          this.all_list = res.all_list;
          this.$message.success(`success`);
          console.log(this.all_list);
        }) 
      },
      uploadFile() {
        if (this.thumbnails.length <= 0) {
          alert("请先拍摄照片");
          return;
        }

        // 执行文件上传的逻辑，比如发送文件到服务器等
        console.log("上传文件:", this.thumbnails);
        // 这里可以编写上传文件的代码，比如使用 axios 发送文件到服务器等
        try {
          for (let i = 0; i < this.thumbnails.length; i++) {
            let tag = this.generateTag(i);
            let url = this.thumbnails[i].url;
            this.dbAddImage(tag, url);
          }
        } catch (error) {
          console.error('错误:', error);
        } finally {
          window.location.reload();
        }
      },
    }
  }
  </script>
  
<style scoped>
.container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  height: 180px;
  background-color: #ffffff;
}

.area1 {
  flex: 2;
  background-color: #ffffff;
  height: 150px;
  display: flex;
  flex-direction: column;
}

.button-area {
  height: 25px;
  margin-bottom: 5px;
  display: flex;
}

.button-area button {
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
}

#button1 {
  margin-left: 0px;
}

#button3 {
  margin-right: 0px;
}

.video-area {
  height: 120px;
  background-color: #ffffff;
}

.line {
  width: 0px;
  border-left: 1px dashed rgba(0, 0, 0, 0.34);
  border-right: 1px dashed rgba(0, 0, 0, 0.34);
  margin: 0 5px; /* 设置分割线左右间距 */
}

.area2 {
  flex: 3;
  background-color: #ffffff;
  height: 150px; /* 设置表格容器的最大高度 */
  overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
  padding: 2px;
}

video {
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  background-color: rgb(205, 205, 205);
  width: 100%;
  height: 100%;
}

.thumbnail {
  display: inline-block;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.thumbnail:hover {
  border: 1px solid rgba(0, 0, 0, 0.24);
  background-color: rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}

img {
  width: 100px;
  height: 100px; /* 设置缩略图大小为100px x 100px */
  border-radius: 5px;
  margin-right: 10px;
  object-fit: cover;
}
</style>
  