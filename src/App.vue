<script setup>
import { ref, onBeforeMount } from "vue";
import router from "@/router";

const user = ref("");
const isReader = ref(false);
const logOut = () => {
  localStorage.removeItem("libraryAccount");
  router.push({ name: "login" });
};
onBeforeMount(() => {
  user.value = JSON.parse(localStorage.getItem("libraryAccount"));
  isReader.value = Object.hasOwn(user.value, "documentTypeId");
});
</script>
<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-end py-3 mb-4 border-bottom"
    >
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <template v-if="isReader">
          <li><router-link to="/authors">Authors</router-link></li>
          <li><router-link to="/books">Books</router-link></li>
          <li><router-link to="/history">History</router-link></li>
        </template>
      </ul>
      <div
        class="col-md-3 text-end d-flex justify-content-end align-items-center"
      >
        <span class="d-inline-block px-3">Hello {{ user.name }}</span>
        <button type="button" class="btn btn-primary" @click="logOut">
          Log out
        </button>
      </div>
    </header>
    <router-view />
  </div>
</template>
