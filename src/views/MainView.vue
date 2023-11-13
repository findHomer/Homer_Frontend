<script setup>
import { ref } from "vue";
import HeadingNavbar from "../components/layout/HeadingNavbar.vue";
import KakaoMapComponent from "@/components/KakaoMapComponent.vue";

const cards = ["Today", "Yesterday"];
const links = [
  ["mdi-inbox-arrow-down", "Inbox"],
  ["mdi-send", "Send"],
  ["mdi-delete", "Trash"],
  ["mdi-alert-octagon", "Spam"],
];

const drawer = ref(null);
</script>

<script>
export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
};
</script>

<template>
  <v-app id="inspire">
    <HeadingNavbar></HeadingNavbar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <KakaoMapComponent />
 
  </v-app>
</template>
