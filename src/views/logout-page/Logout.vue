<template>
  <section class="background">
    <h2>Do you really want to log out?</h2>
    <div class="buttons">
      <button class="btn-no" @click.prevent="handleNo()">No</button>
      <button class="btn-yes" @click.prevent="handleYes()">Yes</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    handleYes() {
      this.$store.commit("logOut");
      this.$vToastify.success("You have been successfully logged out!");
      this.$router.push("/login");
    },
    handleNo() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
    url("https://www.moneysense.ca/wp-content/uploads/2020/07/cost-of-camping.jpg")
      no-repeat center;
  background-size: cover;
}

.background h2 {
  color: snow;
  text-align: center;
  font-size: 32px;
  font-style: oblique;
  padding-bottom: 2%;
  padding-top: 15%;
  margin:0;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20%;
    padding-top: 10%
}

.btn-yes {
  margin-right: 16px;
  color: white;
  background-color: rgb(238, 70, 9);
  outline: none;
  font-size: 20px;
  font-weight: bold;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 12px;
  border-color: transparent;
  transition: all ease-in-out 200ms;
  cursor: pointer;
  margin-left: 4rem;
}

.btn-yes:hover {
  background-color: white;
  color: rgb(238, 70, 9);
  border-color: rgb(238, 70, 9);
}

.btn-no {
  color: white;
  background-color: rgb(10, 134, 62);
  outline: none;
  font-size: 20px;
  font-weight: bold;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 12px;
  border-color: transparent;
  transition: all ease-in-out 200ms;
  cursor: pointer;
}

.btn-no:hover {
  background-color: white;
  color: rgb(10, 134, 62);
  border-color: rgb(10, 134, 62);
}
</style>