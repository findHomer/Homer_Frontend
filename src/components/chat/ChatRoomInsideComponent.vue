`
<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import { storeToRefs } from "pinia";
import ChatNotifyComponent from "./ChatNotifyComponent.vue";
import ChatInputComponent from "./ChatInputComponent.vue";
import { useChatInfoStore } from "../../stores/chatinfo";
import ChatBubbleMeComponent from "./ChatBubbleMeComponent.vue";
import ChatBubbleOthersComponent from "./ChatBubbleOthersComponent.vue"; // 채팅 내용
import { ref ,computed} from 'vue'
import { getAllchat , getMyInfo } from "../../api/chat";

const chatinfo = useChatInfoStore()
const {myInfo} = storeToRefs(chatinfo)

import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { onMounted } from "vue";

// const name = ref("");
// const message = ref("");
const recvList = ref([]);
let stompClient = null;
const chats = ref([]);
// 
console.log(myInfo);
const send = (message) => {
  console.log("Send message:" + message);
  if (stompClient && stompClient.connected) {
    const msg = {
      roomId : nowChatId.value,
      'sender': myInfo.value.nickname,
      'message' : message,
      'profileUrl' : myInfo.value.profileUrl,
    };
    stompClient.send("/pub/chat/message", JSON.stringify(msg), {});
  }
};

const sendMessage = (message) => {
  send(message);
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
      stompClient.subscribe(`/sub/chat/room/${nowChatId.value}`, (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);

        // 받은 데이터를 JSON으로 파싱하고 리스트에 넣어줍니다.
        chats.value.push(JSON.parse(res.body));
      });
    },
    (error) => {
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error);
    }
  );
};
const sortedChat = computed(() => {
  return chats.value.toSorted((a,b) => {
      return a.sendTime - b.sendTime;
    
  })
})
onMounted(() => {
  // App.vue가 생성되면 소켓 연결을 시도합니다.
  connect();

});

const store = useChatRoomStore();
// const userStore = useUserStore();
const {nowChatId, roomName } = storeToRefs(store); // 채팅방 이름 
const { exitRoom } = store;
// const { chats } = storeToRefs(chatstore); //

/*
데이터 형식
roomId
sender
profileUrl
message
sendTime
*/

// mock
// const userId = 1;

// chats.value = [
//   {
//     chatId: 1,
//     userId: 2,
//     name: "arceon",
//     content: "안녕하세요!!",
//     profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
//   },
//   {
//     chatId: 2,
//     userId: 3,
//     name: "헬로월드",
//     content: "안녕하세요!!",
//     profileUrl:
//       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     chatId: 3,
//     userId: 2,
//     name: "신예지",
//     content: "무엇이 궁금하신가요?",
//     profileUrl:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     chatId: 4,
//     userId: 1,
//     name: "백빵돌이",
//     content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
//     profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
//   },

// ];

// const mockMoreChat=[
//   {
//     chatId: 9,
//     userId: 2,
//     name: "arceon",
//     content: "안녕하세요!!",
//     profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
//   },
//   {
//     chatId: 10,
//     userId: 3,
//     name: "헬로월드",
//     content: "안녕하세요!!",
//     profileUrl:
//       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     chatId: 11,
//     userId: 2,
//     name: "신예지",
//     content: "무엇이 궁금하신가요?",
//     profileUrl:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     chatId: 12,
//     userId: 1,
//     name: "백빵돌이",
//     content: "안녕하세요!! ^^ 서울에서 저희 본가까지 거리가 긴데 시간이 얼마나 걸릴까요?",
//     profileUrl: "https://www.ssafy.com/swp/rps/images/campus_seoul.png",
//   },
// ]

// const api = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockMoreChat);
//     }, 1000);
//   });
// };

const load = async ({ done }) => {
  // TODO : 메세지 불러오기 로직 시간 내림차순으로
//   getMyInfo(
//   ({data}) => {
//     myInfo.value = data
//     console.log(myInfo.value.nickname);
//   }
// );
  
  const { data } = await getAllchat(nowChatId.value); //response 를 반환

  //데이터가 없으면
  if (data == null || data == undefined) {
    done("error");
  } else if (data.length <= 0 || chats.value.length == data.length) { //TODO 수정 필요
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
      <template v-for="chat in sortedChat" :key="chat.sendTime">
        <v-list-item v-if="chat.sender == myInfo.nickname">
          <ChatBubbleMeComponent v-bind="chat" />
        </v-list-item>
        <v-list-item v-else :prepend-avatar="chat.profileUrl" :title="chat.sender">
          <ChatBubbleOthersComponent v-bind="chat" />
        </v-list-item>
      </template>
    </v-infinite-scroll>

    <ChatInputComponent bottom @send="sendMessage"/>
  </v-container>
</template>

<style scoped></style>
`
