<script setup>
import router from "../../router";
import LoginFormModal from "../user/LoginFormModal.vue";
import RegisterFormModal from "../user/RegisterFormModal.vue";
import { useUserStore } from '@/components/stores/user-store'
const userStore = useUserStore()

const goMypage = function(){
  router.push(userStore.menuList[2].routerName);
}

const logout = function(){
  userStore.logout();
}
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>
      <v-text>Homer</v-text>
      <!-- <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn> -->

      <v-spacer></v-spacer>
      <v-col v-if="userStore.menuList[0].show" max-width="80">
        <LoginFormModal />
      </v-col>
      <v-col v-if="userStore.menuList[1].show" max-width="80">
        <RegisterFormModal />
      </v-col>
      <v-col @click="goMypage" v-if="userStore.menuList[2].show">
        {{ userStore.menuList[2].name }}
      </v-col>

      <v-col @click="logout" v-if="userStore.menuList[3].show">
        {{ userStore.menuList[3].name }}
      </v-col>

    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
