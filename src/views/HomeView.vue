<template>
  <v-container>
    <v-alert
      type="success"
      closable
      :text="route.query.message"
      variant="tonal"
      class="mb-4"
      v-if="route.query.message"
    ></v-alert>
    <v-row>
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
          <v-img
            height="250"
            :src="'https://mevn-api-0hdw.onrender.com/' + post.image"
          ></v-img>
          <!-- :src="'http://localhost:5000/' + post.image" -->
          <v-btn class="ml-4 mt-3" size="small" variant="outlined" color="blue">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="py-0">
            {{ post.content.substring(0, 100) + "..." }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../stores/posts";

const store = usePostsStore();
const { posts } = storeToRefs(store);
const { getAllPosts } = store;
const route = useRoute();

onMounted(() => {
  const fetchPosts = async () => {
    posts.value = await getAllPosts();
  };
  fetchPosts();
});
</script>
