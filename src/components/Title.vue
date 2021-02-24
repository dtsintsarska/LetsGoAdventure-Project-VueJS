<template>
  <h1 class="title">{{title}}</h1>
</template>

<script>
export default {
    props: {
        title: {
            required: true,
            type: String
        }
    }

}
</script>

<style scoped>
.title {
    text-align: center;
    color: snow;
    text-decoration: underline;
    margin: 0%;
    margin-bottom: 4%;
    padding-top: 13%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 35px;
}

</style>