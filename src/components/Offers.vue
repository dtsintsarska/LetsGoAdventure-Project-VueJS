<template>
  <section class="offers">
    <h2 class="title">{{ title }}</h2>
    <div class="upcoming">
      <div class="list" v-for="offer in this.offers" :key="offer._id">
        <SingleOffer :item="offer" />
      </div>
    </div>
  </section>
</template>

<script>
import SingleOffer from "./SingleOffer.vue";

export default {
  data() {
    return {
      offers: [],
    };
  },
  components: {
    SingleOffer,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    length: {
      type: Number,
    },
  },

  methods: {
    async getOffers() {
      const promise = await fetch(`http://localhost:9999/api/offers`);
      let receivedOffers = await promise.json();

      receivedOffers = receivedOffers.slice(0, this.$props.length);

      this.offers = receivedOffers;
    },
  },

  mounted() {
    this.getOffers();
  },
};
</script>

<style scoped>
.offers {
  color: #5a7c8a;
  padding-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 32px;
}

.upcoming {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
}
</style>