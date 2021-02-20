<template>
  <section class="advantages">
    <h2>What makes us different?</h2>
    <ul class="advantages-list">
      <li
        class="advantage"
        v-for="(advantage, index) in advantagesList"
        :key="index"
      >
        <div class="advantage-details">
          <img class="advantage-image" :src="advantage.img" :alt="advantage.title" />
          <h3>{{ advantage.title }}</h3>
          <p>{{ advantage.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import advantages from "../helpers/advantages-list";

export default {
  data() {
    return {
      advantagesList: advantages(),
    };
  },
};
</script>

<style scoped>

    .advantage-image{
    width: 70px;
}

.advantage {
    width: 25%;
    padding: 15px 35px;
    display: inline-block;
    font-size: 19px;
}

.advantage-details {
    color: white;
    font-family: "PT Serif", serif;
}


.advantages {
    /* //padding: 20px; */
    padding-left: 0%;
    padding-top: 1%;
    background: #3498b9;
    color: white;
    text-align: center;
}

.advantages-list {
    padding-inline-start: 0%;
}

</style>