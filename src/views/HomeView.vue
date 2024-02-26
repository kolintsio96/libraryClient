<script setup>
import { ref, onBeforeMount } from "vue";
import router from "@/router";

const user = ref("");
const logOut = () => {
  localStorage.removeItem("libraryAccount");
  router.push({ name: "login" });
};
onBeforeMount(() => {
  user.value = JSON.parse(localStorage.getItem("libraryAccount"));
});
</script>
<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-end py-3 mb-4 border-bottom"
    >
      <div
        class="col-md-3 text-end d-flex justify-content-end align-items-center"
      >
        <span class="d-inline-block px-3">Hello {{ user.name }}</span>
        <button type="button" class="btn btn-primary" @click="logOut">
          Log out
        </button>
      </div>
    </header>
  </div>
</template>
