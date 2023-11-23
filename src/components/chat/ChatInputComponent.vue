<script setup>
import {ref} from 'vue'
const message = ref("");
const emit = defineEmits(
    ['send']
)
const sendMessage = (e, msg) => {
  if (msg !== "") {
    emit('send', msg)
    message.value = "";
  }
};
</script>

<template>
    <v-container >
        <v-row>
            <v-col cols="9" class="d-flex align-end">
                <v-textarea auto-grow variant="outlined" v-model="message" rows=1  max-rows=3 clearable class="w-100" placeholder="채팅을 입력해주세요...">  </v-textarea>
            </v-col>
            <v-col class="d-flex align-center">
                <v-btn  color="success" @click="sendMessage($event, message)">
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>