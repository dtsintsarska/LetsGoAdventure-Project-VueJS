<template>
  <div class="container">
    <Title title="LogIn" />
    <p>Sign in to check out the adventures waiting for you</p>

    <form @submit.prevent="handleFormSubmit()">
      <div class="input">
        <div class="row">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Please type your username"
          />
        </div>

        <div class="row">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Please type your password"
          />
        </div>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary">Submit!</button>
      </div>

      <span>
         New user?
        <router-link to="/register">
          <span style="text-underline">Create your personal account now</span>
        </router-link>
      </span>
    </form>
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import authenticate from "../../helpers/authenticate";


export default {
  components: {
    Title,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleFormSubmit() {
      if (this.loginValidator()) {

        await authenticate(
      'http://localhost:9999/api/user/login',
      {
        username: this.username,
        password: this.password,
      },
      (userInfo) => {
        this.$store.commit("logIn", userInfo);
      
        this.$vToastify.success(`Nice to see you again, ${this.username}!`, "Welcome");
        this.$router.push('/');
      },
      (e) => {
        console.log('Error', e);
       this.$vToastify.error('Wrong username or password!', "Try again");
      }
    );
      }
    },

    loginValidator() {
      if (this.username === "" || this.username.length < 3) {
        this.$vToastify.error(
          "Username should be at least 3 characters long!",
          "Please provide correct username"
        );
        return false;
      }

      if (this.password) {
        if (this.password === "" || this.password.length < 6) {
          this.$vToastify.error(
            "Password must be at least 6 characters long",
            "Wrong password"
          );
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<style scoped>
    .container {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../assets/images/fishes.jpg") no-repeat center;
    background-size: cover;
}

.container {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-bottom: 5%;
}

.container span,
.container p {
    color: snow;
    text-align: center;
    font-size: 20px;
    font-style: oblique;
    padding-bottom: 2%;
}

.input {
  text-align: center;
}

.input label {
  color: snow;
  font-size: 20px;
  margin-bottom: 0.5rem;
  text-align: center;
  display: block;
}

.input input {
  width: 25%;
  padding: 12px 20px;
  border: 1px solid #ccc;
  display: grid;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 0.5rem;
  color: black;
}

.row {
  margin-bottom: 1rem;
}
</style>