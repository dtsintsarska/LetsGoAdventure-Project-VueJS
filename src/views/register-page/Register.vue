<template>
  <div class="container">
    <Title title="Register" />
    <p>Please fill in this form to create an account</p>

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

        <div class="row">
          <label for="confPassword">Confirm Password</label>
          <input
            type="password"
            id="confPassword"
            v-model="confirmedPassword"
            placeholder="Please repeat your password"
          />
        </div>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary">Submit!</button>
      </div>
    </form>
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import authenticate from '../../helpers/authenticate'


export default {
  components: {
    Title,
  },
  data() {
    return {
      username: "",
      password: "",
      confirmedPassword: "",
      formData: {
        username: "",
        password: "",
        confirmedPassword: "",
      },
    };
  },
  methods: {
     async handleFormSubmit() {
      if (this.registerValidator()) {
        this.formData.username = this.username;
        this.formData.password = this.password;
       
        await authenticate(
          "http://localhost:9999/api/user/register",
          {
            username: this.formData.username,
            password: this.formData.password,
          },
          (userInfo) => {
            this.$store.commit("logIn", userInfo);
            
            this.$vToastify.success("Successfully create account!");
            this.$router.push("/");
          },
          (e) => {
            console.log("Error", e);
            this.$vToastify.error("Username is already taken!");
          }
        );
       }  
    },

    registerValidator() {
      if (this.username === "" || this.username.length < 3) {
        this.$vToastify.error(
          "Username should be at least 3 characters long!",
          "Wrong username"
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
      if (this.password !== this.confirmedPassword) {
        this.$vToastify.error(
          "Password and confirmed password should be equal",
          "Passwords do not match"
        );
        return false;
      }

      return true;
    },
  }
}
</script>

<style scoped>
.container {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../../assets/images/RTM19-banner-web.jpg") no-repeat center;
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
  margin: 0px;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

.alert-danger {
  color: red;
  background-color: white;
  border: 1px solid red;
  padding: 1rem;
  width: 25%;
  margin: auto;
}
</style>