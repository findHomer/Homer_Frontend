<script setup>
// 내가 쓴 말풍선 컴포넌트

const props = defineProps({
  name: String,
  content: String,
});
</script>

<template>
  <v-row>
    <v-spacer></v-spacer>
    <!-- 내용 -->
    <v-col cols="9">
      <v-card class="chat-bubble pa-3">
        <span>
          {{ props.content }}
        </span>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.chat-bubble {
  border: 1px lightgray solid;
  border-radius: 0.7rem;
  background-color: rgb(213, 235, 255);
}
</style>
