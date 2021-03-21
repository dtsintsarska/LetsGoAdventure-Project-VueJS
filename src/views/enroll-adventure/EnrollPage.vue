<template>
  <main v-if="!isLoading">
    <section
      :style="{ 'background-image': 'url(' + image + ')' }"
      class="background"
    >
      <Title title="Become important part of our next adventure" />
      <h4>Fulfill all fields to save your seat in "{{ title }}"</h4>
    </section>
    <form class="container" @submit.prevent="handleSubmit()">
      <div>
        <label for="firstName">First Name</label>
        <input
          type="text"
          v-model="firstName"
          id="firstName"
          placeholder="Your first name..."
        />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input
          type="text"
          v-model="lastName"
          id="lastName"
          placeholder="Your last name..."
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          id="email"
          placeholder="Your e-mail address ..."
        />
      </div>
      <div>
        <label for="phone" Phone>Phone</label>
        <input
          type="text"
          v-model="phone"
          id="phone"
          placeholder="Your phone number should starts with 359"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit!</button>
    </form>
  </main>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import getCookie from "../../helpers/cookie";
import Loading from '../../components/Loading.vue';

export default {
  data() {
    return {
      adventureId: this.$route.params.id,
      title: "",
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isLoading: true,
    };
  },
  components: {
    Title,
    Loading
  },
  computed: {
    userId() {
      let user = this.$store.getters.getUser;
      return user.id;
    },
  },
  methods: {
    enrollValidator() {
      const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const phoneRegex = new RegExp(/^\d+$/);

      if (this.firstName === "" || this.firstName.length < 3) {
        this.$vToastify.error(
          "First Name is required and should be at least 3 characters long"
        );
        return false;
      }
      if (this.lastName === "" || this.lastName.length < 3) {
        this.$vToastify.error(
          "Last Name is required and should be at least 3 characters long"
        );
        return false;
      }
      if (!this.phone.startsWith("359") || !phoneRegex.test(this.phone)) {
        this.$vToastify.error(
          "Phone number must start with +359 and contain only numbers"
        );
        return false;
      }

      if (!emailRegex.test(this.email) || this.email === "") {
        this.$vToastify.error("Please provide a correct email address");
        return false;
      }

      return true;
    },

    async handleSubmit() {
      if (!this.enrollValidator()) {
        return;
      }
      try {
        await fetch(
          `http://localhost:9999/api/offers/enroll/${this.adventureId}`,
          {
            method: "POST",
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              phone: this.phone,
              email: this.email,
              id: this.userId,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: getCookie("x-auth-token"),
            },
          }
        );

        this.$vToastify.success(
          "Welcome on board to your next adventure with us!"
        );
        this.$router.push(`/adventures/${this.adventureId}`);
      } catch (error) {
        this.$vToastify.error("Something went wrong, try again later");
      }
    },
    async getAdventure() {
      const response = await fetch(
        `http://localhost:9999/api/offers/details/${this.adventureId}`
      );

      if (!response.ok) {
        this.$router.push("/");
      }

      const adventureInfo = await response.json();

      this.image = adventureInfo.image;
      this.title = adventureInfo.destination;
      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getAdventure();
  },
};
</script>

<style scoped>
.background {
  background: no-repeat center;
  background-size: cover;
}

.background h4 {
  color: snow;
  text-align: center;
  font-size: 20px;
  font-style: oblique;
  padding-bottom: 2%;
}

.container {
  text-align: center;
  margin-bottom: 2rem;
}

.container label {
  color: #3498b9;
  font-weight: bold;
  margin-bottom: 8px;
}

.container div {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.container input {
  border: 2px solid #3498b9;
  width: 25%;
  text-align: center;
  padding: 12px 20px;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 0.5rem;
}
</style>