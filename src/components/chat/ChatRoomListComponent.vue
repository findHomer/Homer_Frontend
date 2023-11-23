<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import { ref } from "vue";
import { findAllRoom } from "@/api/chat";

import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { onMounted } from "vue";

const userName = ref("");
const message = ref("");
const recvList = ref([]);
let stompClient = null;

const send = () => {
  console.log("Send message:" + message.value);
  if (stompClient && stompClient.connected) {
    const msg = {
      userName: userName.value,
      content: message.value,
    };
    stompClient.send("/receive", JSON.stringify(msg), {});
  }
};

const sendMessage = (e) => {
  if (e.keyCode === 13 && userName.value !== "" && message.value !== "") {
    send();
    message.value = "";
  }
};

const connect = () => {
  const serverURL = "http://localhost:8080/ws-stomp";
  const socket = new SockJS(serverURL);
  stompClient = Stomp.over(socket);
  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
  stompClient.connect(
    {},
    (frame) => {
      // 소켓 연결 성공
      console.log("소켓 연결 성공", frame);
      // 서버의 메시지 전송 endpoint를 구독합니다.
      // 이런 형태를 pub sub 구조라고 합니다.
      stompClient.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);

        // 받은 데이터를 JSON으로 파싱하고 리스트에 넣어줍니다.
        recvList.value.push(JSON.parse(res.body));
      });
    },
    (error) => {
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error);
    }
  );
};

onMounted(() => {
  // App.vue가 생성되면 소켓 연결을 시도합니다.
  connect();
});

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

const load = async ({ done }) => {
  // TODO : 메세지 불러오기 로직 시간 내림차순으로

  // const data = await api();
  const data = ref([]);

  findAllRoom(
    (response) => {
      data.value = response.data;
      console.log("데이터임 : ", data.value.length);
      //데이터가 없으면
      if (data.value == null || data.value == undefined) {
        done("error");
      } else if (data.value.length <= 0) {
        done("empty");
      } else {
        chatrooms.value.push(...data.value);
        console.log("Test", chatrooms);
        done("ok");
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col class="d-flex justify-center">채팅방 목록</v-col>
    </v-row>
    <v-list lines="two">
      <v-infinite-scroll :height="500" :items="chats" :onLoad="load" empty-text="">
        <template v-for="chatroom in chatrooms" :key="chatroom.id">
          <v-list-item
            :title="chatroom.name"
            :subtitle="
              chatroom.lastChat
                ? `${chatroom.lastChatter} : ${chatroom.lastChat}`
                : undefined
            "
            :prepend-avatar="chatroom.profileUrl"
            @click="enterRoom(chatroom.id, chatroom.name)"
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
