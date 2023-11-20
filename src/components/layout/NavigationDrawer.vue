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
  <v-navigation-drawer width="400" v-model="drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <SearchBarComponent/>
    </v-sheet>

    <v-divider></v-divider>
    
    <ApartDetailComponent/>
  </v-navigation-drawer>

  
</template>

<style scoped>

</style>
