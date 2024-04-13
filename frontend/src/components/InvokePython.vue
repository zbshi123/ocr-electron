<template>
    <div class="container">
      <div class="one-block-1">
        <span>
          发送http请求
        </span>
      </div>  
      <div class="one-block-2">
        <a-space>
          <a-button @click="request(1)"> http请求发送 </a-button>
          <a-button @click="request(2)"> 主进程发送 </a-button>
        </a-space>
      </div>
      <div>
        <a-button @click="fetchOCR()">http请求发送2</a-button>
        <div v-if="loading">加载中...</div>
        <div v-if="responseData">{{ responseData }}</div>
      </div>
    </div>
  </template>
  <script>
  import { ipcApiRoute } from '@/api/main';
  import { ipc } from '@/utils/ipcRenderer';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        type: 1,
        serverUrl: "http://127.0.0.1:7074",
        responseData: "",
        loading: false,
        fetchData: ""
      };
    },
    methods: {
      info() {
        ipc.invoke(ipcApiRoute.crossInfo, {}).then(res => {
          console.log('res:', res);
        }) 
      },
      getUrl() {
        ipc.invoke(ipcApiRoute.getCrossUrl, {name: 'pyapp'}).then(url => {
          this.serverUrl = url;
          this.$message.info(`服务地址: ${url}`);
        }) 
      },
      kill() {
        // name参数是 进程对象上的name，这里仅作为参照
        ipc.invoke(ipcApiRoute.killCrossServer, {type: 'one', name: 'pyapp'})
      },
      killAll() {
        ipc.invoke(ipcApiRoute.killCrossServer, {type: 'all', name: 'pyapp'})
      },
      create() {
        ipc.invoke(ipcApiRoute.createCrossServer, { program: 'python' })
      },
      request(type) {
        if (type == 1 && this.serverUrl == "") {
          this.$message.info("请先获取服务地址");
          console.log(this.serverUrl);
          return
        }
        if (type == 1) {
          const testApi = this.serverUrl + '/api/hello';
          console.log(this.serverUrl);
          const cfg = {
            method: 'get',
            url: testApi,
            params: {},
            timeout: 1000,
          }
          axios(cfg).then(res => {
            console.log('res:', res);
            const data = res.data || null;
            this.$message.info(`服务返回: ${JSON.stringify(data)}`);
            this.$message.info("fdsfdsf");
          })
        } else {
          ipc.invoke(ipcApiRoute.requestApi, {name: 'pyapp', urlPath: '/api/hello'}).then(res => {
            console.log('res:', res);
            const data = res || null;
            this.$message.info(`服务返回: ${JSON.stringify(data)}`);
          }) 
        }
      },
      async fetchOCR() {
        try {
            this.loading = true;
            const testApi = this.serverUrl + '/api/hello';
            const response = await axios.get(testApi);
            this.responseData = response.data;
        } catch (error) {
            console.error('请求错误:', error);
        } finally {
            this.loading = false;
        }
      }    
    }
  };
  </script>
  <style lang="less" scoped>
    .container {
        border: 2px solid rgb(0, 0, 0);
        margin-bottom: 2px;  
        padding: 2px;
    }
  </style>