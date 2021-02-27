<template>
  <main>
    <section class="background">
      <Title title="Adventures" />
      <h4>Live your life by a compass, not a clock!</h4>
    </section>
    <section class="search">
      <Search />
    </section>
    <section class="adventures">
      <Offers title="All Adventures" />
    </section>
  </main>
</template>

<script>
import Offers from "../../components/Offers.vue";
import Title from '../../components/Title.vue'
import Search from "./Search.vue";

export default {
  components: {
    Offers,
    Title,
    Search,
  },
};
</script>

<style>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../../assets/images/aurora.jpg") no-repeat center;
  background-size: cover;
}

.background h4 {
  color: snow;
  text-align: center;
  font-size: 20px;
  font-style: oblique;
  padding-bottom: 2%;
}
</style>