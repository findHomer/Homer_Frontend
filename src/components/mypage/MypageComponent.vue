<script setup>
import { ref, onMounted } from "vue";
import { getMyInfo } from "@/api/mypage";
const name = ref(null);
const email = ref(null);
const password = ref(null);
const birth = ref(null);
const nickname = ref(null);

const getMypage = () => {
  getMyInfo(
    ({ data }) => {
      name.value = data.name;
      birth.value = data.birth;
      nickname.value = data.nickname
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getMypage();
});
</script>

<template>
  <v-card class="mx-auto" max-width="450" align="center" title="회원 정보">
    <v-container>
      <v-text-field
        v-model="email"
        color="primary"
        label="이메일"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="비밀번호"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="name"
        color="primary"
        label="이름"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="nickname"
        color="primary"
        label="닉네임"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="birth"
        color="primary"
        label="생일"
        variant="underlined"
        type="date"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success">
        저장
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
