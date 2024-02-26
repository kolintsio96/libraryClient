<script setup>
import API from "@/services/api";
import { ref } from "vue";
import router from "@/router";
const email = ref("newReader@gmail.com");
const password = ref("111");
const api = new API();
const onLogin = () => {
  api
    .post("api/Account/login", {
      Password: password.value,
      Email: email.value,
    })
    .then(({ data }) => {
      localStorage.setItem("libraryAccount", JSON.stringify(data.reader));
      console.log(router);
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<template>
  <form class="login">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="form2Example1">Email address</label>
      <input
        v-model="email"
        type="email"
        id="form2Example1"
        class="form-control"
      />
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="form2Example2">Password</label>
      <input
        v-model="password"
        type="password"
        id="form2Example2"
        class="form-control"
      />
    </div>

    <!-- Submit button -->
    <button
      @click="onLogin"
      type="button"
      class="btn btn-primary btn-block mb-4"
    >
      Sign in
    </button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Not a member? <router-link to="/register">Register</router-link></p>
    </div>
  </form>
</template>

<style lang="scss">
.form-outline {
  text-align: left;
}
.login {
  max-width: 500px;
  margin: 200px auto;
}
</style>
