<template>
  <main>
    <HeroHeader />
    <Welcome />
    <Advantages />
    <Offers title="Upcoming Adventures" :length="3" />
  </main>
</template>

<script>
import Welcome from "../components/Welcome.vue";
import Advantages from "../components/Advantages.vue";
import HeroHeader from "../components/HeroHeader.vue";
import Offers from "../components/Offers.vue";

export default {
  components: {
    HeroHeader,
    Welcome,
    Advantages,
    Offers,
  },
};
</script>

<style></style>
