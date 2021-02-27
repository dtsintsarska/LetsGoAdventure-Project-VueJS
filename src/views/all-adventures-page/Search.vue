<template>
  <div class="container">
    <form class="form">
      <label htmlFor="name">Search:</label>
      <input
        class="input"
        type="text"
        placeholder="Search for adventure or destination"
      />
      <Button title="Search" href="/adventures/search/name/:name" />
    </form>
  </div>
</template>

<script>
import Button from "../../components/Button-Link.vue";
export default {
  components: {
    Button,
  },
};
</script>

<style>
.container {
  text-align: center;
  background-color: white;
  padding-bottom: 0;
  padding-left: 5%;
}

.form label {
  color: #3498b9;
  font-size: 20px;
  margin: 0px;
  text-align: left;
  padding-right: 2%;
}

.input {
  width: 85%;
  padding: 12px 20px;
  border: 3px solid #3498b9;
  display: inline-block;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 0.5rem;
  text-align: center;
  padding-left: 3%;
}
</style>