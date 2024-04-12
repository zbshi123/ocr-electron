<template>
    <div>
      <a-button @click="sendData">点击发送数据</a-button>
      <div v-if="loading">发送中...</div>
      <div v-if="response">{{ response }}</div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const loading = ref(false);
      const response = ref(null);
  
      // 发送数据的方法
      const sendData = async () => {
        try {
          loading.value = true;
          // 要发送的数据
          const data = { key: 'value' }; // 根据需要替换为你的数据
          // 发送 POST 请求
          const res = await axios.post('http://127.0.0.1:7074/api/post_data', data);
          response.value = res.data;
        } catch (error) {
          console.error('发送请求错误:', error);
        } finally {
          loading.value = false;
        }
      };
  
      return {
        loading,
        response,
        sendData
      };
    }
  };
  </script>
  
  <style>
  /* 可选：添加样式 */
  </style>
  