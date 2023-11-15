<script setup>
import { ref } from "vue";
const rating = ref(3);
const contents = ref("");
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <div class="text-h5">리뷰 작성</div>
      </v-row>
      <v-row>
        <!-- 별점 -->
        <v-rating
          :model-value="rating"
          color="orange-lighten-1"
          active-color="orange-lighten-1"
          readonly
        ></v-rating>
      </v-row>
      <v-row>
        <v-text-field label="내용" name="name" :model-value="contents" textarea></v-text-field>
      </v-row>
      <v-row class="justify-end">
        <v-col>
          <v-btn color="primary">작성</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
