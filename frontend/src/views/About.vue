<template>
    <div>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About',
    data() {
      return {
        title: 'About Page',
        content: 'This is the about page content.'
      }
    }
  }
  </script>
  