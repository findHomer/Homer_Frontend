<script setup>
import ChatRoomListItemComponent from "./ChatRoomListItemComponent.vue";

// mock for test
const chatrooms = [
  { id: 1, name: "SSAFY 멀티캠퍼스 역삼점" },
  { id: 2, name: "SSAFY 멀티캠퍼스 역삼점" },
];

const emit = defineEmits(["enter"]);

const enter = (id) => {
  console.log("enter the room : ", id);
  emit("enter", id);
};
</script>

<template>
  <div>
    <template v-for="chatroom in chatrooms" :key="chatroom.id">
      <ChatRoomListItemComponent v-bind="chatroom" @click="enter(chatroom.id)" />
      <v-divider></v-divider>
    </template>
  </div>
</template>

<style scoped></style>
