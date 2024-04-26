<template>
    <div>
        <dynamic-table :data="tableData"/>
        <textarea v-model="tableDataForTextArea"  rows="10"></textarea>
        <div>
        <a-button @click="fetchOCR()">请求get_table</a-button>
        <a-button @click="postImageUrl()">发送图像</a-button>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import DynamicTable from './DynamicTable.vue';
import {eventBus} from '../utils/eventBus';

export default {
    components: {DynamicTable},
    name: 'TableDisplayer',
    mounted() {
        // 监听radio组件的事件
        eventBus.on("Radio.vue", (data) => {
            console.log("监听on: " + data);
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
            try {
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
               })
            } catch (error) {
                console.error('发送请求错误:', error);
            } finally {

            }
        },
        test(response_data) {
            this.tableData = response_data;
        }   
    },
    data() {
        return {
            serverUrl: "http://127.0.0.1:7074",
            responseData: "",
            image_url: "",
            tableData: {
                "name": "demo",
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
    textarea {
        width: 100%;
        resize: none;
        border: 1px solid #000000;
    }
</style>