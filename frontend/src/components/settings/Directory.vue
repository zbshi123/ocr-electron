<template>
    <div class="directory-container">
      <div class="one-block-1">
        <div>
            <label for="">电子表格保存目录：</label>
        </div>
        <div class="input-box">
           <input v-model="data_dir"/>
        </div>
        <div class="button-box">
            <button @click="selectDir">修改目录</button>
            <button @click="openDir">打开目录</button>
            <!-- <button @click="test">测试</button> -->
        </div>
      </div>     
    </div>
  </template>
<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';

export default {
    name: 'Directory',
    data() {
        return {
            data_dir: ''
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init() {
            const params = {
                function_name: 'getConfigItemContent',
                itemName: "xlsx-save-directory"
            }
            ipc.invoke(ipcApiRoute.configDbOperation, params).then(res => {
                this.data_dir = res.result;
                console.log("init(): ", this.data_dir);
                console.log(res);
            }) 
        },
        selectDir() {
          ipc.invoke(ipcApiRoute.selectFolder, '').then(r => {
                const itemName = "xlsx-save-directory"
                this.data_dir = r;
                // 修改数据目录
                this.modifyConfig(itemName, this.data_dir);
          })
        },
        openDir() {
            console.log('dd:', this.data_dir);
            ipc.invoke(ipcApiRoute.openDirectory, {id: this.data_dir}).then(res => {

            })
        },    
        modifyConfig(itemName, itemContent) {
            const params = {
                function_name: 'setConfigItem',
                itemName: itemName,
                itemContent: itemContent
            }
            ipc.invoke(ipcApiRoute.configDbOperation, params).then(res => {
                console.log("modifyConfig: ", res);
            }) 
        },
        test() {
            const params = {
                function_name: 'test',
            }
            ipc.invoke(ipcApiRoute.configDbOperation, params).then(res => {
                this.$message.success(res);
            }) 
        }
    }
};
</script>

<style lang="less" scoped>
.directory-container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #ffffff;
  height: 100%;
  width: 100%;;
}

.input-box {
    display: inline-block;
    width: 70%;
}

.input-box input {
    width: 100%;
}

.button-box {
    display: inline-flex;
    justify-content: space-around; /* 横向均匀分布 */
    width: 30%;
}

.button-box button{
}

</style>