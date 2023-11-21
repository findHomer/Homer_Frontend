<script setup>
const props = defineProps({
  profileUrl: String,
  userName: String,
  avatarSize: Number,
});
</script>

<template>
  <div>
      <v-avatar :size="avatarSize" color="red">
        <template v-if="props.profileUrl == null || props.profileUrl == undefined || props.profileUrl==''">
          <span class="text-h5">{{ props.userName[0] }}</span>
        </template>
        <template v-else>
          <v-img :src="props.profileUrl" :alt="props.userName" cover />
        </template>
      </v-avatar>

  </div>
</template>

<style scoped></style>
