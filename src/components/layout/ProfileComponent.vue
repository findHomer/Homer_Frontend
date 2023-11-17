<script setup>
const props = defineProps({
  profileUrl: String,
  userName: String,
  avatarSize: Number,
});
</script>

<template>
  <div>
    <template v-if="profileUrl != null && profileUrl != ''">
      <v-avatar :size="avatarSize" color="red">
        <template v-if="props.profileUrl == null || props.profileUrl == undefined">
          <span class="text-h5">{{ props.userName[0] }}</span>
        </template>
        <template v-else>
          <v-img :src="props.profileUrl" :alt="props.userName" />
        </template>
      </v-avatar>
    </template>
    <template v-else>
      <v-img :src="props.profileUrl" :alt="props.userName" />
    </template>
  </div>
</template>

<style scoped></style>
