<template>
  <section class="navigation">
    <router-link to="/">
      <img src="../assets/images/logo.png" alt="Logo" class="siteTitle" />
    </router-link>

    <nav>
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <div v-if="link.dropdown">
            <div class="dropdown">
              <span class="wrapperProgram">
                <router-link :to="link.link">
                  {{ link.title }}
                </router-link>
              </span>
              <div class="dropdownContent">
                <router-link
                  v-for="(dropEl, index) in link.dropdown"
                  :key="index"
                  :to="dropEl.link"
                >
                  {{ dropEl.title }}
                </router-link>
              </div>
            </div>
          </div>
          <div v-else>
            <router-link :to="link.link">
              {{ link.title }}
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import getNavigation from "../helpers/navigation";

export default {
  data() {
    return {
      links: getNavigation(),
    };
  },
};
</script>

<style scoped>
.navigation {
  display: inline-block;
  position: absolute;
}

.siteTitle {
  font-size: 4px;
  height: auto;
  max-width: 10%;
  left: 10%;
  top: 5%;
  padding-top: 2%;
  padding-left: 7%;
  float: left;
  cursor: pointer;
}

nav ul {
  top: 0;
  float: right;
  padding-top: 2%;
  padding-left: 5%;
}

nav ul li {
  display: inline-block;
  text-decoration: none;
  margin-left: 20px;
  padding-left: 10px;
}

nav ul li a {
  color: snow;
  font-size: 20px;
  text-decoration: none;
}

nav ul li a:hover {
  color: #3498b9;
}

/* Dropdown menu */

.dropdown {
  position: relative;
  display: inline-block;
}

.wrapperProgram {
  margin: 0px;
  padding-bottom: 30px;
}

.dropdownContent {
  display: none;
  /* display: block; */
  position: absolute;
  background-color: transparent;
  border-radius: 12px;
  min-width: 130%;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdownContent a {
  margin-top: 1px;
  color: #3498b9;
  padding: 10px 10px;
  text-decoration: none;
  display: block;
  border-bottom: #3498b9;
  background-color: snow;
}

.dropdownContent a:hover {
  background-color: #3498b9;
  color: snow;
}

.dropdown:hover .dropdownContent {
  display: block;
}
</style>