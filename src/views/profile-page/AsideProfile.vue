<template>
  <aside class="aside">
    <div class="box">
      <section>
        <h2>My Profile</h2>
        <div>
          <strong>Username: </strong>
          {{ username }}
        </div>
        <div class="number">
          <strong>Total number of your adventures: </strong>
          {{ number }}
        </div>
        <div class="typeUser">
          <strong> Your Rang: </strong>
          <span>{{ typeUser }}</span>
        </div>
        <div class="image">
          <img
            src="../../assets/images/hiker-logo-removebg-preview.png"
            alt="Ups"
          />
        </div>
        <p>
          Your Rang depends on the number of your adventures. When you achieve
          "Silver" or "Golden" Rang, you become a part of our community and have
          access to many discounts and bonuses.
        </p>
      </section>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
    },
    number: {
        type: Number
    },
  },
  data() {
    return {
      typeUser: "",
    };
  },
  methods: {
    getTypeUser() {
      let result = "Regular User";

      if (this.number >= 3) {
        result = "Golden User";
      } else if (this.number >= 1) {
        result = "Silver User";
      }
      this.typeUser = result;
    },
  },
  mounted() {
    this.getTypeUser();
  },
  watch: {
    number: function (newNumber, oldNumber) {
      if (newNumber != oldNumber) {
        this.getTypeUser();
      }
    },
  },
};
</script>

<style>
.aside {
  vertical-align: top;
}

.box {
  background-color: lightgreen;
  padding: 2rem;
  padding-top: 1rem;
  margin-bottom: 5%;
  border-radius: 10px;
  margin-left: 2rem;
  box-shadow: 0px 2px 15px -2px rgba(66,140,59,0.68);
}

.typeUser :not(strong) {
  color: orange;
  font-weight: bold;
}

.image {
  background-color: lightgreen;
  background-blend-mode: multiply;
}

.image img {
  width: 100%;
}

.aside p {
  font-size: 14px;
  padding-right: 30px;
  text-align: justify;
}

.number {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>