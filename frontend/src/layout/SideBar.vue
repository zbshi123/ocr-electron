<template>
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
  width: 150px;
  background-color: #959e97;
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

  