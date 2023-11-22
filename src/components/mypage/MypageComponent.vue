<script setup>
import { ref, onMounted } from "vue";
import { getMyInfo } from "@/api/mypage";
const name = ref(null);
const birth = ref(null);
const nickname = ref(null);
const profileUrl = ref("");
const profile = ref(null);

const getMypage = () => {
  getMyInfo(
    ({ data }) => {
      name.value = data.name;
      birth.value = data.birth;
      nickname.value = data.nickname;
      profileUrl.value = data.profileUrl;
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  getMypage();
});

const previewImage = () => {
  profileUrl.value = URL.createObjectURL(profile.value[0]);
};
const rules = ref([
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 2000000 ||
      "Avatar size should be less than 2 MB!"
    );
  },
]);

const changeProfile = () => {

}
</script>

<template>
  <v-card class="mx-auto" max-width="450" align="center" title="회원 정보">
    <v-container>
      <v-row>
        <v-col>
          <v-avatar size="100" color="grey" cover>
            <v-img
              width="100"
              v-if="profileUrl"
              :src="profileUrl"
              alt="사용자 프로필 프리뷰"
              cover
            />
          </v-avatar>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-file-input
            :rules="rules"
            @change="previewImage"
            v-model="profile"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="프로필 사진을 올려주세요"
            prepend-icon="mdi-camera"
            label="프로필 업로드"
          >
          </v-file-input>
        </v-col>
      </v-row>

      <v-text-field
        v-model="name"
        color="primary"
        label="이름"
        variant="underlined"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="nickname"
        color="primary"
        label="닉네임"
        variant="underlined"
        readonly
      ></v-text-field>

      <v-text-field
        v-model="birth"
        color="primary"
        label="생일"
        variant="underlined"
        type="date"
        readonly
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="">
        저장
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
