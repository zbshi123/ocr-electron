<template>
    <div class="container">
        <div>eventBus</div>
        <button @click="emit()">other change</button>
        <div>{{ eventBusCount }}</div>
    </div>
  </template>
  
<script>
import { eventBus } from "../../utils/eventBus";


export default {
    components: {},
    name: 'EventBusTest',
    data() {
      return {
        eventBusCount: 0
      }
    },
    mounted() {
        eventBus.on("channel", (data) => {
            console.log("事件总线成功监听：" + data)
            this.eventBusCount++;
        }); // 监听消息
    },
    computed: {
    },
    methods: {
      emit() {
        const data = "事件总线发送信息"
        eventBus.emit('channel', data) // 发送消息
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
</style>