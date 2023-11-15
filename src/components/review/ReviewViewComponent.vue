<script setup>
const props = defineProps({
  userName: String,
  createdDate: Date,
  contents: String,
  rating: Number,
  imgSrc: String,
});
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <!-- 사용자 프로필 -->
          <v-avatar size="avatarSize" color="red">
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
              <div>{{ props.userName }}</div>
            </v-col>
            <v-col>
              <!-- 작성 시간 -->
              <div>{{ props.createdDate }}</div>
            </v-col>
          </v-row>
          <v-row>
            <!-- 별점 -->
            <v-rating
              :model-value="props.rating"
              color="orange-lighten-1"
              active-color="orange-lighten-1"
              readonly
            ></v-rating>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="props.contents != null && props.contents != undefined">
          <v-card :text="props.contents" variant="outlined"> </v-card>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
