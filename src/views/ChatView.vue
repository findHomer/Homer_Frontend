<script setup>
import { ref, watch } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();
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
  select.value = !select.value;
};

watch(select, () => {
  if (select.value) {
    // dark
    chatFab.value.color = "black"; // 아이콘 색깔
    btnClass.value["px-0"] = true;
    // 채팅방을 열어라
    router.push("/chat/chatrooms");
  } else {
    chatFab.value.color = "white"; // light 테마
    btnClass.value["px-0"] = false;
  }
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-fab-transition>
        <v-btn
          :key="chatFab.icon"
          :color="chatFab.color"
          :dark="select"
          bottom
          right
          :class="btnClass"
          @click="selection"
        >
          <v-row>
            <v-col>
              <v-icon>{{ chatFab.icon }}</v-icon>
            </v-col>
            <!-- 아이콘을 아직 선택 안했으므로 -->
            <template v-if="!select">
              <v-col> 현재 관심있는 아파트에 대한 채팅을 해보실래요?</v-col>
            </template>
          </v-row>
        </v-btn>
      </v-fab-transition>
      <!-- 채팅방 파트 -->
      <template v-if="select">
        <router-view></router-view>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.chat-btn {
  border-radius: 20rem;
}
</style>
