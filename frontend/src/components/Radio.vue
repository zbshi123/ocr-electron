<template>
    <div class="container">
        <div class="area1">
            <table>
                <tbody>
                <tr v-for="(item, index) in image_data" :key="index">
                    <td>
                        <img :src="item.image_url" alt="Image" style="width: 50px; height: 50px;">
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
                <img :src="selected_image_url" alt="Image" style="max-width: 100%; max-height: 100%;">
            </div>
        </div>
    </div>
  </template>
  
<script>
import ImageTable from '../components/ImageTable.vue';
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
    border: 1px solid rgb(0, 0, 0);
    padding: 5px;
}

.area1 {
    flex: 1;
    height: 250px; /* 设置表格容器的最大高度 */
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgb(0, 0, 0);
    margin-right: 1px;
}

.area2 {
    flex: 1;
    height: 250px;
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgb(0, 0, 0);
    margin-left: 1px;
}

.area2-head {
    height: 10%;
}

.area2-body {
    height: 90%;
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
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>