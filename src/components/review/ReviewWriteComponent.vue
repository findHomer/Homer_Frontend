<script setup>
import { ref } from "vue";
import { postReview } from "../../api/review";
import { jwtDecode } from "jwt-decode";

const props = defineProps({
  token: String,
  aptId: String,
});

const decoded = jwtDecode(props.token);

const rating = ref(3);
const contents = ref("");
const image = ref(null);
const imageUrl = ref(null);

const previewImage = () => {
  imageUrl.value = URL.createObjectURL(image.value[0]);
};
const emit = defineEmits(["refresh"]);
const reviewPost = () => {
  const params = {
    aptId: props.aptId,
    email: decoded.sub,
    contents: contents.value,
    starScore: rating.value,
  };
  postReview(
    params,
    image,
    ({ data }) => {
      console.log(data);
      rating.value = 3;
      contents.value = "";
      emit("refresh");
    },
    (error) => {
      console.log(error);
    }
  );
};
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
        <v-col align="center">
          <v-img
            max-width="400"
            v-if="imageUrl"
            :src="imageUrl"
            alt="사진 프리뷰"
            cover
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-file-input
            :rules="rules"
            @change="previewImage"
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="사진을 올려주세요"
            prepend-icon="mdi-camera"
            label="프로필 업로드"
            @click:clear="imageUrl = ''"
          >
          </v-file-input>
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
