<template>
    <div class="table-paginated-list-container">
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <div class="modal-button-area">
                    <button @click="showModal = !showModal">关闭</button>
                    <button @click="updateForm()">更新</button>
                    <button @click="generateXLSX()">导出xlsx</button>                    
                </div>
                <div class="modal-edit-area">
                    <dynamic-table :data="tableData"></dynamic-table>
                    <label for="">表格名称:</label>
                    <br>
                    <input class="wide-input" type="text" v-model="tableData.name">
                    <br>
                    <label for="">表格描述:</label>
                    <br>
                    <textarea v-model="tableData.description"  rows="3"></textarea>
                    <div class="edit-area">
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
                </div>
            </div>
        </div>
        <div class="button-area">
            <button @click="previousPage()">上一页</button>
            <button @click="nextPage()">下一页</button>
            页码：{{ currentPage }} / {{ totalPages }}            
        </div>
        <div class="table-area">
            <table>
                <thead>
                    <th>序号</th>
                    <th>名称</th>
                    <th>描述</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="item, index in paginatedData" :key="item.id">
                        <td>{{ item.form_id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.date_time }}</td>
                        <td>
                            <button @click="checkForm(index)">查看</button>
                            <button @click="deleteForm(item.form_id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>        
    </div>
</template>

<script>
import DynamicTable from './DynamicTable.vue';
import { ipcApiRoute } from '../api/main';
import { ipc } from '../utils/ipcRenderer';

export default {
  components: { DynamicTable },
    data() {
        return {
            data: [
                {id:1, tableData: "table1"},
            ], // 列表数据
            paginatedData: [],
            tableData: {
                "name": "demo",
                "description": "关于表格的描述",
                "date_time": "2024-05-01 23:59:59",
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
            },
            checkedId: "",
            pageSize: 10, // 每页显示的数据量
            currentPage: 1, // 当前页码
            formsNum: -1,
            showModal: false, // 是否显示弹窗预览
        };
    },
    mounted() {
        // this.fetchForms();
        this.setPaginatedData()
    },
    computed: {
        totalPages() {
            return Math.ceil(this.formsNum / this.pageSize);
        },
        paginatedData2() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.data.slice(start, end);
        },
    },
    methods: {
        previousPage() {
            if (this.currentPage <= 1) return;
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.setPaginatedData();
            console.log("previousPage()")
        },
        nextPage() {
            const totalPages = Math.ceil(this.formsNum / this.pageSize);
            if (this.currentPage >= totalPages) return;
            this.currentPage++;
            this.setPaginatedData();
            console.log("nextPage()")
        },
        setPaginatedData() {
            const index = (this.currentPage - 1) * 10;
            const size = this.pageSize;
            this.fetchFormsNum();
            this.fetchSomeForms(index, size);
        },
        fetchForms() {
            const params = {
                function_name: "getAllForms"
            }
            ipc.invoke(ipcApiRoute.formSqliteDbOperation, params).then(res => {
                this.data = res.result_list;
                for (let i = 0; i < this.data.length; i++) {
                    this.data[i].tableData = JSON.parse(this.data[i].tableData);
                }
                console.log(this.data);
            });
        },
        fetchSomeForms(index, size = 10) {
            const params = {
                function_name: "getSomeForms",
                index: index,
                size: size
            };
            let result_data = [];
            /*
            ipc.invoke(ipcApiRoute.formDbOperation, params).then(res => {
                result_data = res.result_list;
                if (result_data && result_data.length > 0) {}
                for (let i = 0; i < result_data.length; i++) {
                    result_data[i].tableData = JSON.parse(result_data[i].tableData);
                    result_data[i].tableData = JSON.parse(result_data[i]);
                    console.log(res);
                }
                this.paginatedData = result_data;
                console.log("fetchSomeForms: ", result_data);
            });
            */
            ipc.invoke(ipcApiRoute.formSqliteDbOperation, params).then(res => {
                result_data = JSON.parse(res.result_list);
                console.log(result_data);
                for (let i = 0; i < result_data.length; i++) {
                    console.log(res);
                }
                this.paginatedData = result_data;
                console.log("fetchSomeForms: ", result_data);
            });
        },
        fetchFormsNum() {
            const params = {
                function_name: "getFormsNum",
            };
            ipc.invoke(ipcApiRoute.formSqliteDbOperation, params).then(res => {
                this.formsNum = res.result;
                console.log("fetchFormsNum(): ", res);
                console.log("formsNum:", this.formsNum);
            });
        },
        deleteForm(form_id) {
            const params = {
                function_name: "delFormById",
                form_id: form_id
            }
            ipc.invoke(ipcApiRoute.formSqliteDbOperation, params).then(res => {
                this.$message.success("删除成功");
                this.setPaginatedData();
            });
        },
        checkForm(index) {
            this.showModal = !this.showModal;
            this.tableData = this.paginatedData[index];
            this.checkedId = this.paginatedData[index].form_id;
        },
        updateForm() {
            if (this.checkedId == "") {
                return;
            }

            const param = {
                function_name: "updateFormById",
                form_id: this.checkedId,
                tableData: JSON.stringify(this.tableData)
            }

            ipc.invoke(ipcApiRoute.formSqliteDbOperation, param).then(res => {
                this.$message.success("更新成功");
                /*
                this.data = res.all_list;
                for (let i = 0; i < this.data.length; i++) {
                    this.data[i].tableData = JSON.parse(this.data[i].tableData);
                }
                */
                this.setPaginatedData();
            });
        },
        generateXLSX() {
            const params = {
                id: this.checkedId,
                tableData: JSON.stringify(this.tableData)
            }
            // 通过ipc调用electron业务层
            ipc.invoke(ipcApiRoute.generateXLSX, params).then(res => {
                console.log('res:', res);
                this.$message.success(res.message);
            });
        },
    }
};
</script>

<style scoped>
.table-paginated-list-container {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
}

button {
    margin-right: 10px;
}

.button-area {
    height: 40px;
}

.table-area {
    height: calc(100% - 40px);
    overflow-y: scroll;
}


table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #dce0d7;
}

tr:hover td {
    background-color: #e8f7e7;
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
    height: 85%;
    width: 85%;
    padding: 20px;
    padding-right: 10px;
    border-radius: 5px;
}

.modal-button-area {
    height: 40px;
}

.modal-edit-area {
    height: calc(100% - 40px);
    overflow-y: scroll;
}

.modal-edit-area .wide-input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.24);
}

.modal-edit-area input {
    background-color: #ffffff;
    border: 1px solid black;
    border-radius: 3px;
}

.modal-edit-area textarea {
    width: 100%;
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 5px;
}

.edit-area {
    border: 2px solid #00000050;
    height: 200px;
    width: 100%;
    padding: 5px;
    overflow-y: overlay;
    overflow-x: overlay;
}
</style>
  