<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  color: #2c3e50;
}
</style>
