<template>
  <div id="app">
    <HeroHeader />
    <Welcome />
    <Advantages />
    <Footer />
  </div>
</template>

<script>

import Welcome from './components/Welcome.vue'
import Advantages from './components/Advantages.vue'
import Footer from './components/Footer.vue'
import HeroHeader from './components/HeroHeader.vue'


export default {
  name: 'App',
  components: {
    HeroHeader,
    Welcome,
    Advantages,
    Footer,

  }
}
</script>

<style>
</style>
