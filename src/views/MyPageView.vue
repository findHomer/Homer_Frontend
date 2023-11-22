<script setup>
import { ref } from "vue";
import BookmarkComponent from "../components/mypage/BookmarkComponent.vue";
import MypageComponent from "../components/mypage/MypageComponent.vue";

const tab = ref(null);
</script>

<template>
  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
    <v-tab :value="1">마이페이지</v-tab>
    <v-tab :value="2">즐겨찾기</v-tab>
  </v-tabs>

  <v-container class="d-flex flex-column" fluid>
    <v-row align="center">
      <v-col>
        <v-window class="pa-1" v-model="tab">
          <v-window-item :value="1">
            <MypageComponent />
          </v-window-item>
          <v-window-item :value="2">
            <BookmarkComponent />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
  </v-container>

</template>
<style scoped>

</style>
