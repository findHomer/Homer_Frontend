import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getMyInfo} from "@/api/chat"
export const useChatInfoStore = defineStore('chat', () => {
    const myInfo = ref({});

    const chats = ref([]);
    const notification = ref({
        id: "",
        userName : "",
        chat : "",
        date: "",
    });

    const sendMessage = (message) => {
        message;
    }
    const receiveMessage = () => {

    } 

    const updatedInfo = () => {
        getMyInfo(
            (response) =>
            {
              myInfo.value = response.data
              console.log(response.data);
            },(error) => {
              console.log(error);
            }
        )
    }

  return { chats,notification, myInfo, sendMessage, receiveMessage, updatedInfo }
})

