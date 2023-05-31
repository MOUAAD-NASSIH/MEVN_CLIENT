<template>
  <v-btn class="ml-4 mt-3" size="small" color="blue" @click="router.back()"
    >go back</v-btn
  >
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="'http://localhost:5000/' + post.image"></v-img>
          <v-card-actions class="pb-0">
            <v-row class="mt-1">
              <v-col sm="2" class="my-1"
                ><v-btn size="small" variant="outlined" color="blue">{{
                  post.category
                }}</v-btn></v-col
              >
              <v-col sm="10" class="d-flex justify-end">
                <v-btn
                  variant="tonal"
                  size="small"
                  color="success"
                  :to="{ name: 'edit-post', params: { id: post._id } }"
                  >Edit</v-btn
                >
                <v-btn
                  variant="tonal"
                  size="small"
                  color="red"
                  @click="removePost(post._id)"
                  >Delete</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{ post.content }}</p>
            <p>{{ transformDate(post.created) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "../stores/posts";
import Swal from "sweetalert2";

const { getPostByID, deletePost } = usePostsStore();

const routes = useRoute();
const router = useRouter();

const post = ref({});
const id = routes.params.id;

function transformDate(dateString) {
  let date = new Date(dateString);
  let transformedYear = date.getFullYear();
  let transformedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  let transformedDay = date.getDate().toString().padStart(2, "0");
  let transformedHours = date.getHours().toString().padStart(2, "0");
  let transformedMinutes = date.getMinutes().toString().padStart(2, "0");
  return (
    transformedYear +
    "-" +
    transformedMonth +
    "-" +
    transformedDay +
    " / " +
    transformedHours +
    ":" +
    transformedMinutes
  );
}

async function removePost(id) {
  const result = await Swal.fire({
    title: "Are you sur you want to delete this item ?",
    icon: "question",
    iconHtml: "?",
    confirmButtonText: "YES",
    cancelButtonText: "NO",
    showCancelButton: true,
    showCloseButton: true,
  });
  if (result.isConfirmed) {
    const res = await deletePost(id);
    router.push({ name: "home", query: { message: res.message } });
  }
}

onMounted(() => {
  const fetchPost = async () => {
    post.value = await getPostByID(id);
  };
  fetchPost();
});
</script>
