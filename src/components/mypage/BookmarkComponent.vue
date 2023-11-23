<script setup>
import { ref,onMounted } from 'vue'
import { getBookmarks } from '@/api/mypage'
import { useUserStore } from '@/components/stores/user-store'
import { storeToRefs } from 'pinia'
const userStore = useUserStore();
const items = ref([]);






const doInfo = (id) =>{
  console.log(id)
  
  const { aptId } = storeToRefs(userStore);
  aptId.value = id;
}
onMounted(async() => {
  const response  = await getBookmarks()
  items.value = response.data
  
})


</script>

<template>
  
    <v-card v-for="item in items" :key="item.aptId"
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="align-end text-white"
      height="200"
      src="/src/assets/bookmark.png"
      cover
    >
      <v-card-title color="black">{{ item.aptName }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{item.roadAddr}}
    </v-card-subtitle>

    

    <v-card-actions>
      <v-btn  @click="doInfo(item.aptId)" color="orange">
        상세정보
      </v-btn>
    </v-card-actions>
  </v-card>
 
</template>

<style scoped></style>
