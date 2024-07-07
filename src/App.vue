<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden; /* 禁止滚动 */
}

</style>
