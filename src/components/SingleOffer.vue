<template>
  <div class="offer">
    <img :src="item.image" alt="Adventure" />
    <div class="info">
      <div>
        <h3>{{ item.destination }}</h3>
        <p>{{ item.date }}</p>
      </div>
      <div>
        <p>{{ item.days }} days</p>
      </div>
    </div>
    <div class="more">
      <p><strong>Country</strong>: {{ item.country }}</p>
      <p><strong>Guide</strong>: {{ item.guide }}</p>
      <p><strong>Category</strong>: {{ item.category }}</p>
      <div class="buttons">
        <div>
          <Button  title='See more' :href="'/adventures/'+ item._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button-Link.vue'
export default {
  components: {
    Button
  },
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.offer {
  text-decoration: none;
}

.offer img {
  width: 100%;
  height: 300px;
  border-radius: 6px;
}

.info {
  padding-bottom: 10px;
  border-bottom: 2px solid #5a7c8a;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info div:nth-child(1) {
  display: inline-block;

  text-align: left;
}

.info div:nth-child(2) {
  display: inline-block;
  width: 56px;
  text-align: center;
  font-size: 20px;
  background: #3498b9;
  color: white;
}

.info p,
.info h3 {
  margin: 2px 0;
}

.more p {
  text-align: left;
  padding: 0;
  margin: 4px 0;
}

.button {
  padding: 8px 12px;
  font-size: 18px;
  color: #3498b9;
  background: transparent;
  border: none;
  border: 2px solid #3498b9;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: 200ms ease-in-out;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background: #3498b9;
  color: white;
  transform: translateY(-4px);
}

</style>