<template>
  <div id="app">
    <Header />
    <HeroHeader />
    <Welcome />
    <Advantages />
    <Offers title="Upcoming Adventures" :length=3 />
    <Footer />
  </div>
</template>

<script>

import Welcome from './components/Welcome.vue'
import Advantages from './components/Advantages.vue'
import Footer from './components/Footer.vue'
import HeroHeader from './components/HeroHeader.vue'
import Offers from './components/Offers.vue'
import Header from './components/Header.vue'


export default {
  name: 'App',
  components: {
    HeroHeader,
    Welcome,
    Advantages,
    Offers,
    Footer,
    Header

  }
}
</script>

<style>
</style>
