<script setup>
import ReviewViewComponent from "../components/review/ReviewViewComponent.vue";
import ReviewWriteComponent from "../components/review/ReviewWriteComponent.vue";

const reviews = [
  {
    userName: "test",
    createdDate: "2023-03-01",
    contents: "아주 좋습니다.^^ 굿굿",
    rating: 1,
    imgSrc: null,
  },
  {
    userName: "test2",
    createdDate: "2023-03-01",
    contents: "아주 좋습니다.^^ 굿굿",
    rating: 3,
    imgSrc: null,
  },
  {
    userName: "test3",
    createdDate: "2023-03-01",
    contents: "아주 좋습니다.^^ 굿굿",
    rating: 2,
    imgSrc: null,
  },
  {
    userName: "test4",
    createdDate: "2023-03-01",
    contents: "아주 좋습니다.^^ 굿굿",
    rating: 3,
    imgSrc: null,
  },
  {
    userName: "test5",
    createdDate: "2023-03-01",
    contents: "아주 좋습니다.^^ 굿굿",
    rating: 3,
    imgSrc: null,
  },
];
</script>

<template>
  <v-container fluid>
    <v-row>
      <ReviewWriteComponent />
    </v-row>

    <template v-for="review in reviews" :key="review.createDate">
      <v-row>
        <ReviewViewComponent v-bind="review" />
      </v-row>
    </template>
  </v-container>
</template>

<style scoped></style>
