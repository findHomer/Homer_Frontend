<script setup>
import { ref, watch } from "vue";
// import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";
import ChatRoomListComponent from "../components/chat/ChatRoomListComponent.vue";
// import { useUserStore } from "@/components/stores/user-store";
// import { createChatroom } from "@/api/chat";
// import { getAllchat } from "../api/chat";
// import { getApart } from "@/api/apart";
// import { findAllRoom } from "../api/chat";

// const router = useRouter();
const select = ref(false);
const chatFab = ref({
  icon: "mdi-chat",
  color: "white",
});

const btnClass = ref({
  "chat-btn": true,
  "px-0": false,
});

const selection = () => {
  console.log("선택");
  select.value = !select.value;

  //TODO 자동 채팅방 생성
};

watch(select, () => {
  if (select.value) {
    // dark
    chatFab.value.color = "black"; // 아이콘 색깔
    btnClass.value["px-0"] = true;
    // 채팅방을 열어라
  } else {
    chatFab.value.color = "white"; // light 테마
    btnClass.value["px-0"] = false;
  }
});
</script>

<template>
  <v-navigation-drawer
      ref="chatDrawer"
      v-model="select"
      location="right"
      :scrim="false"
      :width="chatWidth"
      disable-resize-watcher
    >
      
      <v-btn
        class="chat-btn"
        :key="chatFab.icon"
        :color="chatFab.color"
        :dark="select"
        :class="btnClass"
        @click.stop="selection"
      >
        <v-container class="pa-1" fluid>
          <v-row>
            <v-col>
              <v-icon>{{ chatFab.icon }}</v-icon>

              <!-- 아이콘을 아직 선택 안했으므로 -->
              <template v-if="!select">
                현재 관심있는 아파트에 대한 채팅을 해보실래요?
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-btn>

      <chat-room-list-component />
    </v-navigation-drawer>
</template>

<style scoped>
.chat-btn {
  position: fixed;
  bottom: 1rem;
  right: v-bind(cssChatWidth);
  border-radius: 20rem;
}
</style>
