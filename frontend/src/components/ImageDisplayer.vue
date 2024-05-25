<template>
    <div class="container">    
      <!-- 显示缩略图的容器 -->
      <div>
        本地数据库中的图片：{{ image_size }}
      </div>
      <hr class="hr">
      <div class="area2">
        <div v-if="image_data.length > 0">
        <div v-for="(image, index) in image_data" :key="index" class="thumbnail">
          <img :src="image.image_url" :alt="'Thumbnail ' + (index + 1)">
          <button @click="deleteImage(index)">删除</button> 
        </div>
        </div>
      </div>
  </div>
  </template>
  
  <script>
  import { ipcApiRoute } from '../api/main';
  import { ipc } from '../utils/ipcRenderer';
  export default {
    name: 'ImageDisplayer',
    data() {
      return {
        image_data: []
      }
    },
    mounted() {
        console.log("mounted: 组件已挂载");
        this.dbGetImages();
    },
    computed: {
        image_size() {
             // 将数组转换为字符串
            const dataAsString = JSON.stringify(this.image_data);
            // 计算字符串的字节长度
            const bytes = new Blob([dataAsString]).size;
            // 转换字节为更适合阅读的单位
            const kilobytes = bytes / 1024;
            const megabytes = kilobytes / 1024;
            return megabytes.toFixed(2) + ' MB'; // 返回占用内存大小
        }
    },
    methods: {
      deleteImage(index) {
        // this.image_data.splice(index, 1);
        // const delete_tag = this.image_data[index].tag;
        const id = this.image_data[index].id;
        this.dbDeleteImage(id);
      },
      jsonDbGetImages() {
        const params = {
          action: "getAllImageData"
        }
        // 调用json数据库操作
        ipc.invoke(ipcApiRoute.jsondbOperation, params).then(res => {
          console.log('res:', res);
          this.image_data = res.all_list;
          // this.$message.success(`success`);
          console.log(this.image_data);
        }) 
      },
      jsonDbDeleteImage(delete_tag) {
        const params = {
          action: "delByTag",
          delete_tag: delete_tag
        }
        // 调用json数据库操作
        try {
            ipc.invoke(ipcApiRoute.jsondbOperation, params).then(res => {
            console.log('res:', res);
            this.image_data = res.all_list;
            this.$message.success(`success`);
            console.log(this.image_data);
            })   
        } catch (error) {
            console.log("删除错误" + error);
        }
      },
      dbGetImages() {
        const params = {
          function_name: "getAllImages"
        }
        // 调用sqlite数据库操作
        ipc.invoke(ipcApiRoute.sqlitedbOperation, params).then(res => {
          console.log('res:', res);
          this.image_data = res.all_list;
          // this.$message.success(`success`);
          console.log(this.image_data);
        }) 
      },
      dbDeleteImage(id) {
        const params = {
          function_name: "deleteImageById",
          id: id
        }
        // 调用json数据库操作
        try {
          ipc.invoke(ipcApiRoute.sqlitedbOperation, params).then(res => {
            console.log('res:', res);
            this.image_data = res.all_list;
            this.$message.success(`success`);
            console.log(this.image_data);
          })   
        } catch (error) {
            console.log("删除错误" + error);
        }
      }
    },
  };
  </script>
  
<style lang="less" scoped>
.container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #ffffff;
}

.area1 {
  background-color: #ffffff;
  border: 1px solid rgb(0, 0, 0);
  margin-bottom: 10px;
  padding: 2px;
}

.hr {
  // 设置分割线样式
  border: 0;
  padding-top: 1px;
  background: repeating-linear-gradient(to right, #a2a9b6 0 var(--dashed-filled, 4px), transparent 0 calc(var(--dashed-filled, 4px) + var(--dashed-open, 6px)));
}

.area2 { 
  background-color: #ffffff;
  max-height: 244px; /* 设置表格容器的最大高度 */
  overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
  padding: 2px;
}


.thumbnail {
  display: inline-block;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgba(99, 99, 99, 0.2);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.5s;
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