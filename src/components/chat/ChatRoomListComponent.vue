<script setup>

// mock for test
const chatrooms = [
  {
    id: 1,
    name: "SSAFY 멀티캠퍼스 역삼점",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 2,
    name: "SSAFY 멀티캠퍼스 역삼점",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
];

const emit = defineEmits(["enter"]);

const enter = (id) => {
  console.log("enter the room : ", id);
  emit("enter", id);
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">채팅방 목록</v-col>
    </v-row>

    <v-list lines="two">

      <template v-for="chatroom in chatrooms" :key="chatroom.id">
      <v-list-item
      :title="chatroom.name"
      :subtitle="chatroom.lastChat ? `${chatroom.lastChatter} : ${chatroom.lastChat}` : undefined"
      :prepend-avatar="chatroom.profileUrl"
      @click="enter(chatroom.id)"
      ></v-list-item>

      <v-divider></v-divider>
    </template>
    </v-list>
  
  </v-container>
  <div></div>
</template>

<style scoped></style>
