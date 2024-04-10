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
  
  <style>
  .main-content {
    flex: 1;
    padding: 10px;
    margin-left: 150px;
  }
  </style>
  