<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import {ref} from 'vue'
const store = useChatRoomStore();
const { enterRoom } = store;

// mock for test
const chatrooms = ref([
  {
    id: 1,
    name: "SSAFY 멀티캠퍼스 역삼점",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 2,
    name: "SSAFY 멀티캠퍼스 역삼점2",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 3,
    name: "SSAFY 멀티캠퍼스 역삼점3",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 4,
    name: "SSAFY 멀티캠퍼스 역삼점4",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 5,
    name: "SSAFY 멀티캠퍼스 역삼점5",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 6,
    name: "SSAFY 멀티캠퍼스 역삼점6",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 7,
    name: "SSAFY 멀티캠퍼스 역삼점7",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
]);

const mockMoreChat=[
  {
    id: 5,
    name: "SSAFY 멀티캠퍼스 역삼점5",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 6,
    name: "SSAFY 멀티캠퍼스 역삼점6",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
  {
    id: 7,
    name: "SSAFY 멀티캠퍼스 역삼점7",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
    lastUpdated: "2023-04-01 15:23:12",
    lastChat:
      "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    lastChatter: "백빵돌이",
  },
]

const api = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMoreChat);
    }, 1000);
  });
};

const load = async ({ done }) => {
  // TODO : 메세지 불러오기 로직 시간 내림차순으로

  const data = await api();

  //데이터가 없으면
  if (data == null || data == undefined) {
    done("error");
  } else if (data.length <= 0) {
    done("empty");
  } else {
    chatrooms.value.push(...data)
    done("ok");
  }
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
