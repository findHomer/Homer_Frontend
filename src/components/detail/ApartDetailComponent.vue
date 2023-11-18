<script setup>
import { ref,computed,inject } from 'vue';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const axios = inject('axios')
const tab = ref(null);
let dealInfos=[]



const chartData = computed(() => {
    if (dealInfos.length > tab.value) {
         // 거래 데이터 처리
        const currentData = dealInfos[tab.value].averageMonthDto;
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
        return { labels: [], datasets: [] };
    }
});

const keyData = computed(()=>{
    return 
})
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
const aptId= "A13380803"

const details = async() => {
    await axios.get(`/apartments/details?aptId=${aptId}`)
    .then((response => {
        items.value.aisleType = response.data.aisleType
        items.value.maxFloor = response.data.maxFloor ? "최고"+response.data.maxFloor+"층" : "";
        items.value.householdCount = response.data.householdCount ? response.data.householdCount + "세대" : "";
        items.value.dongCount = response.data.dongCount ? response.data.dongCount+"동" : "";
        items.value.parkPerHouse= response.data.parkPerHouse ?"세대당"+response.data.parkPerHouse+"대" : "";

        dealInfos=response.data.dealInfos
        tab.value=0
        console.log(dealInfos);
    }))
}

onMounted(()=>{
    details()
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
    <v-tab v-for="(dealInfo,index) in dealInfos" :value="index">{{  dealInfo.exclusiveArea }}</v-tab>
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



    <v-row><div></div></v-row>
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