<script setup>
import HeadingNavbar from "../components/layout/HeadingNavbar.vue";
import KakaoMapComponent from "@/components/map/KakaoMapComponent.vue";
import NavigationDrawer from "../components/layout/NavigationDrawer.vue";
//import ChatView from "@/views/ChatView.vue";
import ChatRoomListComponent from "../components/chat/ChatRoomListComponent.vue";
import { ref, watch, computed } from "vue";
import { useChatRoomStore } from "@/stores/chatroom";
import { storeToRefs } from "pinia";
import ChatRoomInsideComponent from "../components/chat/ChatRoomInsideComponent.vue";
import { useRoute } from "vue-router";
const store = useChatRoomStore();

const { isChat } = storeToRefs(store);
const select = ref(false);

const chatFab = ref({
  icon: "mdi-chat",
  color: "white",
  closeIcon: "mdi-close",
});

const btnClass = ref({
  "chat-btn": true,
  "px-0": false,
});

const selection = () => {
  select.value = !select.value;
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

const chatWidth = ref(450);

const cssChatWidth = computed(() => {
  return `${chatWidth.value + 50}px`;
});

const route = useRoute();
</script>

<template>
  <v-app id="inspire">
    <HeadingNavbar />
    <v-main class="pe-0">
      <NavigationDrawer />
      <KakaoMapComponent v-if="route.name !== 'myPage'" />
      <router-view></router-view>
    </v-main>

    <v-navigation-drawer
      v-model="select"
      location="right"
      :scrim="false"
      :width="chatWidth"
      color="rgba(0, 0, 255, 0.0)"
      disable-resize-watcher
      border="0"
      elevation="0"
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
              <v-icon v-if="!select">{{ chatFab.icon }}</v-icon>
              <v-icon v-else>{{ chatFab.closeIcon }}</v-icon>

              <!-- 아이콘을 아직 선택 안했으므로 -->
              <template v-if="!select">
                현재 관심있는 아파트에 대한 채팅을 해보실래요?
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-btn>

      <v-container class="d-flex align-end h-100">
        <v-card height="600" class="rounded-xl">
          <!-- chat id 처리 하기 -->
          <template v-if="!isChat">
            <chat-room-list-component />
          </template>

          <template v-else>
            <ChatRoomInsideComponent />
          </template>
        </v-card>
      </v-container>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.chat-btn {
  position: fixed;
  bottom: 1rem;
  right: v-bind(cssChatWidth);
  border-radius: 20rem;
}
</style>
