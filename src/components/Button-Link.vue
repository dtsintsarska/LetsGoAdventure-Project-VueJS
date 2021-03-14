<template>
  <router-link :to="href">
    <button type="button" class="btn">
      {{ title }}
    </button>
  </router-link>
</template>

<script>
export default {
  props: {
    href: {
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
.btn {
  background: #3498b9;
  color: snow;
  padding: 1%;
  width: 120px;
  border-radius: 15px;
  border: none;
  border: 2px solid white;
  margin-top: 10px;
  cursor: pointer;
  font-size: 17px;
  padding-top: 12px;
  padding-bottom: 12px;
  transition: all ease-in-out 200ms;
  outline: none;
}

.btn:hover {
  background-color: #fff;
  border: 2px solid #3498b9;
  color: #3498b9;
  box-shadow: 5px 5px 16px 5px rgba(51,82,255,0.36);
}
</style>