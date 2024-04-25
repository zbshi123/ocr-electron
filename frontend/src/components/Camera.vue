<template>
    <div class="camera">
      <div class="button-area">
        <button @click="toggleCamera">{{ isCameraOn ? '关闭摄像头' : '开启摄像头' }}</button>
        <button @click="takePicture" :disabled="!isCameraOn">截取图片</button>
      </div>
      <div class="display-area">
        <div class="video-area">
          <video ref="video" autoplay></video>
        </div>
        <div class="img-area">
          <img v-if="imageUrl" :src="imageUrl" alt="Captured Image">
        </div>
      </div>
      
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'Camera',
    mounted() {
      //this.startCamera();
    },
    data() {
      return {
        isCameraOn: false,
        videoStream: null,
        imageUrl: ''
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
      }
    }
  }
  </script>
  
  <style scoped>
  .camera {

  }
  
  .display-area {
    display: flex;
  }

  .video-area {
    flex: 1;
    height: 100px;
    background-color: #a46565;
  }

  .img-area {
    flex: 1;
    height: 100px;
    background-color: #aec1a1;
  }

  video {
    max-width: 100%;
    max-height: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  