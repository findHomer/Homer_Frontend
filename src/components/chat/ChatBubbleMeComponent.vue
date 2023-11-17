<script setup>
// 내가 쓴 말풍선 컴포넌트
</script>

<template>
  <div>
    <v-row>
      <v-spacer cols="1"></v-spacer>
      <!-- 내용 -->
      <v-col>
        <span class="chat-bubble">
          {{ props.content }}
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.chat-bubble {
  border: 1px lightgray solid;
  border-radius: 1rem;
  background-color: rgb(213, 235, 255);
}
</style>
