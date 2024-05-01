<template id="side">
  <div class="sidebar">
    <div class="img-container">
      <img src="../assets/logo2.png" alt="image">
    </div>
    <div class="a-box">
      <router-link to="/upload">Upload</router-link>
    </div>
    <div class="a-box">
      <router-link to="/process">Process</router-link> 
    </div>
    <div class="a-box">
      <router-link to="/test1">Test1</router-link>
    </div>
    <div class="a-box">
      <router-link to="/test2">Test2</router-link>
    </div>
    <div class="a-box">
      <router-link to="/test">Test3</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style scoped>
.sidebar {
  background-color: #283618;
  text-align: center;

  position: fixed; /* 让侧边栏固定在页面 */
  left: 0; /* 将侧边栏固定在页面的左侧 */
  top: 0; /* 将侧边栏固定在页面的顶部 */
  width: 150px; /* 设置侧边栏的宽度 */
  height: 100%; /* 设置侧边栏的高度，与页面高度相同 */
  box-shadow: rgba(0, 0, 0, 0.24) 7px 0 7px;
}

.a-box {
  background-color: #B7B7A4;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-bottom: 5px;
  margin-right: 2px;
  margin-left: 2px;
  transition: 0.3s;
}

.a-box:hover {
  background-color: #f6fee0;
  font-size: larger;
  transition: 0.3s;
}

.a-box:active {
  background-color: #fcbb3b;
  font-size: smaller;
  transition: 0.2s;
}

.sidebar a {
  display: block;
  padding: 10px;
  color: #283618;
}

.img-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #BC6C25;
  margin-bottom: 10px;
  background: linear-gradient(180deg, #edf5e5, #283618);
}

img {
  max-width: 75%;
  max-height: 75%;
  border: 1px solid rgb(82, 82, 82);
  border-radius: 50%;
  transition: 0.5s;
}

img:hover {
  max-width: 85%;
  max-height: 85%;
  border: 4px solid rgb(82, 82, 82);
  transition: 0.5s;
}

img:active {
  max-width: 65%;
  max-height: 65%;
  border: 1px solid rgb(82, 82, 82);
  transition: 0.2s;
}
</style>

  