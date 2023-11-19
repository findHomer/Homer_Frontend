`
<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import { storeToRefs } from "pinia";
import ChatNotifyComponent from "./ChatNotifyComponent.vue";
import ChatInputComponent from "./ChatInputComponent.vue";
import { useChatInfoStore } from "../../stores/chatinfo";
import ChatBubbleMeComponent from "./ChatBubbleMeComponent.vue";
import ChatBubbleOthersComponent from "./ChatBubbleOthersComponent.vue";

const store = useChatRoomStore();
const chatstore = useChatInfoStore();
const { roomName } = storeToRefs(store);
const { exitRoom } = store;
const { chats } = storeToRefs(chatstore);

// mock
const userId = 1;

chats.value = [
  {
    chatId: 1,
    userId: 2,
    name: "arceon",
    content: "안녕하세요!!",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },
  {
    chatId: 2,
    userId: 3,
    name: "헬로월드",
    content: "안녕하세요!!",
    profileUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    chatId: 3,
    userId: 2,
    name: "신예지",
    content: "무엇이 궁금하신가요?",
    profileUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    chatId: 4,
    userId: 1,
    name: "백빵돌이",
    content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },

  {
    chatId: 5,
    userId: 2,
    name: "arceon",
    content: "안녕하세요!!",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },
  {
    chatId: 6,
    userId: 3,
    name: "헬로월드",
    content: "안녕하세요!!",
    profileUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    chatId: 7,
    userId: 2,
    name: "신예지",
    content: "무엇이 궁금하신가요?",
    profileUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    chatId: 8,
    userId: 1,
    name: "백빵돌이",
    content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },

];

const mockMoreChat=[
  {
    chatId: 9,
    userId: 2,
    name: "arceon",
    content: "안녕하세요!!",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },
  {
    chatId: 10,
    userId: 3,
    name: "헬로월드",
    content: "안녕하세요!!",
    profileUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    chatId: 11,
    userId: 2,
    name: "신예지",
    content: "무엇이 궁금하신가요?",
    profileUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    chatId: 12,
    userId: 1,
    name: "백빵돌이",
    content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
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
    chats.value.push(...data)
    done("ok");
  }
};
</script>

<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="2">
        <v-icon @click="exitRoom">mdi-arrow-left</v-icon>
      </v-col>
      <v-col>
        {{ roomName }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ChatNotifyComponent />
      </v-col>
    </v-row>

    <v-infinite-scroll
      :height="350"
      :items="chats"
      :onLoad="load"
      side="start"
      empty-text="메세지를 모두 확인했습니다."
    >
      <template v-for="chat in chats" :key="chat.chatId">
        <v-list-item v-if="chat.userId == userId">
          <ChatBubbleMeComponent v-bind="chat" />
        </v-list-item>
        <v-list-item v-else :prepend-avatar="chat.profileUrl" :title="chat.name">
          <ChatBubbleOthersComponent v-bind="chat" />
        </v-list-item>
      </template>
    </v-infinite-scroll>

    <ChatInputComponent bottom />
  </v-container>
</template>

<style scoped></style>
`
