<template>
  <div v-if="loading">
    <Loading />
  </div>
  <section v-else class="offers">
    <div v-if="hasResult">
      <h2 class="title">{{ title }}</h2>
      <div class="upcoming">
        <div v-for="offer in offers" :key="offer._id">
          <SingleOffer :item="offer" />
        </div>
      </div>
    </div>
    <div v-else class="noresult">
      <h3>No results found. Try again!</h3>
    </div>
  </section>
</template>

<script>
import SingleOffer from "./SingleOffer.vue";
import Loading from "./Loading.vue";

export default {
  data() {
    return {
      offers: [],
      loading: true,
    };
  },
  components: {
    SingleOffer,
    Loading,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    length: {
      type: Number,
    },
    category: {
      type: String,
    },
    search: {
      type: String,
    },
  },
  computed: {
    hasResult() {
      
      if (this.offers.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    async getOffers() {
      if (this.$props.category) {
        const promise = await fetch(
          `http://localhost:9999/api/offers/search/${this.category}`
        );

        this.offers = await promise.json();
        this.loading = false;
      } else if (this.$props.search) {
        const promise = await fetch(
          `http://localhost:9999/api/offers/search/name/${this.search}`
        );

        this.offers = await promise.json();
        this.loading = false;
      } else {
        const promise = await fetch(`http://localhost:9999/api/offers`);
        let receivedOffers = await promise.json();

        receivedOffers = receivedOffers.slice(0, this.$props.length);

        this.offers = receivedOffers;
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getOffers();
  },

  watch: {
    category: function (newCategory, oldCategory) {
      if (newCategory != oldCategory) {
        this.getOffers();
      }
    },
    search: function (newSearchInput, oldSearchInput) {
      if (newSearchInput != oldSearchInput) {
        this.getOffers();
      }
    },
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

.noresult {
  text-align: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>