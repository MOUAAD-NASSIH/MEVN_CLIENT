<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              v-model="post.title"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Category"
              prepend-icon="mdi-view-list"
              v-model="post.category"
              :rules="rules"
            ></v-text-field>
            <v-textarea
              label="Content"
              prepend-icon="mdi-note-plus"
              v-model="post.content"
              :rules="rules"
            ></v-textarea>
            <v-file-input
              accept="image/*"
              :rules="rules"
              @change="selectFile"
              show-size
              counter
              label="Select Image"
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="blue">Add Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePostsStore } from "../stores/posts.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const { addPost } = usePostsStore();
const router = useRouter();

const form = ref(null);
const rules = ref([
  (value) => {
    if (value) return true;
    else return "This field is required.";
  },
]);
const image = ref("");
const post = ref({
  title: "",
  category: "",
  content: "",
  image: "",
});

const selectFile = (e) => {
  image.value = e.target.files[0];
};
const submitForm = async () => {
  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("title", post.value.title);
  formData.append("category", post.value.category);
  formData.append("content", post.value.content);
  // console.log(Array.from(formData));
  if (form.value.validate()) {
    if (image.value) {
      const res = await addPost(formData);
      router.push({ name: "home", query: { message: res.message } });
    }
  }
};
</script>
