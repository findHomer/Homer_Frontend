<script setup>
import ReviewItemComponent from "@/components/review/ReviewItemComponent.vue";
import ReviewWriteComponent from "./ReviewWriteComponent.vue";
// import ReviewCardComponent from "../components/review/ReviewCardComponent.vue";
import { ref, onMounted, computed } from "vue";
import { getReviews, deleteReview } from "../../api/review";
import { localAxios } from "../../util/http-commons";
import { jwtDecode } from "jwt-decode";

const local = localAxios();
const token = local.defaults.headers.common['Authorization']
// const token = "eyJraWQiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZ2QxMjNAbmF2ZXIuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDA1NDY5MDMsImV4cCI6MTcwMDU1MDUwM30.TATq-OYeN-YlRIzkUVWjdW8BTpP0wQlP4Iw_mS9tHI8"
const userEmail = token ? jwtDecode(token).sub : null;

const props = defineProps({
  aptId: String,
});

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
const aptId = props.aptId;

onMounted(() => {
  // getReviewList(props.aptId);
  getReviewList(aptId)
});

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
      getReviewList(aptId);
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
