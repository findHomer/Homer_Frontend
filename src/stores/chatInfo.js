import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatInfoStore = defineStore('chat', () => {

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

  return { chats,notification, sendMessage, receiveMessage }
})

