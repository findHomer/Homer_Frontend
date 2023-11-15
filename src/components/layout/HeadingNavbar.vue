<script setup>
import LoginFormModal from "../user/LoginFormModal.vue";
import RegisterFormModal from "../user/RegisterFormModal.vue";
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>
      <v-text>Homer</v-text>
      <!-- <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn> -->

      <v-spacer></v-spacer>
      <v-responsive max-width="80">
        <LoginFormModal />
      </v-responsive>
      <v-responsive max-width="80">
        <RegisterFormModal />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
