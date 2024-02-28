<script setup>
import { ref, onBeforeMount } from "vue";
import API from "@/services/api";
const api = new API();

const booksData = ref([]);
const getBooks = () => {
  api.get("api/Book/list").then(({ data }) => {
    if (Array.isArray(data)) {
      booksData.value = data;
    }
  });
};
const takeBook = (bookId) => {
  const user = JSON.parse(localStorage.getItem("libraryAccount"));
  api
    .post("api/History/add", {
      bookId: bookId,
      readerId: user.id,
      takeDate: new Date(),
      bookingTime: 20,
    })
    .then(({ data }) => {
      if (Array.isArray(data)) {
        booksData.value = data;
      }
    });
};
onBeforeMount(() => {
  getBooks();
});
</script>
<template>
  <div class="books">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Publish key</th>
          <th scope="col">Publish year</th>
          <th scope="col">Publish country</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in booksData" :key="book.id">
          <th scope="row">{{ book.id }}</th>
          <td>{{ book.name }}</td>
          <td>{{ book.publishKey }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.country }}</td>
          <td>
            <button
              @click="() => takeBook(book.id)"
              type="button"
              class="btn btn-primary btn-block mb-4"
            >
              Take
            </button>
          </td>
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
