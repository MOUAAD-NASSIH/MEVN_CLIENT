<template>
  <v-app id="inspire">
    <!-- navigation bar -->
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <v-list-item-title> YUSHA POSTS </v-list-item-title>
        <v-list-item-subtitle> MEVN FULL STACK APP </v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="blue"
          @click="router.push(item.link)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- sidebar -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content-->
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const drawer = ref(null);
const items = ref([
  { title: "Home", icon: "mdi-home", link: "/" },
  { title: "Add Post", icon: "mdi-note-plus", link: "/add-post" },
  { title: "About", icon: "mdi-help-box", link: "/about" },
]);
</script>
