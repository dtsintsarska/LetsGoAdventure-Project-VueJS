<template>
  <main v-if="!loading">
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
        @deleteClick="deleteSectionVisible = true"
      />
      <section>
        <div class="galery">
          <h3>Adventure's Gallery</h3>
          <div>
            <img
              v-for="(image, index) in adventure.galery"
              :key="index"
              :src="image"
              :alt="index"
              class="pic"
            />;
          </div>
        </div>
      </section>
      <section>
        <div class="comments">
          <button class="commentsButton" @click="showComments = !showComments">
            See all comments about this adventure
          </button>
          <div v-if="showComments">
            <div v-if="adventure.comments.length == 0" class="noComments">
              No comments found! Save your seat and be the first who write
              comment about this adventure!
            </div>
            <div
              v-else
              v-for="(comment, index) in adventure.comments"
              :key="index"
            >
              <Comment :commentInfo="comment" />
            </div>
          </div>
        </div>
      </section>
      <section v-if="deleteSectionVisible" class="delete-section">
        <h3>Do you really want to delete "{{ adventure.destination }}"?</h3>
        <div class="delete-section-buttons">
          <button class="btn-delete" @click.prevent="deleteAdventure()">
            Yes
          </button>

          <button class="btn-no" @click.prevent="handleNo()">No</button>
        </div>
      </section>
    </section>
  </main>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import Aside from "./Aside.vue";
import Comment from "./Comment.vue";
import Loading from "../../components/Loading.vue";
import getCookie from "../../helpers/cookie";

export default {
  data() {
    return {
      id: this.$route.params.id,
      adventure: {},
      free: 0,
      isEnrolled: false,
      isAdmin: false,
      showComments: false,
      loading: true,
      deleteSectionVisible: false,
    };
  },
  components: {
    Title,
    Aside,
    Comment,
    Loading,
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
      this.adventure.comments = this.adventure.comments.reverse();
      this.free = this.adventure.seats - this.adventure.participants.length;
      this.loading = false;
    },
    async deleteAdventure() {
      await fetch(`http://localhost:9999/api/offers/delete/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("x-auth-token"),
        },
      });
      this.$vToastify.success("Successfully delete adventure");
      this.$router.push(`/adventures`);
    },
    handleNo() {
      this.deleteSectionVisible = false;
    },
  },
  created() {
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
  position: relative;
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

.pic {
  display: inline-block;
  width: 320px;
  height: 150px;
  padding-left: 10px;
}

.delete-section {
  position: absolute;
  background-color: floralwhite;
  padding: 4rem;
  top: 4rem;
  right: 35%;
  border-radius: 6px;
  box-shadow: 5px 5px 16px 5px rgba(0, 0, 0, 0.36);
}

.delete-section h3 {
  color: #3498b9;
  text-align: center;
}

.delete-section-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-delete {
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
}

.btn-delete:hover {
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