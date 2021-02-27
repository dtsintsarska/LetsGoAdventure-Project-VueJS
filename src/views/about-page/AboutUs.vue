<template>
  <main>
    <section class="background">
      <Title title="About Us" />
      <h4>Who we are? What matters to us? What we do?</h4>
    </section>
    <section class="info">
      <h1>Let's Go Adventure Club</h1>
      <p>
        "Let's Go Adventure" was created in early 2010 by avid adventurers, avid
        mountaineers and loyal friends. We have been professional mountain
        guides for more than 10 years and what unites us is our common passion -
        mountains and adventures! All our adventures are created with great
        attention to the client and understanding of nature, to convey to you
        our passion for the mountains and to ignite the spark of adventure in
        your eyes.
      </p>
      <h4>
        We believe that we will continue to pleasantly surprise those of you who
        know us and that we will gain the trust of all those with whom our
        shared adventures are about to meet us.
      </h4>
      <h4>See more about us:</h4>
    </section>
    <section class="buttons">
      <Button href="/aboutus/team" title="Our Team" />
      <Button href="/aboutus/contacts" title="Contact Us" />
    </section>
  </main>
</template>

<script>
import Title from '../../components/Title.vue';
import Button from '../../components/Button-Link.vue';

export default {
    components: {
        Title,
        Button
    }
};
</script>

<style scoped>
.background {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("../../assets/images/Ice-Lakes-BG.jpg") no-repeat;
    background-size: cover;
}

.background h4 {
    color: snow;
    text-align: center;
    font-size: 20px;
    font-style: oblique;
    padding-bottom: 2%;
}

.info {
    background-color: white;
    padding-left: 10%;
    padding-right: 10%;

}

.info h1 {
    text-align: center;
    color: #3498b9;
    font-size: 30px;
}

.info p {
    text-align: justify;
    color: #3498b9;
    font-size: 20px;
}

.info h4 {
    text-align: center;
    color: #3498b9;
    font-weight: 800;
    font-size: 20px;
}

.buttons {
    text-align: center;
}
</style>