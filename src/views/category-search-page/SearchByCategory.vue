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
      <Offers :title="`Category: ${category}`" :category="category" />
    </section>
  </main>
</template>

<script>
import Search from "../all-adventures-page/Search.vue";
import Title from "../../components/Title.vue";
import Offers from "../../components/Offers.vue";

export default {
  components: {
    Search,
    Title,
    Offers,
  },
  data() {
    return {
      category: this.$route.params.category,
    };
  },

  watch: {
    $route(to, from) {
      if (to !== from) {
        this.category = this.$route.params.category;
      }
    },
  },
};
</script>

<style scoped>
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