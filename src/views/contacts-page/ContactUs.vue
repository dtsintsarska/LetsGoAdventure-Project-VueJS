<template>
  <main>
    <section class="background">
      <Title title="Contact Us" />
      <h4>
        While we're good with smoke signals, there are simpler ways for us to
        get in touch and answer your questions.
      </h4>
    </section>
    <section class="info">
      <Details />
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.7440535871933!2d23.350088314971213!3d42.666778923669696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cca4a719b7%3A0xdf53fcbcd8e758d7!2z0KHQvtGE0YLRg9C10YDQtdC9INGD0L3QuNCy0LXRgNGB0LjRgtC10YI!5e0!3m2!1sbg!2sbg!4v1596275156074!5m2!1sbg!2sbg"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<script>
import Title from "../../components/Title.vue";
import Details from "./Details.vue";


export default {
  components: {
    Title,
    Details,
  },
};
</script>

<style scoped>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../../assets/images/sandy-island-in-the-middle-of-the-ocean-wallpaper-1008x380-415.jpg")
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

.info section {
  float: left;
}

.info {
  background-color: white;
}

.map iframe {
  width: 500px;
  height: 400px;
  border: 0;
}

.map {
  padding-bottom: 2%;
  padding-top: 0%;
}
</style>