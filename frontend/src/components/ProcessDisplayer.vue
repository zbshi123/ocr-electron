<template>
    <div class="container">
        <div class="button-area">
            <button @click="postImageUrl()">发送图像</button>  
            <button @click="this.enableEdit = !this.enableEdit">{{ enableEdit? "关闭表格编辑" : "启用表格编辑" }}</button>
            <!--
            <button @click="generateXLSX()">生成表格文件</button>                
            -->
            <button @click="saveTableData()">保存表格</button>
        </div>
        <div class="display-area">
            <label for="">表格名称:</label>
            <br>
            <input class="wide-input" type="text" v-model="tableData.name">
            <br>
            <label for="">表格描述:</label>
            <textarea v-model="tableData.description"  rows="3"></textarea>
            <dynamic-table :data="tableData"/>
            
            <div class="edit-area" v-if="enableEdit">
                <table>
                    <tbody>
                    <tr v-for="(item, index) in tableData.cells" :key="index">
                        <td>
                            单元格内容：
                            <input type="text" v-model="tableData.cells[index].content">
                        </td>                   
                        <td>  
                            <tr>
                                <td>
                                    左:
                                    <input type="text" v-model="tableData.cells[index].left">
                                </td>
                                <td>
                                    右:
                                    <input type="text" v-model="tableData.cells[index].right">    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    上:
                                    <input type="text" v-model="tableData.cells[index].top">
                                </td>
                                <td>
                                    下:
                                    <input type="text" v-model="tableData.cells[index].bottom">  
                                </td>
                            </tr>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="preprocess-images-area">
                <preprocess-images></preprocess-images>
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import DynamicTable from './DynamicTable.vue';
import {eventBus} from '../utils/eventBus';
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';
import PreprocessImages from './PreprocessImages.vue';

export default {
    components: {DynamicTable, PreprocessImages},
    name: 'TableDisplayer',
    mounted() {
        // 监听radio-vertical组件的事件
        eventBus.on("RadioVertical.vue", (data) => {
            // console.log("监听on: " + data);
            this.image_url = data;
        });
    },
    computed: {
        tableDataForTextArea: {
            get() {
                return JSON.stringify(this.tableData);
            },
            set(value) {
                const jsonString = value;
                try {
                    const obj = JSON.parse(jsonString);
                    this.tableData = obj;
                } catch {
                    const obj = null
                    this.$message.error("json格式错误");
                }
                console.log(obj);
            }
        }
    },
    methods: {
        async fetchOCR() {
            try {
                this.loading = true;
                const testApi = this.serverUrl + '/api/get_table';
                const response = await axios.get(testApi);
                this.responseData = response.data;
                console.log(this.responseData);
                console.log(this.responseData.message);
                var jsonObject = JSON.parse(this.responseData.message);
                console.log(jsonObject);
                this.tableData = jsonObject;
            } catch (error) {
                console.error('请求错误:', error);
            } finally {
                this.loading = false;
            }
        },
        postImageUrl() {
            // 要发送的数据
            const data = { key: this.image_url }; // 根据需要替换为你的数据
            // 发送 POST 请求
            axios.post('http://127.0.0.1:7074/api/post_data', data).then(res => {
                const response = res.data;
                console.log("post success: " + JSON.stringify(response));
                console.log("post response_data: " + response.response_data);
                var jsonObject = JSON.parse(response.response_data);
                this.tableData = jsonObject;
                console.log(this.tableData);
                this.$message.success("请求处理成功");
            }).catch(error => {
                console.log("发送请求错误：" , error);
                this.$message.error("请求处理错误");
            })
        },
        test(response_data) {
            this.tableData = response_data;
        },
        generateXLSX() {
            const params = JSON.stringify(this.tableData);
            console.log("test", params);
            // 通过ipc调用electron业务层
            ipc.invoke(ipcApiRoute.generateXLSX, params).then(res => {
                console.log('res:', res);
            });
        },
        saveTableData() {
            // 保存tableData到json数据库中
            const tableData = JSON.stringify(this.tableData);
            const params = {
                function_name: "addForm",
                tableData: tableData
            }
            ipc.invoke(ipcApiRoute.formDbOperation, params).then(res => {
                console.log("saveTableData(): ", res);
                this.$message.success("保存成功");
            });
        } 
    },
    data() {
        return {
            serverUrl: "http://127.0.0.1:7074",
            responseData: "",
            enableEdit: false, // 是否启用表格编辑
            image_url: "",
            tableData: {
                "name": "示例表格",
                "description": "关于表格的描述",
                "cells": [
                    {
                        "content": "全宗号",
                        "left": 0,
                        "right": 1,
                        "top":0,
                        "bottom":1
                    },
                    {
                        "content": "年度",
                        "left": 1,
                        "right": 2,
                        "top":0,
                        "bottom":1
                    },
                    {
                        "content": "室编件号",
                        "left": 2,
                        "right": 4,
                        "top":0,
                        "bottom":1
                    },
                    {
                        "content": "馆编件号",
                        "left": 4,
                        "right": 6,
                        "top":0,
                        "bottom":1
                    },        
                    {
                        "content": "盒号",
                        "left": 6,
                        "right": 7,
                        "top":0,
                        "bottom":1
                    },
                    {
                        "content": "220",
                        "left": 0,
                        "right": 1,
                        "top":1,
                        "bottom":2
                    },
                    {
                        "content": "2003",
                        "left": 1,
                        "right": 2,
                        "top":1,
                        "bottom":2
                    },
                    {
                        "content": "无",
                        "left": 2,
                        "right": 4,
                        "top":1,
                        "bottom":2
                    },
                    {
                        "content": "92",
                        "left": 4,
                        "right": 6,
                        "top":1,
                        "bottom":2
                    },        
                    {
                        "content": "无",
                        "left": 6,
                        "right": 7,
                        "top":1,
                        "bottom":2
                    },
                    {
                        "content": "机构(问题)",
                        "left": 0,
                        "right": 3,
                        "top":2,
                        "bottom":3
                    },
                    {
                        "content": "保管期限",
                        "left": 3,
                        "right": 5,
                        "top":2,
                        "bottom":3
                    },
                    {
                        "content": "文书号",
                        "left": 5,
                        "right": 6,
                        "top":2,
                        "bottom":3
                    },
                    {
                        "content": "页数",
                        "left": 6,
                        "right": 7,
                        "top":2,
                        "bottom":3
                    },
                    {
                        "content": "防控组",
                        "left": 0,
                        "right": 3,
                        "top":3,
                        "bottom":4
                    },
                    {
                        "content": "长期",
                        "left": 3,
                        "right": 5,
                        "top":3,
                        "bottom":4
                    },
                    {
                        "content": "90",
                        "left": 5,
                        "right": 6,
                        "top":3,
                        "bottom":4
                    },
                    {
                        "content": "5",
                        "left": 6,
                        "right": 7,
                        "top":3,
                        "bottom":4
                    }
                    
                ]
            }
        };
    }
  }
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #ffffff;
  height: 100%;
  width: 100%;;
}

.button-area {
    display: flex;
    height: 30px;
    overflow: scroll;
}

.display-area {
    height: calc(100% - 30px);
    overflow-y: overlay;
}


.edit-area {
    border: 2px solid #00000050;
    height: 200px;
    width: 100%;
    padding: 5px;
    overflow-y: overlay;
    overflow-x: overlay;
}



textarea {
    width: 100%;
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
}

.wide-input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.24);
}

table {
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    background-color: #ffffff;
    padding: 4px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

input {
    width: 50%;
    background-color: #ffffff;
    border: 1px solid black;
    border-radius: 3px;
    transition: 0.2s;
}

.button-area {
    margin-bottom: 5px;
}

.button-area button {
    margin-right: 10px;
}
</style>

