<script setup>
import API from "@/services/api";
import { ref, onBeforeMount } from "vue";
import router from "@/router";
const email = ref("");
const password = ref("");
const login = ref("");
const name = ref("");
const surname = ref("");
const document = ref();
const documentList = ref([]);
const documentNum = ref();
const librarian = ref();
const librarianList = ref([]);
const isReader = ref(false);
const api = new API();
const onRegister = () => {
  const url = isReader.value ? "api/Reader/register" : "api/Librarian/register";
  let data = {
    Login: login.value,
    Password: password.value,
    Email: email.value,
  };
  if (isReader.value) {
    data = {
      ...data,
      Name: name.value,
      Surname: surname.value,
      DocumentId: document.value,
      DocumentNumber: documentNum.value,
      LibrarianId: librarian.value,
    };
  }
  api
    .post(url, data)
    .then(({ data }) => {
      const dataForSave = isReader.value ? data.reader : data.librarian;
      localStorage.setItem("libraryAccount", JSON.stringify(dataForSave));
      localStorage.setItem("token", JSON.stringify(data.token));
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
    });
};

onBeforeMount(() => {
  api.get("api/Document/list").then(({ data }) => {
    documentList.value = data;
  });
  api.get("api/Librarian/list").then(({ data }) => {
    librarianList.value = data;
  });
});
</script>
<template>
  <form class="register">
    <div class="form-outline mb-4">
      <input v-model="login" type="text" id="login" class="form-control" />
      <label class="form-label" for="login">login</label>
    </div>

    <div class="form-outline mb-4">
      <input
        v-model="email"
        type="email"
        id="form2Example1"
        class="form-control"
      />
      <label class="form-label" for="form2Example1">Email address</label>
    </div>

    <div class="form-outline mb-4">
      <input
        v-model="password"
        type="password"
        id="form2Example2"
        class="form-control"
      />
      <label class="form-label" for="form2Example2">Password</label>
    </div>

    <div class="mb-4 form-check">
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

    <template v-if="isReader">
      <div class="form-outline mb-4">
        <input v-model="name" type="text" id="name" class="form-control" />
        <label class="form-label" for="name">Name</label>
      </div>

      <div class="form-outline mb-4">
        <input
          v-model="surname"
          type="text"
          id="surname"
          class="form-control"
        />
        <label class="form-label" for="surname">Surname</label>
      </div>

      <div class="form-outline mb-4">
        <select v-model="document" id="document" class="form-control">
          <option v-for="item in documentList" :key="item.id" :value="item.id">
            {{ item.type }}
          </option>
        </select>
        <label class="form-label" for="document">Document type</label>
      </div>

      <div class="form-outline mb-4">
        <input
          v-model="documentNum"
          type="text"
          id="documentNum"
          class="form-control"
        />
        <label class="form-label" for="documentNum">Document number</label>
      </div>

      <div class="form-outline mb-4">
        <select v-model="librarian" id="librarian" class="form-control">
          <option v-for="item in librarianList" :key="item.id" :value="item.id">
            {{ item.login }}
          </option>
        </select>
        <label class="form-label" for="librarian">Select librarian</label>
      </div>
    </template>
    <!-- Submit button -->
    <button
      @click="onRegister"
      type="button"
      class="btn btn-primary btn-block mb-4"
    >
      Register
    </button>

    <!-- Register buttons -->
    <div class="text-center">
      <p>Not a member? <router-link to="/login">Login</router-link></p>
    </div>
  </form>
</template>
<style lang="scss">
.register {
  max-width: 500px;
  margin: 30px auto;
  .form-check {
    text-align: left;
  }
  .form-outline {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
