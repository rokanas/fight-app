<template>
  <div id="app">
    <Background />
    <router-view/>
  </div>
</template>

<script>

import Background from './components/Background.vue'

export default {
  components: { 
    Background, 
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>