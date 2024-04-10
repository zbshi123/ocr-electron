<template id="side">
  <div class="sidebar">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <!-- 添加其他导航链接 -->
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style>
.sidebar {
  background-color: #bacfbe;
  text-align: center;

  position: fixed; /* 让侧边栏固定在页面 */
  left: 0; /* 将侧边栏固定在页面的左侧 */
  top: 0; /* 将侧边栏固定在页面的顶部 */
  width: 150px; /* 设置侧边栏的宽度 */
  height: 100%; /* 设置侧边栏的高度，与页面高度相同 */
}
.sidebar a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #000000;
}
.sidebar a:hover {
  background-color: #9ae6b1;
}
</style>

  