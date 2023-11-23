<script setup>
import router from "../../router";
import LoginFormModal from "../user/LoginFormModal.vue";
import RegisterFormModal from "../user/RegisterFormModal.vue";
import { useUserStore } from '@/components/stores/user-store'
const userStore = useUserStore()

const logout = function(){
  userStore.logout();
  router.push("/")
}
</script>

<template>
  <v-app-bar flat>
    <v-container class="d-flex header align-center">
      <!-- <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar> -->
      <v-col cols="2">
      <router-link to="/">
        <v-img style="width:200px" src="/src/assets/chatgipt_logo_bg.png"></v-img>
      </router-link>
    </v-col>
      <!-- <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn> -->

      <v-spacer> </v-spacer>
     
      <v-col class="flex-end" v-if="userStore.menuList[0].show">
        <LoginFormModal />
      </v-col>
      <v-col  class = "flex-end" v-if="userStore.menuList[1].show" max-width="80">
        <RegisterFormModal />
      </v-col>
      <v-col  v-if="userStore.menuList[2].show">
      <RouterLink :to="userStore.menuList[2].routeName">
        {{ userStore.menuList[2].name }}
      </RouterLink>
      </v-col>
      <v-col @click=" logout" v-if="userStore.menuList[3].show">
        {{ userStore.menuList[3].name }}
      </v-col>

    </v-container>
  </v-app-bar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap');
::v-deep .header{
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
