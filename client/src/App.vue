<template>
  <div id="app">
    <Header/>
    <Background />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Background from './components/Background.vue'

export default {
  components: { 
    Background, 
    Header 
  },
  data() {
    return {
      isLoggedIn: false // Initialize login status to false
    }
  },
  methods: {
    updateLoginStatus(newValue) {
      this.isLoggedIn = newValue
    }
  },
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