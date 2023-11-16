<script setup>
const props = defineProps({
  userName: String,
  createdDate: String,
  contents: String,
  rating: Number,
  imgSrc: String,
});
const avatarSize = 30;
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="3" class="d-flex justify-center">
          <!-- 사용자 프로필 -->
          <v-avatar :size="avatarSize" color="red">
            <template v-if="props.imgSrc == null || props.imgSrc == undefined">
              <span class="text-h5">{{ props.userName.substring(0, 1) }}</span>
            </template>
            <template v-else>
              <v-img :src="props.imgSrc" :alt="props.userName" />
            </template>
          </v-avatar>
        </v-col>

        <!-- 사용자 이름 및 작성 시간, 별점-->
        <v-col>
          <v-row>
            <v-col>
              <!-- 사용자 이름 -->
              <div class="user-name">{{ props.userName }}</div>
            </v-col>
            <v-col class="d-flex pa-1 align-end justify-end">
              <!-- 작성 시간 -->
              <div class="date">{{ props.createdDate }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <!-- 별점 -->
          <v-rating
            :length="5"
            :model-value="props.rating"
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
