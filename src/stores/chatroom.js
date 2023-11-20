import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatRoomStore = defineStore('chatRoom', () => {

  const isChat = ref(false);   // 현재 채팅방이 활성화 되었는가
  const nowChatId = ref(""); // 현재 접속하는 채팅방이 어디인가
  const roomName = ref("");

  const enterRoom = (id, name) => { // 채팅방 접속
    isChat.value = true;
    nowChatId.value = id;
    roomName.value = name 
  }
  
  const exitRoom = () => {
    isChat.value = false
    nowChatId.value = "";
    roomName.value = "" ;
  }

  return { isChat, nowChatId, roomName, enterRoom ,exitRoom }
})
