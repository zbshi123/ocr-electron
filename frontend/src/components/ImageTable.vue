<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>图片</th>
            <th>文字信息</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td><img :src="item.imageUrl" alt="图片"></td>
            <td>{{ item.text }}</td>
            <td>
              <button @click="识别(index)">识别</button>
              <button @click="查看(index)">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' },
          { imageUrl: 'path/to/image1.jpg', text: '这是图片1的文字信息' },
          { imageUrl: 'path/to/image2.jpg', text: '这是图片2的文字信息' },
          { imageUrl: 'path/to/image3.jpg', text: '这是图片3的文字信息' }
        ]
      };
    },
    methods: {
      识别(index) {
        // 实现识别操作
        console.log('识别图片' + index);
      },
      查看(index) {
        // 实现查看操作
        console.log('查看图片' + index);
      },
    }
  };
  </script>
  
<style scoped>
.table-container {
    max-height: 300px; /* 设置表格容器的最大高度 */
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    margin-right: 5px;
}
</style>
  