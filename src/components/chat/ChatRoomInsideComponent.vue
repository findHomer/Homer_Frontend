<script setup>
import { useChatRoomStore } from "@/stores/chatroom";
import { storeToRefs } from "pinia";

const store = useChatRoomStore();
const { roomName } = storeToRefs(store);
const { exitRoom } = store;

</script>

<template>
  <v-container>
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
        <!-- <template v-for="">
        
        </template> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
