<script setup>
import { ref } from "vue";
import ApartDetailComponent from "../detail/ApartDetailComponent.vue";
import SearchBarComponent from "../detail/SearchBarComponent.vue";
import ReviewViewComponent from "@/components/review/ReviewViewComponent.vue";
const drawer = ref(null);

const tab= ref(null);
</script>

<template>

  <v-navigation-drawer width="400" v-model="drawer" :disable-resize-watcher="true" permanent :scrim="false">
    <v-sheet color="grey-lighten-4">
      <SearchBarComponent/>
    </v-sheet>

    <v-divider></v-divider>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
    <v-tab :value="1">아파트 정보</v-tab>
    <v-tab :value="2">리뷰</v-tab>
  </v-tabs>
    <v-window v-model="tab">
    <v-window-item :key="1" :value="1">
    
      <ApartDetailComponent/>
    
    </v-window-item>

    <v-window-item :key="2" :value="2">
    
      <ReviewViewComponent/>
   
    </v-window-item>
  </v-window>
    
  </v-navigation-drawer>

  
</template>

<style scoped>

</style>
