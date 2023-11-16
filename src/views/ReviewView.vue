<script setup>
import ReviewViewComponent from "../components/review/ReviewViewComponent.vue";
import ReviewWriteComponent from "../components/review/ReviewWriteComponent.vue";
import ReviewCardComponent from "../components/review/ReviewCardComponent.vue";
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
      <v-col>
        <ReviewWriteComponent />
      </v-col>
    </v-row>
    <v-divider :thickness="2" class="my-6"></v-divider>
    <!-- <v-row>
      <v-col> <ReviewCardComponent /></v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <div class="text-h6 mb-6">리뷰 목록</div>
      </v-col>
    </v-row>
    <v-divider class="mx-8"></v-divider>
    <v-virtual-scroll :items="reviews" height="700">
      <template v-slot:default="review">
        <v-row>
          <v-col>
            <ReviewViewComponent v-bind="review.item" />
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
    <!-- <template v-for="review in reviews" :key="review.createDate">
      <v-row>
        <ReviewViewComponent v-bind="review" />
      </v-row> -->
    <!-- </template> -->
  </v-container>
</template>

<style scoped></style>
