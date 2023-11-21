<script setup>
// 타인 말풍선 컴포넌트

// import ProfileComponent from "../layout/ProfileComponent.vue";

const props = defineProps({
  profileUrl: String,
  name: String,
  content: String,
});
</script>

<template>
    <v-row>
      <!-- 프로필사진 -->
      <!-- <v-col cols="1" class="d-flex align-end">
        <ProfileComponent :profile-url="profileUrl" :user-name="props.name" :avatar-size="30" />
      </v-col> -->
      <v-col cols="9">
        <!-- 이름  -->
        <!-- <v-row>
          <v-col>{{ props.name }}</v-col>
        </v-row> -->
        <!-- 내용 -->
        <v-row>
          <v-col>
            <v-card class="chat-bubble pa-3" >
            <span>
              {{ props.content }}
            </span>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<style scoped>
.chat-bubble {
  border: 1px lightgray solid;
  border-radius: 0.7rem;
}
</style>
