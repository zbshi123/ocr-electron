<template>
    <div id="app-base-db">
      <div class="one-block-1">
        <span>
          1. sqlite本地数据库
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="8">
            • 大数据量: 0-1024GB(单库)
          </a-col>
          <a-col :span="8">
            • 高性能
          </a-col>
          <a-col :span="8">
            • 类mysql语法
          </a-col>
        </a-row>
      </div>
      <div class="one-block-1">
        <span>
          2. 数据目录
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="12">
            <a-input v-model="data_dir" :value="data_dir" addon-before="数据目录" />
          </a-col>
          <a-col :span="2">
          </a-col>
          <a-col :span="5">
            <a-button @click="selectDir">
              修改目录
            </a-button>
          </a-col>
          <a-col :span="5">
            <a-button @click="openDir">
              打开目录
            </a-button>
          </a-col>        
        </a-row>
      </div>     
      <div class="one-block-1">
        <span>
          3. 测试数据
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="24">
            {{ all_list }}
          </a-col>
        </a-row>
      </div>    
      <div class="one-block-1">
        <span>
          4. 添加数据
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="6">
            <a-input v-model="name" :value="name" addon-before="姓名" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-input v-model="age" :value="age" addon-before="年龄" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-button @click="sqlitedbOperationTest('add')">
              添加
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="one-block-1">
        <span>
          4. 获取数据
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="6">
            <a-input v-model="search_age" :value="search_age" addon-before="年龄" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-button @click="sqlitedbOperationTest('get')">
              查找
            </a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            {{ userList }}
          </a-col>
        </a-row>
      </div>
      <div class="one-block-1">
        <span>
          5. 修改数据
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="6">
            <a-input v-model="update_name" :value="update_name" addon-before="姓名(条件)" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-input v-model="update_age" :value="update_age" addon-before="年龄" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-button @click="sqlitedbOperationTest('update')">
              更新
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="one-block-1">
        <span>
          6. 删除数据
        </span>
      </div>  
      <div class="one-block-2">
        <a-row>
          <a-col :span="6">
            <a-input v-model="delete_name" :value="delete_name" addon-before="姓名" />
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
          </a-col>
          <a-col :span="3">
          </a-col>
          <a-col :span="6">
            <a-button @click="sqlitedbOperationTest('del')">
              删除
            </a-button>
          </a-col>
        </a-row>
      </div>       
    </div>
  </template>
<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';

export default {
    name: 'SqliteDb',
    data() {
        return {
        name: '李四',
        age: 20,
        userList: ['空'],
        search_age: 20,
        update_name: '李四',
        update_age: 31,
        delete_name: '李四',
        all_list: ['空'],
        data_dir: ''
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init() {
        const params = {
            action: 'getDataDir',
        }
        ipc.invoke(ipcApiRoute.sqlitedbOperationTest, params).then(res => {
            if (res.code == -1) {
            this.$message.error('请检查sqlite是否正确安装', 5);
            return
            }

            this.data_dir = res.result;
            this.getAllTestData();
        }) 
        },
        getAllTestData () {
        const params = {
            action: 'all',
        }
        ipc.invoke(ipcApiRoute.sqlitedbOperationTest, params).then(res => {
            if (res.all_list.length == 0) {
            return false;
            }
            this.all_list = res.all_list;
        }) 
        },
        selectDir() {
          ipc.invoke(ipcApiRoute.selectFolder, '').then(r => {
              this.data_dir = r;
              // 修改数据目录
              this.modifyDataDir(r);
          })
        },
        openDir() {
        console.log('dd:', this.data_dir);
        ipc.invoke(ipcApiRoute.openDirectory, {id: this.data_dir}).then(res => {
            //
        })
        },    
        modifyDataDir(dir) {
        const params = {
            action: 'setDataDir',
            data_dir: dir
        }
        ipc.invoke(ipcApiRoute.sqlitedbOperationTest, params).then(res => {
            this.all_list = res.all_list;
        }) 
        },
        sqlitedbOperationTest (ac) {
        const params = {
            action: ac,
            info: {
            name: this.name,
            age: parseInt(this.age)
            },
            search_age: parseInt(this.search_age),
            update_name: this.update_name,
            update_age: parseInt(this.update_age),
            delete_name: this.delete_name,
        }
        if (ac == 'add' && this.name.length == 0) {
            this.$message.error(`请填写数据`);
        }
        ipc.invoke(ipcApiRoute.sqlitedbOperationTest, params).then(res => {
            console.log('res:', res);
            if (ac == 'get') {
            if (res.result.length == 0) {
                this.$message.error(`没有数据`);
                return;
            }
            this.userList = res.result;
            }
            if (res.all_list.length == 0) {
            this.all_list = ['空'];
            return;
            }
            this.all_list = res.all_list;
            this.$message.success(`success`);
        }) 
        },
    }
};
</script>
<style lang="less" scoped>
#app-base-db {
padding: 0px 10px;
text-align: left;
width: 100%;
.one-block-1 {
    font-size: 16px;
    padding-top: 10px;
}
.one-block-2 {
    padding-top: 10px;
}
}
</style>
  