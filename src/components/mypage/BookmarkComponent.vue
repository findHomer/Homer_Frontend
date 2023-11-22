<script setup>
import { ref } from 'vue'

const items = ref([]);

const api = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1));
    }, 1000);
  });
};

const load = async ({ done }) => {
  // Perform API call
  const res = await api();

  items.value.push(...res);

  done("ok");
};
</script>

<template>
  <div>
    <v-infinite-scroll :height="300" :items="items" :onLoad="load">
      <template v-for="(item, index) in items" :key="item">
        <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
          Item #{{ item }}
        </div>
      </template>
    </v-infinite-scroll>
  </div>
</template>

<style scoped></style>
