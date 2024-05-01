<template>
    <div class="container">
        <div class="area1">
            <table>
                <tbody>
                <tr v-for="(item, index) in image_data" :key="index">
                    <td>
                        <img class="radio-img" :src="item.image_url" alt="Image">
                    </td>
                    <td>
                        {{ item.tag }}
                    </td>
                    <td>
                        <input type="radio" :value="index" v-model="selected_image_index">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="area2">
            <div class="area2-head">
                当前选择: {{ selected_image_index }}  
            </div>
            <div class="area2-body">
                <img class="selected-img" :src="selected_image_url" alt="Image">
            </div>
        </div>
    </div>
  </template>
  
<script>
import ImageTable from './discarded/ImageTable.vue';
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';
import { eventBus } from "../utils/eventBus";

export default {
    components: { ImageTable },
    name: 'Radio',
    data() {
      return {
        image_data: [],
        // selected_image_url: "",
        selected_image_tag: "",          
        selected_image_index: 0
      }
    },
    mounted() {
        console.log("mounted: 组件已挂载");
        this.dbGetImages();
        console.log(this.image_data);
    },
    computed: {
        selected_image_url() {
            if (this.image_data.length <= 0) {
                return ""
            }
            this.emit(this.image_data[this.selected_image_index].image_url);
            return this.image_data[this.selected_image_index].image_url;
        }
    },
    methods: {
        dbGetImages() {
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
      emit(data) {
        console.log("触发emit: " + data);
        eventBus.emit('Radio.vue', data);
      }
    }
  }
</script>

<style scoped>
.container {
    display: flex;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #ffffff;
}

.area1 {
    flex: 1;
    height: 250px; /* 设置表格容器的最大高度 */
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;    
    margin-right: 1px;
    padding: 0 5px;
    background-color: rgb(205, 205, 205);
}

.area2 {
    flex: 1;
    height: 250px;
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    margin-left: 1px;
    padding: 5px;
}

.area2-head {
    height: 10%;
}

.area2-body {
    height: 90%;
    padding: 10px;
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    /* 以下三个属性使得area2-body变为弹性容器，且容器内容物水平垂直居中对齐 */
    display: flex;
    align-items: center;
    justify-content: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    background-color: #ffffff;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

img {
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.radio-img {
    height: 50px;
    width: 50px;

}

.selected-img {
    max-height: 95%;
    max-width: 95%;
    transition: 0.3s;
}

.selected-img:hover {
    max-height: 100%;
    max-width: 100%;
    transition: 0.3s;
}

.selected-img:active {
    max-height: 80%;
    max-width: 80%;
    transition: 0.3s;
}
</style>