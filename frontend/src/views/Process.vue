<template>
    <div>
        <!--
        <div>
            <select v-model="selectedImageUrl">
            <option value="-1">请选择图片</option>
            <option v-for="(item, index) in image_data" :key="index" :value="item.image_url">
                {{ item.tag }}
            </option>
            </select>
            <img :src="selectedImageUrl" alt="Image" style="width: 200px; height: 200px;">
        </div>
        -->
        <radio />
        <br>
        <table-displayer />
    </div>
  </template>
  
<script>
import ImageTable from '../components/discarded/ImageTable.vue';
import DynamicTable from '../components/DynamicTable.vue';
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';
import Radio from '../components/Radio.vue';
import {eventBus} from '../utils/eventBus';
import TableDisplayer from '../components/TableDisplayer.vue';
// 监听radio组件的事件
eventBus.on("Radio.vue", (data) => {
    console.log("监听on: " + data);
});

export default {
    components: { ImageTable, DynamicTable, Radio, TableDisplayer },
    name: 'Processing',
    data() {
      return {
        image_data: [],
        selectedImageUrl: "",
        selectedOption: "",
        image_tag: "fdfsfd",
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
      }
    },
    mounted() {
        console.log("mounted: 组件已挂载");
        this.dbGetImages();
        console.log(this.image_data);
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
    }
  }
</script>