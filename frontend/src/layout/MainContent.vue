<template>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainContent'
  }
  </script>
  
  <style scoped>
  .main-content {
    flex: 1;
    padding: 10px;
    margin-left: 150px;
    background-color: #FEFAE0;
  }
  </style>
  