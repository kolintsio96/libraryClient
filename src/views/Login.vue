<script setup>
import API from "@/services/api";
import { ref } from "vue";
import router from "@/router";
const email = ref("");
const password = ref("");
const isReader = ref(false);
const api = new API();
const onLogin = () => {
  api
    .post("api/Account/login", {
      Password: password.value,
      Email: email.value,
      isReader: isReader.value,
    })
    .then(({ data }) => {
      localStorage.setItem("libraryAccount", JSON.stringify(data.account));
      localStorage.setItem("token", JSON.stringify(data.token));
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

    <div class="form-outline mb-4 form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="isReader"
        id="flexCheckChecked"
      />
      <label class="form-check-label" for="flexCheckChecked">
        I am reader
      </label>
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
