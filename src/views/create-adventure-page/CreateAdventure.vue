<template>
  <main>
    <section class="background">
      <Title title="Create New Adventure" />
      <h4>Fulfill all fields to create a new adventure</h4>
    </section>
    <form class="container" @submit.prevent="handleSubmit()">
      <div>
        <label for="destination">Destination</label>
        <input
          type="text"
          v-model="destination"
          id="destination"
          placeholder="Destination name"
        />
      </div>
      <div>
        <label for="country">Country</label>
        <input
          type="text"
          label="Country"
          id="country"
          placeholder="Country or Region"
          v-model="country"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <input
          type="text"
          label="Description"
          id="description"
          placeholder="Description of the adventure - day by day"
          v-model="description"
        />
      </div>
      <div>
        <label for="guide">Guide</label>
        <input
          type="text"
          label="Guide"
          id="guide"
          placeholder="Name of the guide/guides"
          v-model="guide"
        />
      </div>
      <div>
        <label for="date">Date</label>
        <input
          type="text"
          label="Date"
          id="date"
          placeholder="Choose date"
          v-model="date"
        />
      </div>
      <div>
        <label for="seats">Seats</label>
        <input
          type="number"
          label="Number of max participants"
          id="seats"
          placeholder="Set a max number of participants"
          v-model="seats"
        />
      </div>
      <div>
        <label for="days">Days</label>
        <input
          type="number"
          label="Days"
          id="days"
          placeholder="Choose how many days"
          v-model="days"
        />
      </div>
      <div>
        <label for="category">Category</label>
        <input
          type="text"
          label="Category"
          id="category"
          placeholder="Choose category - MTB, Mountain or Sea"
          v-model="category"
        />
      </div>
      <div>
        <label for="price">Price</label>
        <input
          type="text"
          v-model="price"
          label="Price"
          id="price"
          placeholder="Set a price"
        />
      </div>
      <div>
        <label for="level">Level</label>
        <input
          type="text"
          v-model="level"
          label="Level"
          id="level"
          placeholder="Choose level - easy, advanced, experts"
        />
      </div>
      <div class="uploadMain">
        <label>Main Image: </label>
        <button @click.prevent="openWidget('main')">Upload Image</button>
        <div v-if="image">
          <img :src="image" alt="Main" />
        </div>
      </div>

      <div class="upload">
        <div>
          Gallery Image:
          <button @click.prevent="openWidget('one')">Upload Image</button>
          <div v-if="galleryPhotoOne">
            <img :src="galleryPhotoOne" alt="Gallery" />
          </div>
        </div>
        <div>
          Gallery Image:
          <button @click.prevent="openWidget('two')">Upload Image</button>
          <div v-if="galleryPhotoTwo">
            <img :src="galleryPhotoTwo" alt="Gallery" />
          </div>
        </div>
        <div>
          Gallery Image:
          <button @click.prevent="openWidget('three')">Upload Image</button>
          <div v-if="galleryPhotoThree">
            <img :src="galleryPhotoThree" alt="Gallery" />
          </div>
        </div>
        <div>
          Gallery Image:
          <button @click.prevent="openWidget('four')">Upload Image</button>
          <div v-if="galleryPhotoFour">
            <img :src="galleryPhotoFour" alt="Gallery" />
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit!</button>
    </form>
  </main>
</template>

<script>
import Title from "../../components/Title.vue";
import getCookie from "../../helpers/cookie";
export default {
  data() {
    return {
      destination: "",
      country: "",
      description: "",
      guide: "",
      image: "",
      category: "",
      date: "",
      price: "",
      level: "",
      days: "",
      seats: "",
      galleryPhotoFour: "",
      galleryPhotoThree: "",
      galleryPhotoTwo: "",
      galleryPhotoOne: "",
    };
  },
  components: {
    Title,
  },
  methods: {
    async handleSubmit() {
      if (!this.adventureValidator()) {
        return;
      }

      let images = [];
      if (this.galleryPhotoOne) {
        images.push(this.galleryPhotoOne);
      }
      if (this.galleryPhotoTwo) {
        images.push(this.galleryPhotoTwo);
      }
      if (this.galleryPhotoThree) {
        images.push(this.galleryPhotoThree);
      }
      if (this.galleryPhotoFour) {
        images.push(this.galleryPhotoFour);
      }

      await fetch("http://localhost:9999/api/offers/create", {
        method: "POST",
        body: JSON.stringify({
          destination: this.destination,
          country: this.country,
          description: this.description,
          guide: this.guide,
          image: this.image,
          category: this.category,
          date: this.date,
          price: this.price,
          level: this.level,
          days: this.days,
          seats: this.seats,
          galery: images,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("x-auth-token"),
        },
      });

      this.$vToastify.success("Successfully create new adventure!");
      this.$router.push(`/adventures`);
    },
    openWidget(param) {
      const widget = window.cloudinary.openUploadWidget(
        {
          cloudName: "dvk3zertv",
          uploadPreset: "letsgoadventure",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            if (param == "one") {
              this.galleryPhotoOne = result.info.url;
            } else if (param == "two") {
              this.galleryPhotoTwo = result.info.url;
            } else if (param == "three") {
              this.galleryPhotoThree = result.info.url;
            } else if (param == "four") {
              this.galleryPhotoFour = result.info.url;
            } else if (param == "main") {
              this.image = result.info.url;
            }
          }
        }
      );

      widget.open();
    },
    adventureValidator() {
      const allowedCategories = ["MTB", "Mountain", "Sea"];
      const allowedLevels = ["easy", "advanced", "experts"];
      const dateRegex = new RegExp(/[0-9]{2}\s[A-za-z]+\s[0-9]{4}/i);

      if (this.destination.length <= 2 || this.destination === "") {
        this.$vToastify.error(
          "Destionation is required and must be at least 3 characters long"
        );
        return false;
      }

      if (this.country.length <= 2 || this.country === "") {
        this.$vToastify.error(
          "Country is required and must be at least 3 characters long"
        );
        return false;
      }
      if (this.description.length <= 10 || this.description === "") {
        this.$vToastify.error(
          "Description is required and must be at least 10 chars long"
        );
        return false;
      }
      if (this.guide.length <= 2 || this.guide === "") {
        this.$vToastify.error(
          "Guide is required and must be at least 3 characters long"
        );
        return false;
      }
      if (!dateRegex.test(this.date) || this.date === "") {
        this.$vToastify.error(
          "Date is required and must be in format dd month yyyy"
        );
        return false;
      }
      if (this.seats < 0 || this.seats === "") {
        this.$vToastify.error(
          "Maximum number or participants must be positive number"
        );
        return false;
      }
      if (this.days < 0 || this.days === "") {
        this.$vToastify.error("Days must be positive number");
        return false;
      }

      if (this.category === "" || !allowedCategories.includes(this.category)) {
        this.$vToastify.error(
          "Category must be one of the following: MTB, Mountain or Sea"
        );
        return false;
      }
      if (this.price < 0 || this.price === "") {
        this.$vToastify.error("Price must be positive number");
        return false;
      }

      if (this.level === "" || !allowedLevels.includes(this.level)) {
        this.$vToastify.error(
          "Level must be one of the following: easy, advanced or experts"
        );
        return false;
      }

      if (!this.image.startsWith("http")) {
        this.$vToastify.error(
          "Image must be a valid url - please upload valid photo"
        );
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.background {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
    url("../../assets/images/hiking-near-bansko-1000x610.jpg") no-repeat center;
  background-size: cover;
}

.background h4 {
  color: snow;
  text-align: center;
  font-size: 20px;
  font-style: oblique;
  padding-bottom: 2%;
}

.container {
  text-align: center;
}

.container label {
  color: #3498b9;
  font-weight: bold;
  margin-bottom: 8px;
}

.container div {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.container input {
  border: 2px solid #3498b9;
  width: 25%;
  text-align: center;
  padding: 12px 20px;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 0.5rem;
}

.textArea {
  width: 300px;
  height: 100px;
  resize: none;
}

.container .upload {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.upload div {
  color: #3498b9;
  font-weight: bold;
  margin-bottom: 40px;
  font-size: 20px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}

.upload button,
.uploadMain button {
  background: #3498b9;
  color: snow;
  padding: 2%;
  width: 25%;
  border-radius: 15px;
  border: none;
  border: 2px solid white;
  margin: 0px;
  cursor: pointer;
  font-size: 15px;
  transition: all ease-in-out 200ms;
}

.uploadMain button {
  padding: 1%;
}

.upload button:hover,
.container .uploadMain button:hover {
  background-color: white;
  color: #3498b9;
  border: 2px solid #3498b9;

}

.uploadMain {
  align-items: center;
}

.uploadMain img {
  width: 400px;
  margin-top: 16px;
}

.upload img {
  width: 300px;
  margin: auto;
  margin-top: 1rem;
}
</style>