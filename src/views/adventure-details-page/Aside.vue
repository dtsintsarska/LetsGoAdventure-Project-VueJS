<template>
  <aside class="aside">
    <div classe="box">
      <section>
        <h2>{{ adventureData.destination }}</h2>
        <div>
          <strong>Country: </strong>
          {{ adventureData.country }}
        </div>
        <div>
          <strong>Date: </strong>
          {{ adventureData.date }}
        </div>
        <div>
          <strong>Category: </strong>
          {{ adventureData.category }}
        </div>
        <div>
          <strong>Level: </strong>
          {{ adventureData.level }}
        </div>
        <div>
          <strong>Days: </strong>
          {{ adventureData.days }}
        </div>
        <div>
          <strong>Price: </strong>
          {{ adventureData.price }} BGN
        </div>
        <div>
          <strong>Max number of participants: </strong>
          {{ adventureData.seats }} persons
        </div>
        <div>
          <strong>Available seats: </strong>
          Only {{ freeInfo }} left!
        </div>
        <div>
          <strong>Guide: </strong>
          {{ adventureData.guide }}
        </div>

        <div v-if="!isEnrolled" class="infoButton">
          <strong>Do you want to become part of this adventure?</strong>
          <div>
            <!-- <Link
                    to={{
                      pathname: `/adventures/enroll/${id}`,
                      state: { image, destination },
                    }}
                  > -->
            <button type="button" class="button">Save your seat here!</button>
            <!-- </Link> -->
          </div>
        </div>
        <div v-else class="infoButton">
          <strong>
            You are already part of this adventure! Do you want to post a
            comment?
          </strong>
          <div>
            <!-- <Link
                    to={{
                      pathname: `/adventures/comments/${id}`,
                      state: { image, destination },
                    }}
                  > -->
            <button type="button" class="buttonComment">
              Write a comment about this adventure!
            </button>
            <!-- </Link> -->
          </div>
        </div>

        <!-- <div v-if="isAdmin" class="infoButton"> -->

        <div class="infoButton">
          <button class="buttonDelete" @click.prevent="clickDelete()">
            Delete this adventure?
          </button>
        </div>
      </section>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    adventureData: {
      type: Object,
    },
    freeInfo: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
    },
    isEnrolled: {
      type: Boolean,
    },
  },
  data() {
    return {
      image: this.adventureData.image,
    };
  },
  methods: {
    clickDelete() {
      this.$emit("deleteClick");
    },
  },
};
</script>

<style scoped>
.aside {
 
  width: 30%;
  padding-left: 32px;
  margin-left: 25px;
  background-color: beige;
  margin-right: 1%;
  text-align: left;
  padding-bottom: 2%;
  padding-top: 2%;
  margin-top: 2%;
  border-radius: 6px;
  box-shadow: -2px 4px 25px 10px rgba(7,7,7,0.13);
}

.aside div {
  margin-bottom: 8px;
}

.infoButton {
  margin-top: 25px;
  text-align: center;
}

.button {
  color: black;
  background-color: lightgreen;
  width: 200px;
  height: 70px;
  border-radius: 15px;
  border: 1px solid white;
  margin: 10px;
  cursor: pointer;
  font-size: 17px;
}

.button:hover {
  background-color: #fff;
  border: 1px solid lightgreen;
  color: green;
}

/* Button comment  */

.buttonComment {
  color: black;
  background-color: lightsalmon;
  width: 200px;
  height: 70px;
  border-radius: 15px;
  border: 1px solid white;
  margin: 10px;
  cursor: pointer;
  font-size: 17px;
}

.buttonComment:hover {
  background-color: #fff;
  border: 1px solid lightsalmon;
  color: salmon;
}

/* Delete button */
.buttonDelete {
  color: black;
  background-color: red;
  width: 200px;
  height: 70px;
  border-radius: 15px;
  border: 1px solid white;
  margin: 10px;
  cursor: pointer;
  font-size: 17px;
  text-decoration: none;
}

.buttonDelete:hover {
  background-color: #fff;
  border: 1px solid red;
  color: red;
}
</style>