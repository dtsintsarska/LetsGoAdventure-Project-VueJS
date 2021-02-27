<template>
  <main>
    <section
      :style="{ 'background-image': 'url(' + adventure.image + ')' }"
      class="background"
    >
      <Title :title="adventure.destination" />
      <h3>{{ adventure.description }}</h3>
    </section>
    <section class="container">
      <div class="content">
        <p>
          <strong>{{ adventure.description }}</strong>
        </p>
        <!-- <Paragraph days={days} /> -->
        <div v-for="(day, index) in adventure.days" :key="index">
          <p>DAY {{ index + 1 }}</p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          dolorem tempore ipsa ab modi illum quam quasi impedit beatae sunt
          laudantium nobis, quaerat cumque! Ipsum dicta veritatis vel labore
          enim?
        </div>
      </div>
      <Aside
        :adventureData="adventure"
        :freeInfo="free"
        :isAdmin="isAdmin"
        :isEnrolled="isEnrolled"
      />
      <section>
        <div class="galery">
          <h3>Adventure's Gallery</h3>
          <div>
            <!-- {galery.map((image, index) => {
                  return <Gallery image={image} alt='Pic' key={index} />;
                })} -->
          </div>
        </div>
      </section>
      <section>
        <div class="comments">
          <button class="commentsButton" onClick="{this.onClick}">
            See all comments about this adventure
          </button>
          <!-- <div v-if="showComments">{showComments ? this.getComments(comments) : null}</div> -->
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import Title from "../../components/Title.vue";
import Aside from "./Aside.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      adventure: {},
      free: 0,
      isEnrolled: false,
      isAdmin: false,
      showComments: false,
    };
  },
  components: {
    Title,
    Aside,
  },
  methods: {
    async getOffer(id) {
      const response = await fetch(
        `http://localhost:9999/api/offers/details/${id}`
      );

      // if (!response.ok) {
      //   this.props.history.push('/home');
      // }

      const adventureInfo = await response.json();

      // if (this.context.user.id) {
      //   adventure.participants.map((part) => {
      //     if (part.id.toString() === this.context.user.id.toString()) {
      //       this.setState({
      //         isEnrolled: true,
      //       });
      //     }
      //   });

      //   if (this.context.isAdmin) {
      //     this.setState({
      //       isAdmin: true,
      //     });
      //   }
      //}

      this.adventure = adventureInfo;
      this.free = this.adventure.seats - this.adventure.participants.length;
    },
  },
  beforeMount() {
    this.getOffer(this.id);
  },
};
</script>

<style scoped>
.background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.background h3 {
  color: snow;
  text-align: center;
  padding-bottom: 10%;
  font-size: 20px;
  font-style: oblique;
}

.container {
  background-color: white;
  display: inline-block;
}

.content {
  float: right;
  text-align: justify;
  padding-right: 10%;
  width: 50%;
  padding-top: 0%;
  padding-bottom: 0%;
  /* padding-left: 35%; */
}

.galery {
  display: inline-block;
  padding-top: 2%;
  padding-left: 1%;
  margin-top: 0;
  text-align: center;
}

.galery div {
  padding-bottom: 1%;
  height: 200px;
}

.galery h3 {
  color: #3498b9;
  text-align: center;
  /* padding-left: 58%; */
  margin-top: 0;
  margin-bottom: 4%;
  padding-top: 0;
  font-size: 22px;
}

/* Comments Button */
.comments {
  text-align: center;
}

.commentsButton {
  background: #3498b9;
  color: snow;
  padding: 1%;
  width: 25%;
  border-radius: 15px;
  border: none;
  border: 1px solid white;
  margin: 10px;
  cursor: pointer;
  font-size: 18px;
}

.commentsButton:hover {
  background: #fff;
  border: 1px solid #3498b9;
  color: #3498b9;
}

.noComments {
  font-size: 18px;
  text-align: center;
  margin-bottom: 2%;
}
</style>