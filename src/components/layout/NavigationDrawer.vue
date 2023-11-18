<script setup>
import { ref } from "vue";
import ApartDetailComponent from "../detail/ApartDetailComponent.vue";
import SearchBarComponent from "../detail/SearchBarComponent.vue";
const drawer = ref(null);
const links = [
  ["mdi-inbox-arrow-down", "Inbox"],
  ["mdi-send", "Send"],
  ["mdi-delete", "Trash"],
  ["mdi-alert-octagon", "Spam"],
];
</script>

<template>
  <v-navigation-drawer width="400" v-model="drawer" disable-resize-watcher :scrim="false">
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
    <SearchBarComponent/>
    <ApartDetailComponent/>
  </v-navigation-drawer>

  
</template>

<style scoped>

</style>
