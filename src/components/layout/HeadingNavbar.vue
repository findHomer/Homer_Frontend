<script setup>
import { ref } from "vue";
import LoginFormModal from "../LoginFormModal.vue";

const links = ref(["Dashboard", "Messages", "Profile", "Updates"]);
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>

      <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="160">
        <!-- <v-text-field
          density="compact"
          flat
          hide-details
          label="Search"
          rounded="lg"
          single-line
          variant="solo-filled"
        ></v-text-field> -->
        <LoginFormModal />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
