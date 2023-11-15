<script setup>
import ReviewViewComponent from "../components/review/ReviewViewComponent.vue";
import ReviewWriteComponent from "../components/review/ReviewWriteComponent.vue";
</script>

<template>
  <v-container fluid>
    <v-row>
      <ReviewWriteComponent />
    </v-row>
    <v-row>
      <template v-for="review in reviews" :key="review.createDate">
        <ReviewViewComponent />
      </template>
    </v-row>
  </v-container>
</template>

<style scoped></style>
