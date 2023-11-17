<script setup>
import { ref, watch } from "vue";

const select = ref(false);
const chatFab = ref({
  icon: "mdi-chat",
  color: "black",
});

const selection = () => {
  select.value = !select.value;
};

watch(select, () => {
  if (select.value) {
    // dark
    chatFab.value.color = "white"; // 아이콘 색깔
  } else chatFab.value.color = "black"; // light 테마
});
</script>

<template>
  <div>
    <template>
      <v-fab-transition>
        <v-btn
          :key="chatFab.icon"
          :color="chatFab.color"
          large
          :dark="select"
          bottom
          right
          class="chat-btn"
          @click="selection"
        >
          <v-icon>{{ chatFab.icon }}</v-icon>
          <!-- 아이콘을 아직 선택 안했으므로 -->
          <template v-if="!select"> 현재 관심있는 아파트에 대한 채팅을 해보실래요? </template>
        </v-btn>
      </v-fab-transition>
      <!-- 채팅방 파트 -->
      <router-view></router-view>
    </template>
  </div>
</template>

<style scoped>
.chat-btn {
  border-radius: 20rem;
}
</style>
