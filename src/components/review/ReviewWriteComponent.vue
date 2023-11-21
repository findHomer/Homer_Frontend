<script setup>
import { ref } from "vue";
import { postReview } from "../../api/review";
import {jwtDecode} from "jwt-decode";

const props = defineProps({
  token : String,
  aptId : String,
})

const decoded = jwtDecode(props.token);
console.log(decoded.sub);

const rating = ref(3);
const contents = ref("");
const emit = defineEmits([
  "refresh"
])
const reviewPost = () => {
  const params = {
    aptId : props.aptId,
    email: decoded.sub ,
    contents : contents.value,
    starScore : rating.value,
    photoUrl : "", //TODO s3 연결 하기
  }
  postReview(params,
  ({data})=>{
    console.log(data);
    rating.value = 3;
    contents.value = "";
    emit("refresh")
  },
  (error) =>
  {
    console.log(error)
  })
}
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="text-h6 mt-6">리뷰 작성</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <!-- 별점 -->
          <v-rating
            size="x-large"
            density="comfortable"
            :model-value="rating"
            v-model="rating"
            color="orange-lighten-1"
            active-color="orange-lighten-1"
          ></v-rating>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            label="내용"
            name="name"
            :model-value="contents"
            v-model="contents"
            textarea
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn color="primary" @click="reviewPost">작성</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
