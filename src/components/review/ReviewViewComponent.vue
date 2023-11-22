<script setup>
import ReviewItemComponent from "@/components/review/ReviewItemComponent.vue";
import ReviewWriteComponent from "./ReviewWriteComponent.vue";
// import ReviewCardComponent from "../components/review/ReviewCardComponent.vue";
import { ref, onMounted, computed, watch } from "vue";
import { getReviews, deleteReview } from "../../api/review";
import { storeToRefs } from "pinia";

import { jwtDecode } from "jwt-decode";
import { token , useUserStore } from "@/components/stores/user-store"

const userEmail = token.value ? jwtDecode(token.value).sub : null;
const store = useUserStore();
const reviews = ref([]);

const reviewsByCreatedAt = computed(() => {
  return reviews.value.toSorted((b, a) => {
    const a_date = new Date(a.createdAt);
    const b_date = new Date(b.createdAt);

    if (a_date == b_date) {
      return a.reviewId - b.reviewId;
    } else {
      return a_date - b_date;
    }
  });
});

// const aptId = "A10022970";
// const aptId = props.aptId;
const {aptId} = storeToRefs(store)

onMounted(() => {
  getReviewList(aptId.value)
});

watch(aptId, () => {
  getReviewList(aptId.value)
})

const getReviewList = (aptId) => {
  getReviews(
    aptId,
    ({ data }) => {
      reviews.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const deleteMyReview = (reviewId) => {
  deleteReview(
    reviewId,
    ({data}) =>{
      console.log(data);
      getReviewList(aptId.value);
    },
    (error) =>{
      console.log(error);
    }
  )
}
</script>
<template>
  <v-container fluid>
    <template v-if="token">
      <v-row>
        <v-col>
          <ReviewWriteComponent :token="token" :apt-id="aptId" @refresh="getReviewList(aptId)" />
        </v-col>
      </v-row>
      <v-divider :thickness="2" class="my-6"></v-divider>
    </template>

    <!-- <v-row>
      <v-col> <ReviewCardComponent /></v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <div class="text-h6 mb-6">리뷰 목록</div>
      </v-col>
    </v-row>
    <v-divider class="mx-8"></v-divider>
    <v-virtual-scroll :items="reviewsByCreatedAt" height="700">
      <template v-slot:default="review">
        <v-row>
          <v-col>
            <ReviewItemComponent v-bind="review.item"/>
            <template v-if="userEmail == review.item.email">
            <v-row>
            <v-spacer></v-spacer>
              <v-col class="d-flex justify-end mx-4">
                <v-btn class="mx-1" color="red" @click="deleteMyReview(review.item.reviewId)">삭제</v-btn>
              </v-col>
            </v-row>
            
            </template>
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
  </v-container>
</template>

<style scoped></style>
