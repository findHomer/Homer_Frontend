<script setup>
const props = defineProps({
  imgSrc: String,
  name: String,
  lastUpdated: String,
  lastChatter: String,
  lastChat: String,
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" class="d-flex justify-center">
        <!-- 채팅방 프로필 -->
        <v-avatar :size="avatarSize" color="red">
          <template v-if="props.imgSrc == null || props.imgSrc == undefined">
            <span class="text-h5">{{ props.userName.substring(0, 1) }}</span>
          </template>
          <template v-else>
            <v-img :src="props.imgSrc" :alt="props.name" />
          </template>
        </v-avatar>
      </v-col>
      <!-- 채팅방 이름, 최근 보낸 시간, 최근 채팅 기록  -->
      <v-col>
        <v-row>
          <v-col cols="10">{{ props.name }}</v-col>
          <v-col cols="1">{{ props.lastUpdated }}</v-col>
        </v-row>
        <v-row>
          <v-col>{{ props.lastChatter }} : {{ props.lastChat }}</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
