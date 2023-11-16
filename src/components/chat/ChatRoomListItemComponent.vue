<script setup></script>

<template>
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
    </v-row>
  </v-container>
</template>

<style scoped></style>
