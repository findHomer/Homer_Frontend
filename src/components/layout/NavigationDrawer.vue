<script setup>
import { ref } from "vue";
import ApartDetailComponent from "../detail/ApartDetailComponent.vue";
import SearchBarComponent from "../detail/SearchBarComponent.vue";
const drawer = ref(null);
</script>

<template>

  <v-navigation-drawer width="400" v-model="drawer" disable-resize-watcher :scrim="false">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <SearchBarComponent/>
    </v-sheet>

    <v-divider></v-divider>
    
    <ApartDetailComponent/>
  </v-navigation-drawer>

  
</template>

<style scoped>

</style>
