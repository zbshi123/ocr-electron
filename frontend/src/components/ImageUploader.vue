<template>
  <div class="container">
    <!-- 输入框用于选择图片 -->
    <div class="area1">
      <!--
        使用label标签代替input标签，实现样式替换
      -->    
      <label for="submit">

         <div class="label-button">选择文件</div>    
      </label>
      <input id ="submit" style="display: none" type="file" @change="handleFileChange" multiple accept="image/*">
      <button @click="uploadFile">上传图片</button>
    </div>
    <hr class="hr">
    <!-- 显示缩略图的容器 -->
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
  name: 'ImageUploader',
  data() {
    return {
      thumbnails: [], // { url: e.target.result, file }
      all_list: []
    }
  },
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const reader = new FileReader();
        reader.onload = (e) => {
          //this.thumbnails.value.push({ url: e.target.result, file });
          this.thumbnails.push({ url: e.target.result, file });
          console.log(this.thumbnails);
        };
        reader.readAsDataURL(file);
      }
    },
    removeThumbnail(index) {
      this.thumbnails.splice(index, 1);
    },
    uploadFile() {
      if (this.thumbnails.length <= 0) {
        alert("请先选择文件");
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
          console.error('发送请求错误:', error);
        } finally {
          window.location.reload();
        }
    },
    dbAddImage(tag, url) {
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
    generateTag(number) {
      // 获取当前时间的时间戳（毫秒级）
      const timestamp = new Date().getTime();
      // 生成标签字符串
      const tag = `${timestamp}-${number}`;

      return tag;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 180px;
  background-color: #ffffff;
}

.area1 {
  background-color: #ffffff;
  margin-bottom: 2px;
  padding: 2px;
}

.hr {
  border: 0;
  padding-top: 1px;
  background: repeating-linear-gradient(to right, #a2a9b6 0 var(--dashed-filled, 4px), transparent 0 calc(var(--dashed-filled, 4px) + var(--dashed-open, 6px)));
}

.label-button {
  margin-right: 10px;
}

.area2 { 
  background-color: #ffffff;
  height: 120px; /* 设置表格容器的最大高度 */
  overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
  padding: 2px;
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