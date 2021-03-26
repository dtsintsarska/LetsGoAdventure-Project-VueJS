<template>
  <main>
    <section class="background">
      <Title title="My personal adventure space" />
      <h4>Welcome, {{ username }}!</h4>
    </section>
    <section class="container">
        <AsideProfile :username="username" :number="adventures.length" />
      <div class="content">
        <div class="title-list">
          <strong>List of your adventures:</strong>
        </div>
        <div class="list-adventures">
          <SingleOffer
            v-for="adventure in adventures"
            :key="adventure._id"
            :item="adventure"
          >
          </SingleOffer>
        </div>
      </div>
     
    </section>
  </main>
</template>

<script>
import Title from "../../components/Title.vue";
import SingleOffer from "../../components/SingleOffer.vue";
import AsideProfile from './AsideProfile.vue';

export default {
  data() {
    return {
      userId: this.$route.params.id,
      username: "",
      adventures: [],
    };
  },
  components: {
    Title,
    SingleOffer,
    AsideProfile
  },
  methods: {
    async getUserInfo() {
      const response = await fetch(
        `http://localhost:9999/api/user?id=${this.userId}`
      );

      if (!response.ok) {
        history.push("/error");
      } else {
        const user = await response.json();
        this.username = user.username;
        this.adventures = user.participations;
      }
    },
  },
  async mounted() {
    await this.getUserInfo();
  },
};
</script>

<style scoped>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../../assets/images/profile-background.jpg") no-repeat center;
  background-size: cover;
  background-position: center;
}

.background h4 {
  color: snow;
  text-align: center;
  font-size: 28px;
  font-style: oblique;
  padding-bottom: 4%;
}

.container {
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1rem;
}

.content {
  padding-right: 5%;
  padding-top: 0%;
  grid-column: 2 /span 2;
}

.title-list {
  text-align: center;
  font-size: 25px;
  font-style: italic;
  margin-bottom: 3%;
  color: #3498b3;
}

.list-adventures {
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

</style>