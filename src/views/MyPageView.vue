<script setup>
import { ref } from "vue";
import BookmarkComponent from "../components/mypage/BookmarkComponent.vue";
import MypageComponent from "../components/mypage/MypageComponent.vue";
const tab = ref(null);
</script>

<template>
  <v-card >
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">마이페이지</v-tab>
      <v-tab :value="2">즐겨찾기</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <MypageComponent />
      </v-window-item>
      <v-window-item :value="2">
        <BookmarkComponent />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
.v-window__container {
    height: 100%
  }
</style>
