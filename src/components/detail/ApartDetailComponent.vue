<script setup>
import { ref, computed, watch } from "vue";
import { getApart,postBookmark,delBookmark } from "@/api/apart";
import { useUserStore,token } from '../stores/user-store';
import { jwtDecode } from "jwt-decode";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const store = useUserStore();

const bookmark = ref(false)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//const axios = inject('axios')
const tab = ref('');
const dealInfos = ref([]);

const chartData = computed(() => {
  //console.log("변경");
  if (dealInfos.value.length > tab.value) {
    // 거래 데이터 처리
    const currentData = dealInfos.value[tab.value].averageMonthDto;
    const chartDataPoints = currentData.map((item) =>
      item.average === 0 ? null : item.average
    );
    const chartLabels = currentData.map((item) => item.month);

    // 차트 데이터로 변환
    return {
      labels: chartLabels,
      datasets: [
        {
          label: "최근 거래가(만원)",
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 1)",
          data: chartDataPoints,
          lineTension: 0.4,
          spanGaps: true,
        },
      ],
    };
  } else {
    //데이터없을때
    return { labels: [], datasets: [] };
  }
});

const options = ref({
  responsive: false,
  maintainAspectRatio: false,
});
const items = ref({
  aisleType: "",
  maxFloor: "",
  householdCount: "",
  dongCount: "",
  parkPerHouse: "",
});

const aptName = ref("");
const { aptId } = storeToRefs(store);

watch(aptId, async () => {
  //console.log(store.aptId)

  const response = await getApart(aptId.value);
  console.log(response);
  aptName.value = response.data.aptName;
  items.value.aisleType = response.data.aisleType;
  items.value.maxFloor = response.data.maxFloor
    ? "최고 " + response.data.maxFloor + "층"
    : "";
  items.value.householdCount = response.data.householdCount
    ? response.data.householdCount + "세대"
    : "";
  items.value.dongCount = response.data.dongCount ? response.data.dongCount + "동" : "";
  items.value.parkPerHouse = response.data.parkPerHouse
    ? "세대당 " + response.data.parkPerHouse + "대"
    : "";
  const userEmail = token.value ? jwtDecode(token.value).sub : null;
  bookmark.value = false;
  console.log(userEmail)
  response.data.emails.forEach((element) =>{
    console.log(element);
    if(element===userEmail){
      bookmark.value=true;
    }
  })   
  console.log(bookmark.value)

  dealInfos.value = response.data.dealInfos;
  tab.value = 0;

  var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
  var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
  var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
  console.log(response.data.lng);
  var position = new kakao.maps.LatLng(response.data.lat, response.data.lng);

  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
  roadviewClient.getNearestPanoId(position, 50, function (panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
  });
});
// 비어있지 않은 항목을 필터링하고 두 개씩 그룹화합니다.
const filteredItems = computed(() => {
    return Object.entries(items.value)
                 .filter(([key, value]) => value && value.trim() !== "")
                 .reduce((acc, curr, index) => {
                     if (index % 2 === 0) acc.push([]);
                     acc[acc.length - 1].push(curr);
                     return acc;
                 }, []);
});


const addBookmark = function(){
  bookmark.value=!bookmark.value
  const answer = postBookmark(aptId.value)
}

const removeBookmark = function(){
  bookmark.value=!bookmark.value
  const answer = delBookmark(aptId.value)
}
</script>

<template>
  <v-container style='box-sizing: border-box;'>
    <v-row>
      <v-col cols=10 class="font-weight-black text-center font-weight-large">{{ aptName }}</v-col>
      <v-col v-if="!store.menuList[0].show" cols=2>
        <v-img v-if="bookmark" width="60px" src="/src/assets/bookmark_picked.png" @click="removeBookmark"></v-img>
        <v-img v-if="!bookmark" width="60px" src="/src/assets/bookmark.png" @click="addBookmark"></v-img>
    </v-col>
    </v-row>
    <v-row><div id="roadview" style="width: 100%; height: 300px"></div></v-row>
    
   
   

    
    <v-row class='mt-8 mb-4'  style ='justify-content: center;'>면적별(m&sup2)</v-row>
    <v-tabs v-model="tab" color="#92A3DB" show-arrows align-tabs="center">
      <v-tab v-for="(dealInfo, index) in dealInfos" :key="index">{{
      Math.floor(dealInfo.exclusiveArea * 100) / 100
      }}</v-tab>
    </v-tabs>
   
      <v-row class="mt-6" style ='justify-content: center;'>
          <Line  :data="chartData" :options="options" />
      </v-row>

      
      <v-row  style ='justify-content: center;' v-if="dealInfos.length > 0 && dealInfos[tab]">
        
          <v-table 
            fixed-header 
            height="280px"
            >
            <thead>
              <tr>
                <th class="text-center">거래날짜</th>
                <th class="text-center">거래금액(만원)</th>
                <th class="text-center">층</th>
              </tr>
            </thead>
            <tbody class="table-container">
              <tr v-for="item in dealInfos[tab].apartDealDto" :key="item.dealId">
                <td>{{ item.transactionDate }}</td>
                <td>{{ item.transactionAmount }}</td>
                <td>{{ item.floor }}</td>
              </tr>
            </tbody>
          </v-table>
        
      </v-row>

      <v-divider class= 'mt-4 mb-4'></v-divider>

      <v-row style ="justify-content:center ;" v-for="(group, index) in filteredItems" :key="index">
      <v-col v-for="item in group" :key="item[0]">
        {{ item[1] }}
      </v-col>
      <v-divider vertical></v-divider>
    </v-row>
    
  
  </v-container>
</template>

<style scoped>

</style>
