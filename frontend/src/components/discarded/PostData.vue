<template>
    <div class="container">
      <a-button @click="sendData">点击发送数据</a-button>
      <div v-if="loading">发送中...</div>
      <div v-if="response">{{ response }}</div>
      <button @click="generateXLSX">generateXLSX</button>
    </div>
  </template>
  
<script>
import { ref } from 'vue';
import axios from 'axios';
import { ipcApiRoute } from '../../api/main';
import { ipc } from '../../utils/ipcRenderer';
  
export default {
  name: 'PostData',
  data() {
    return {
    }
  },
  methods: {
    generateXLSX() {
        const params = {
          
        }
        // 通过ipc调用electron业务层
        ipc.invoke(ipcApiRoute.generateXLSX, params).then(res => {
          console.log('res:', res);
      }) 
    },
  },

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
  },
};
</script>

<style scoped>
.container {
      border: 2px solid rgb(0, 0, 0);
      margin-bottom: 2px;
      padding: 2px;    
  }
</style>
  