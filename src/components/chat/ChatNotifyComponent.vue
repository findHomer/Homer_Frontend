<script setup>
// 채팅방 공지 컴포넌트
import { storeToRefs } from "pinia";
import { useChatInfoStore } from "@/stores/chatInfo";
import { ref } from "vue";

const store = useChatInfoStore();
const { notification } = storeToRefs(store);

notification.value = {
  userName: "test",
  chat: "SSAFY 멀티 캠퍼스 역삼점은 역삼역으로 부터 5분거리에 위치해 있습니다.",
  date: "2023-01-23",
};

const expand = ref(false);
</script>

<template>
  <v-card color="#eeeeee" >
    <v-container>
      <v-row @click="expand = !expand">
        <v-col cols="1">
          <v-icon>mdi-bell-outline</v-icon>
        </v-col>

        <v-col :class="{ 'd-inline-block': true, 'text-truncate': !expand }">
          <span>{{ notification.chat }}</span>
          <template v-if="expand">
            <v-row>
              <v-col>
                {{ notification.userName }}  {{ notification.date }}
              </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped></style>
