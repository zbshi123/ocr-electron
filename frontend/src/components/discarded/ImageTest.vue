<template>
    <div>
      <!-- 点击图片触发显示弹窗 -->
      <img :src="thumbnail" @click="showModal = true" alt="Thumbnail Image">
      
      <!-- 使用条件渲染显示弹窗 -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <!-- 显示放大后的图片 -->
          <img :src="fullSize" alt="Full Size Image">
          <!-- 关闭按钮 -->
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
        thumbnail: 'path/to/thumbnail.jpg',
        fullSize: 'path/to/fullsize.jpg'
      };
    },
    methods: {
      // 关闭弹窗
      closeModal() {
        this.showModal = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可根据需要进行定制 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  
  .modal img {
    max-width: 100%;
    max-height: 80vh;
  }
  
  .modal button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .modal button:hover {
    background-color: #0056b3;
  }
  </style>