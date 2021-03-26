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
        @writeCommentClick="writeCommentSection = true"
        @showParticipantsClick="showParticipants = true"
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
      <section v-if="writeCommentSection" class="comment-section">
        <div class="subtitle">
          <h3>
            Post your comment and let us know what you think about adventure "{{
              adventure.destination
            }}"
          </h3>
        </div>
        <div>
          <textarea
            class="comment-text-area"
            v-model="comment"
            placeholder="Write your comment here..."
          ></textarea>
          <div class="comment-buttons">
            <button class="btn-post" @click.prevent="writeComment()">
              Post Comment
            </button>

            <button class="btn-cancel" @click.prevent="handleCancel()">
              Cancel
            </button>
          </div>
        </div>
      </section>
      <section v-if="showParticipants" class="participants-section">
        <h3>Participants in "{{ adventure.destination }}"</h3>
        <div>
          <div
            v-for="(participant, index) in adventure.participants"
            :key="index"
          >
            <div class="participants">
              <span>{{ index + 1 }}. </span>
              <div>
                <p>
                  <strong>Name: </strong> {{ participant.firstName }}
                  {{ participant.lastName }}
                </p>
                <p><strong>Email: </strong> {{ participant.email }}</p>
                <p><strong>Phone: </strong> {{ participant.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btn-close" @click.prevent="handleNo()">X</button>
        </div>
      </section>
    </section>
  </main>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Title from '../../components/Title.vue';
import Aside from './Aside.vue';
import Comment from './Comment.vue';
import Loading from '../../components/Loading.vue';
import getCookie from '../../helpers/cookie';

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
      writeCommentSection: false,
      comment: '',
      showParticipants: false,
    };
  },
  components: {
    Title,
    Aside,
    Comment,
    Loading,
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isUserAdmin() {
      return this.$store.getters.getIsAdmin;
    },
  },
  methods: {
    async getOffer() {
      const response = await fetch(
        `http://localhost:9999/api/offers/details/${this.id}`
      );

      if (!response.ok) {
        this.$router.push('/');
      }

      const adventureInfo = await response.json();

      this.adventure = adventureInfo;
      this.adventure.comments = this.adventure.comments.reverse();
      this.free = this.adventure.seats - this.adventure.participants.length;

      if (this.user) {
        this.adventure.participants.map((part) => {
          if (part.id.toString() === this.user.id.toString()) {
            this.isEnrolled = true;
          }
        });
      }

      if (this.isUserAdmin) {
        this.isAdmin = true;
      }

      this.loading = false;
    },
    async deleteAdventure() {
      await fetch(`http://localhost:9999/api/offers/delete/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('x-auth-token'),
        },
      });
      this.$vToastify.success('Successfully delete adventure');
      this.$router.push(`/adventures`);
    },
    handleNo() {
      this.deleteSectionVisible = false;
      this.showParticipants = false;
    },

    async writeComment() {
      await fetch(`http://localhost:9999/api/offers/comment/${this.id}`, {
        method: 'POST',
        body: JSON.stringify({
          username: this.user.username,
          author: this.user.id,
          comment: this.comment,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('x-auth-token'),
        },
      });

      this.$vToastify.success('Successfully post comment!');
      this.writeCommentSection = false;
      this.getOffer();
    },

    handleCancel() {
      this.writeCommentSection = false;
    },
  },
  mounted() {
    this.getOffer();
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

.comment-section {
  position: absolute;
  background-color: burlywood;
  padding-top: 3rem;
  padding-bottom: 3rem;
  top: 4rem;
  right: 20%;
  border-radius: 6px;
  box-shadow: 5px 5px 16px 5px rgba(0, 0, 0, 0.36);
}

.comment-text-area {
  display: block;
  width: 80%;
  margin: auto;
  height: 150px;
  margin-bottom: 2rem;
}

.comment-buttons {
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: auto;
}

.subtitle {
  width: 80%;
  margin: auto;
  margin-bottom: 2rem;
  text-align: center;
}

.btn-post {
  margin-right: 16px;
  color: white;
  background-color: rgb(18, 116, 18);
  outline: none;
  font-size: 16px;
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

.btn-post:hover {
  background-color: white;
  color: rgb(18, 116, 18);
  border-color: rgb(18, 116, 18);
}

.btn-cancel {
  color: white;
  background-color: rgb(185, 9, 9);
  outline: none;
  font-size: 16px;
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

.btn-cancel:hover {
  background-color: white;
  color: rgb(185, 9, 9);
  border-color: rgb(185, 9, 9);
}

.btn-close {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  background-color: orangered;
  color: white;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.participants-section {
  background-color: #9c9c9b;
  color: white;
  position: absolute;
  padding: 3rem;
  top: 6rem;
  right: 30%;
  border-radius: 6px;
  box-shadow: 5px 5px 16px 5px rgba(0, 0, 0, 0.36);
}

.participants p {
  margin:0;
  padding:0
}

.participants {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
}
</style>
