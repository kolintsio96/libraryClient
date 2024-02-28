<script setup>
import { ref, onBeforeMount } from "vue";
import API from "@/services/api";
const api = new API();

const search = ref("");
const authorsData = ref([]);
const getAuthors = () => {
  let url = "api/Author/list";
  if (search.value) url += `?search=${search.value}`;
  api.get(url).then(({ data }) => {
    if (Array.isArray(data)) {
      authorsData.value = data;
    }
  });
};
onBeforeMount(() => {
  getAuthors();
});
</script>
<template>
  <div class="authors">
    <div class="form-outline mb-4">
      <label class="form-label" for="surname">Enter author name</label>
      <input
        v-model="search"
        type="text"
        id="surname"
        class="form-control"
        @input="getAuthors"
      />
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Surname</th>
          <th scope="col">SecondName</th>
          <th scope="col">Birthday</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authorsData" :key="author.id">
          <th scope="row">{{ author.id }}</th>
          <td>{{ author.name }}</td>
          <td>{{ author.surname }}</td>
          <td>{{ author.secondName }}</td>
          <td>{{ author.birthday }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.authors {
  padding: 30px 0;
  .form-outline {
    max-width: 300px;
    margin: 0 auto 30px auto;
  }
}
</style>
