<template>
  <div id="app">
    <Header />
    <Background />
    <router-view/>
  </div>
</template>

<script>
import { provide, computed } from 'vue';
import Header from './components/Header.vue'
import Background from './components/Background.vue'

export default {
  components: { 
    Background, 
    Header 
  },
  data() {
    return {
      isLoggedIn: true // Initialize login status to false
    }
  },
  provide() {
    return {
      isLoggedIn: computed(() => this.isLoggedIn), // injected into components further down the component hierarchy. W
                                                   // computed() ensures that when boolean changes, it is reflected in any sub-components injecting it
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>