<template>
  <main>
    <section class="background">
      <Title title="Our Team" />
      <h4>Meet our leadership team</h4>
    </section>
    <section class="team">
      <ul>
        <li v-for="(member, index) in team" :key="index" class="list">
          <div class="member">
            <img :src="member.image" :alt="member.name" />
            <h2>{{ member.name }}</h2>
            <p>{{ member.description }}</p>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import Title from "../../components/Title.vue";
import team from "../../helpers/team-list";

export default {
  components: {
    Title,
  },
  data() {
    return {
      team,
    };
  },
};
</script>

<style>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
    url("../../assets/images/rafting-in-the-imster-schlucht-canyon.jpeg")
      no-repeat center;
  background-size: cover;
}

.background h4 {
  color: snow;
  text-align: center;
  font-size: 20px;
  font-style: oblique;
  padding-bottom: 2%;
}

.list {
  list-style-type: none;
  display: inline-block;
  width: 50%;
  background-color: white;
  padding: 0%;
  margin: 0;
}

.member {
  text-decoration: none;
  list-style-type: none;
  text-align: center;
  padding-bottom: 5%;
  padding-right: 4%;
}

.member img {
  width: 25%;
  position: relative;
  min-width: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.6rem;
  float: left;
  padding: 5px;
}

.member h2 {
  color: #3498b9;
  text-align: center;
  float: center;
}

.member p {
  text-align: justify;
  color: #3498b9;
  padding: 20px;
  padding-top: 5px;
}
</style>