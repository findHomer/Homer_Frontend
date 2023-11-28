<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import { ref, onMounted } from "vue";
import { findAllRoom, getMyInfo } from "@/api/chat";
import { storeToRefs } from "pinia";
import { useChatInfoStore } from "@/stores/chatinfo";
const store = useChatRoomStore();
const { enterRoom } = store;
// mock for test
const chatrooms = ref([
  // {
  //   id: 1,
  //   name: "SSAFY 멀티캠퍼스 역삼점",
  //   profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  //   lastUpdated: "2023-04-01 15:23:12",
  //   lastChat:
  //     "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
  //   lastChatter: "백빵돌이",
  // },
]);
// const mockMoreChat = [
//   {
//     id: 5,
//     name: "SSAFY 멀티캠퍼스 역삼점5",
//     profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
//     lastUpdated: "2023-04-01 15:23:12",
//     lastChat:
//       "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
//     lastChatter: "백빵돌이",
//   },
// ];

// const api = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockMoreChat);
//     }, 1000);
//   });
// };

const chatinfo = useChatInfoStore();
const { updatedInfo } = chatinfo;

const load = async ({ done }) => {
  // TODO : 메세지 불러오기 로직 시간 내림차순으로

  // const data = await api();
  const data = ref([]);
  updatedInfo();
  findAllRoom(
    (response) => {
      data.value = response.data;
      //데이터가 없으면
      if (data.value == null || data.value == undefined) {
        done("error");
      } else if (data.value.length <= 0 || data.value.length == chatrooms.value.length) {
        done("empty");
      } else {
        chatrooms.value.push(...data.value);
        done("ok");
      }
    },
    (error) => {
      console.log(error);
      done("error");
    }
  );
};
</script>

<script></script>

<template>
  <v-container style="width: 500px" fluid fill-height>
    <v-row>
      <v-col class="d-flex justify-center">채팅방 목록</v-col>
    </v-row>
    <v-list lines="two">
      <v-infinite-scroll :height="500" :items="chats" :onLoad="load" empty-text="">
        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              문제가 발생하였습니다. <br> 다시 시도해주세요
              <v-btn color="white" variant="outlined" size="small" v-bind="props">
                재시도
              </v-btn>
            </div>
          </v-alert>
        </template>
        <template v-for="chatroom in chatrooms" :key="chatroom.roomId">
          <v-list-item
            :title="chatroom.name"
            :subtitle="
              chatroom.lastChat
                ? `${chatroom.lastChatter} : ${chatroom.lastChat}`
                : undefined
            "
            :prepend-avatar="chatroom.profileUrl"
            @click="enterRoom(chatroom.roomId, chatroom.name)"
          >
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-infinite-scroll>
    </v-list>
  </v-container>
  <div></div>
</template>

<style scoped></style>
