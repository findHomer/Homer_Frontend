<script setup>
import ProfileComponent from "../layout/ProfileComponent.vue";
const props = defineProps({
  reviewId : String,
  nickname: String,
  createdAt: Date,
  contents: String,
  starScore: Number,
  photoUrl: String,
  profileUrl: String,
});
const createdAt = new Date(props.createdAt);
</script>

<template>
  <div>
    <v-container class="pa-5" fluid>
      <v-row>
        <v-col cols="3" class="d-flex justify-center">
          <!-- 사용자 프로필 -->
          <ProfileComponent
            :profile-url="props.profileUrl"
            :avatar-size="50"
            :user-name="props.nickname"
          />
        </v-col>

        <!-- 사용자 이름 및 작성 시간, 별점-->
        <v-col class="d-flex align-center">
          <v-row>
            <v-col>
              <!-- 사용자 이름 -->
              <div class="user-name">{{ props.nickname }}</div>
            </v-col>
            <v-col class="d-flex align-end justify-end">
              <!-- 작성 시간 -->
              <div class="date">
                {{ createdAt.getFullYear()}}/{{ createdAt.getMonth() + 1}}/{{ createdAt.getDate()}}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <!-- 첨부 사진  -->
      <template v-if="props.photoUrl != null && props.photoUrl != undefined && props.photoUrl != ''">
        <v-row>
          <v-col>
            <v-img
              :src="props.photoUrl"
              height="200"
              cover
              :aspect-ratio="1"
            >
            </v-img>
          </v-col>
        </v-row>
      </template>
      <v-row>
        <v-col class="d-flex justify-center pa-0">
          <!-- 별점 -->
          <v-rating
            :length="5"
            size="x-large"
            density="comfortable"
            :model-value="props.starScore"
            color="orange"
            active-color="orange-lighten-1"
            readonly
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="justify-center">
          <template v-if="props.contents != null && props.contents != undefined">
            <v-card :text="props.contents" variant="outlined"> </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.date {
  font-size: 0.7rem;
}
</style>
