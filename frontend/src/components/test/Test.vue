<template>
    <div class="test-container">
        <button @click="test">测试</button>
    </div>
</template>


<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
export default {
    name: 'Test',
    computed: {

    },
    methods: {
        test() {
            const params = {
                function_name: 'test',
            }
            ipc.invoke(ipcApiRoute.test, params).then(res => {
                this.$message.success(res);
            }) 
        }   
    },
    data() {
        return {
        };
    }
  }
  </script>

<style scoped>
  .test-container {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #ffffff;
  height: 100%;
  width: 100%;;
}
</style>