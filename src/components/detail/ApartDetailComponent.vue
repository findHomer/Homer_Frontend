<script setup>
import { ref,computed,watch } from 'vue';
import { useUserStore } from '../stores/user-store';
import {getApart} from "@/api/apart"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { onMounted } from 'vue';
const store = useUserStore();


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
//const axios = inject('axios')
const tab = ref(null);
const dealInfos=ref([])



const chartData = computed(() => {
  //console.log("변경");
    if (dealInfos.value.length > tab.value) {
         // 거래 데이터 처리
        const currentData = dealInfos.value[tab.value].averageMonthDto;
        const chartDataPoints = currentData.map(item => item.average === 0 ? null : item.average);
        const chartLabels = currentData.map(item => item.month);
        
        // 차트 데이터로 변환
        return {
            labels: chartLabels,
            datasets: [{
                label: '최근 거래가(만원)',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                data: chartDataPoints,
                lineTension: 0.4,
                spanGaps: true
            }]
        };
    } else {
      //데이터없을때
        return { labels: [], datasets: [] };
    }
});


const options = ref({
  responsive: true,
  maintainAspectRatio: false
})
const items = ref({
    aisleType: "",  
    maxFloor: "", 
    householdCount: "", 
    dongCount: "",
    parkPerHouse: ""
});

const aptName=ref('');

onMounted(()=>{
    
  watch(()=>store.aptId, async()=>{
  //console.log(store.aptId)
  const response = await getApart(store.aptId)
      console.log(response)
      aptName.value = response.data.aptName
      items.value.aisleType = response.data.aisleType
      items.value.maxFloor = response.data.maxFloor ? "최고"+response.data.maxFloor+"층" : "";
      items.value.householdCount = response.data.householdCount ? response.data.householdCount + "세대" : "";
      items.value.dongCount = response.data.dongCount ? response.data.dongCount+"동" : "";
      items.value.parkPerHouse= response.data.parkPerHouse ?"세대당"+response.data.parkPerHouse+"대" : "";
      
      dealInfos.value=response.data.dealInfos
      tab.value=0

      var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      console.log(response.data.lng)
      var position = new kakao.maps.LatLng(response.data.lat, response.data.lng);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function(panoId) {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
      
      
      //console.log(dealInfos);
   
})
}
    
)
// 비어있지 않은 항목을 필터링하고 두 개씩 그룹화합니다.
const filteredItems = computed(() => {
    return Object.entries(items.value)
                 .filter(([key, value]) => value && value.trim() !== '')
                 .reduce((acc, curr, index) => {
                     if (index % 2 === 0) acc.push([]);
                     acc[acc.length - 1].push(curr);
                     return acc;
                 }, []);
});



</script>

<template>
    <v-container>
        <v-row>{{ aptName }}</v-row>

        <v-row v-for="(group, index) in filteredItems" :key="index">
            <v-col v-for="item in group" :key="item[0]">
                {{ item[1] }}
            </v-col>
        </v-row>

        <v-row>

    </v-row>
    <v-row>면적별(m^2)</v-row>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
    <v-tab v-for="(dealInfo,index) in dealInfos"  :key="index">{{  dealInfo.exclusiveArea }}</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <v-row>
            <Line :data="chartData" :options="options" /> 
        </v-row>

        <v-row v-if="dealInfos.length > 0 && dealInfos[tab]">
            <div class="table-container">
      <v-table height="280px" >
        <thead>
          <tr>
            <th class="text-left">거래날짜</th>
            <th class="text-left">거래금액(만원)</th>
            <th class="text-left">층</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dealInfos[tab].apartDealDto" :key="item.dealId">
            <td>{{ item.transactionDate }}</td>
            <td>{{ item.transactionAmount }}</td>
            <td>{{ item.floor }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    </v-row>
            
        
    </v-window>



    <v-row><div id="roadview" style="width:100%;height:300px;"></div></v-row>
    <v-row>
     
    </v-row>
   
    </v-container>
    
   
</template>

<style scoped>
.table-container{
    width:360px;
    overflow-y: auto;
}
</style>