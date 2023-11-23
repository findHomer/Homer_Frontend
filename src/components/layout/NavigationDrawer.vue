<script setup>
import { ref } from "vue";
import ApartDetailComponent from "../detail/ApartDetailComponent.vue";
import SearchBarComponent from "../detail/SearchBarComponent.vue";
import ReviewViewComponent from "@/components/review/ReviewViewComponent.vue";
import { useUserStore} from '@/components/stores/user-store'
const drawer = ref(null);
const tab = ref(null);

const userStore = useUserStore();
</script>

<template>
  
  <v-navigation-drawer 
    color="rgba(0, 0, 255, 0.0)"
    border="0"
    margin-left="10px"
    elevation="0"
    width="400"
    
    v-model="drawer" 
    :disable-resize-watcher="true"
    floating 
    permanent="true"
    class="rounded-xl pa-4 "
    :scrim="false">
    <v-container  class="h-100 overflow-auto">
    <v-row>
    <v-card class="search-box">
      <SearchBarComponent/>
    </v-card>
    </v-row>

    <v-row v-show="userStore.aptId!=''" class ="mt-6 scrollable-content">
    <v-card class="detail-card">
      <v-tabs
        v-model="tab"
        color="#92A3DB"
        align-tabs="center"
      >
      <v-tab :value="1">아파트 정보</v-tab>
      <v-tab :value="2">리뷰</v-tab>
    </v-tabs>
  
    
      <v-window v-model="tab">
      <v-window-item :key="1" :value="1">
      <v-row>
        <ApartDetailComponent/>
      </v-row>
      </v-window-item>

      <v-window-item :key="2" :value="2">
      <v-row>
        <ReviewViewComponent/>
      </v-row>
      </v-window-item>
      </v-window>
    </v-card>
  </v-row>
      </v-container>
    </v-navigation-drawer>

  
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap');


.search-box {
  position: sticky;
  top: 0; /* 상단에 고정 */
  z-index: 100; /* 다른 요소들보다 위에 보이도록 */
  font-family: 'Noto Sans KR', sans-serif;
  width:400px;
}
.detail-card{
  width:400px;
}

.scrollable-content {
  
  height: 100%; /* 전체 높이 설정 */
  font-family: 'Noto Sans KR', sans-serif;
  text-align:center;
  box-sizing: border-box;
}

/*전체 페이지의 스크롤바 스타일*/

::v-deep ::-webkit-scrollbar {
  width: 5px;  
}

/* 스크롤바 트랙 (스크롤바 배경) */
::v-deep ::-webkit-scrollbar-track {
  background-color: transparent; /* 트랙을 투명하게 */
}

/* 스크롤바 핸들 (움직이는 부분) */
::v-deep ::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4); /* 색상을 약간 더 짙게 */
  border-radius: 6px; /* 둥근 모서리를 더욱 둥글게 */
  transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */
}

/* 스크롤바 핸들을 마우스로 잡았을 때 */
::v-deep ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.6); /* 마우스 오버시 색상을 더 짙게 변경 */
}



</style>
