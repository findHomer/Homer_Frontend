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
    profileUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    chatId: 3,
    userId: 2,
    name: "신예지",
    content: "무엇이 궁금하신가요?",
    profileUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    chatId: 4,
    userId: 1,
    name: "백빵돌이",
    content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
    profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
  },
];

</script>

<template>
  <v-container fill-height>
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

    <!-- <template v-for="chat in chats" :key="chat.chatId">
      <v-row>
        <v-col>
          <ChatBubbleMeComponent v-if="chat.userId == userId" v-bind="chat" />
          <ChatBubbleOthersComponent v-else v-bind="chat" />
        </v-col>
      </v-row>
    </template> -->
    <template v-for="chat in chats" :key="chat.chatId">
      <v-list-item v-if="chat.userId == userId"  >
        <ChatBubbleMeComponent v-bind="chat"/>
      </v-list-item>
      <v-list-item v-else :prepend-avatar="chat.profileUrl" :title="chat.name">
        <ChatBubbleOthersComponent v-bind="chat" />
      </v-list-item>
    </template>
    <v-row>
      <v-col>
        <ChatInputComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
