<template>
  <div id="app">
    <Welcome />
    <Advantages />
  </div>
</template>

<script>

import Welcome from './components/Welcome.vue'
import Advantages from './components/Advantages.vue'


export default {
  name: 'App',
  components: {
    Welcome,
    Advantages
  }
}
</script>

<style>
</style>
