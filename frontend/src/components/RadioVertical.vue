<template>
    <div class="container">
        <div class="area1">
            <div class="area2-head">
                当前选择: {{ selected_image_index }}  
            </div>
            <div class="area2-body">
                <img class="selected-img" :src="selected_image_url" alt="Image"  @click="showModal = true">
            </div>

            <!-- 使用条件渲染显示弹窗 -->
            <div v-if="showModal" class="modal-overlay">
                <div class="modal">
                    <!-- 显示放大后的图片 -->
                    <img :src="selected_image_url" alt="Full Size Image">
                    <!-- 关闭按钮 -->
                    <button @click="closeModal">关闭</button>
                </div>
            </div>
        </div>

        <div class="area2">
            <table>
                <tbody>
                <tr v-for="(item, index) in image_data" :key="index">
                    <td>
                        <img class="radio-img" :src="item.image_url" alt="Image">
                    </td>
                    <td>
                        <input type="radio" :value="index" v-model="selected_image_index">
                    </td>
                </tr>
                </tbody>
            </table>
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
    name: 'RadioVertical',
    data() {
      return {
        image_data: [],
        // selected_image_url: "",
        selected_image_tag: "",          
        selected_image_index: 0,
        showModal: false, // 是否显示预览图
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
        // 关闭弹窗
        closeModal() {
            this.showModal = false;
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
        emit(data) {
            // console.log("触发emit: " + data);
            eventBus.emit('RadioVertical.vue', data);
        }
    }
  }
</script>

<style scoped>
.container {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
}


.area1 {
    height: 220px;
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    background-color: rgb(230, 230, 230);
    margin-bottom: 10px;
    height: calc(20% - 10px);
}

.area2 {
    height: 220px; /* 设置表格容器的最大高度 */
    overflow-y: auto; /* 当内容超出容器高度时显示滚动条 */
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px; 
    background-color: rgb(230, 230, 230);
    height: 80%;
}


.area2-head {
    height: 20%;
}

.area2-body {
    height: 80%;
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
    transition: 0.2s;
}

.selected-img:hover {
    max-height: 100%;
    max-width: 100%;
    box-shadow: rgba(255, 251, 0, 0.575) 0px 3px 16px;
    transition: 0.2s;
}

.selected-img:active {
    max-height: 80%;
    max-width: 80%;         
    transition: 0.2s;
}

/* 弹窗的样式 */
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
    padding-right: 10px;
    border-radius: 5px;
}

.modal img {
    max-width: 100%;
    max-height: 80vh;
}

.modal button {
    margin-left: 10px;
}
</style>