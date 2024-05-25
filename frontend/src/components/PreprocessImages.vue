<!--
    该组件用于展示预处理过程中产生的图片
-->
<template>
    <div class="preprocess-image-container">
        <div class="button-area">
          <button @click="fetchProcessImages()">获取处理过程图片</button>   
        </div>
        <div class="image-area">
          <div class="image-boxes" v-for="(item, index) in image_url_list" :key="index">
            <div class="image-text">
              {{ item.name }}
            </div>
            <div class="image-box">
              <img :src="item.image_url" alt="Image">
            </div>
          </div>
        </div>
    </div>
</template>
  
<script>
import { eventBus } from "../utils/eventBus";
import axios from 'axios';
export default {
  components: {},
  name: 'PreprocessImages',
  data() {
    return {
      server_url: "http://127.0.0.1:7074",
      image_url: "",
      gray_image_url: "",
      binary_image_url: "",
      image_url_list: []
    }
  },
  mounted() {
    // 监听radio-vertical组件的事件
    eventBus.on("RadioVertical.vue", (data) => {
        // console.log("PreprocessImages.vue监听on: " + data);
        this.image_url = data;
    });
  },
  methods: {
    fetchProcessImages() {
      console.log("fetch");
      // 要发送的数据
      if (this.image_url == "") {
        this.$message.error("请先选择一张图片");
        return;
      }
      const data = { key: this.image_url };
      const postApi = this.server_url + "/api/fetch_process_images";
      // 发送 POST 请求
      axios.post(postApi, data).then(res => {
          const response = res.data;
          console.log("post success: " + JSON.stringify(response));
          console.log("post response_data: " + response.response_data);
          let list = response.response_data;
          for (let i = 0; i < list.length; i++) {
            console.log("打印名字: ", list[i].name);
            // console.log("打印url: ", list[i].image_url);
          }
          this.image_url_list = list;
          this.$message.success("请求处理成功");
      }).catch(error => {
          console.log("发送请求错误：" , error);
          this.$message.error("请求处理错误");
      })
    },
  },
}
</script>

<style scoped>
.preprocess-image-container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
}

.button-area {
  margin-bottom: 10px;
}

.image-area {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}

.image-boxes {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.image-box {
  max-height: 150px;
  max-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-box img {
  border-radius: 3px;
  transition: 0.2s;
  max-width: 150px;
  max-height: 150px;
}
</style>