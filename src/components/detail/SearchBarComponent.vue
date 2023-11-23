<script setup>
import { ref, computed, inject, watch, onMounted } from "vue";
import { getSido, getSigungu, getDongupri } from "@/api/search";
import { useSearchStore } from "@/stores/search"

const store = useSearchStore();

//시도군 필터
const sido = ref([]);
const sigungu = ref([]);
const dongupri = ref([]);
const selectedSido = ref("");
const selectedSigungu = ref("");
const selectedDongupri = ref("");
const selectedButton = ref('');
const searchName = ref('');
const selectedType = ref("");

const tickLabelsPark = ref({
  0: 0,
  1: 1,
  2: 2,
  3: 3
});

const tickLabelsHouse = ref({
  0: 0,
  1: 300,
  2: 600,
  3: 1000
});
const searchApart = function () {
    const code = selectedSido.value + selectedSigungu.value + selectedDongupri.value
    store.searchNameDto.dongCode = code
    store.searchNameDto.aptName = searchName.value
    
    store.clicked = !store.clicked;
    

}

const filterSearch = function () {
  store.clicked = !store.clicked;
}

const clickBtn = function (btn) {
    if (btn === selectedButton.value) {
        selectedButton.value=''
    } else {
        selectedButton.value = btn;
    }
    
    
}

const clickType = function (type) {
    console.log(store.searchDto.aisleType)
    if (type === store.searchDto.aisleType) {
        store.searchDto.aisleType=''
    } else {
        store.searchDto.aisleType = type;
    }

    store.clicked = !store.clicked;

}

const moveDong = function () {
  
  store.dongCode = selectedSido.value + selectedSigungu.value + selectedDongupri.value
  store.findDong = !store.findDong;
}

const getSigunguList = async () => {
  const response = await getSigungu(selectedSido.value);
  sigungu.value = response.data.map((data) => ({
    name: data.name,
    code: data.code,
  }));

  //시군구 동읍 초기화
};

const getDongupriList = async () => {
  const response = await getDongupri(selectedSido.value + selectedSigungu.value);
  dongupri.value = response.data.map((data) => ({
    name: data.name,
    code: data.code,
  }));

  //시군구 동읍 초기화
};

onMounted(async () => {
  const response = await getSido();
  sido.value = response.data.map((data) => ({
    name: data.name,
    code: data.code,
  }));
});
</script>

<template>
  <v-container>
    <!-- <v-row>
      <v-text-field v-model="searchName"></v-text-field>
      <v-btn @click="searchApart">검색</v-btn>
    </v-row> -->
    <v-row>
      <v-col>
        <v-select
        :menu-props="{top:true,offsetY:true}"
          class="selectbox text-body-1"
          label="시도"
          :items="sido"
          item-title="name"
          item-value="code"
          v-model="selectedSido"
          @update:modelValue="getSigunguList"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
        class="selectbox"
          label="시군구"
          :items="sigungu"
          item-title="name"
          item-value="code"
          v-model="selectedSigungu"
          @update:modelValue="getDongupriList"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
        class="selectbox"
          label="동읍리"
          :items="dongupri"
          item-title="name"
          item-value="code"
          v-model="selectedDongupri"
          @update:modelValue ="moveDong"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>
    <v-row><v-divider></v-divider></v-row>
    
    <v-row justify-space-around>
      <v-col
        ><v-btn :variant="selectedButton =='carCount'? 'elevated' :'outlined' " 
        
        color="#093248"
        @click="clickBtn('carCount')"
        @change="filterSearch">
          주차대수
        </v-btn></v-col
      >
      <v-col
        ><v-btn :variant="selectedButton =='type'? 'elevated' :'outlined'" @click="clickBtn('type')">
          현관구조
        </v-btn></v-col
      >
      <v-col
        ><v-btn
        :variant="selectedButton =='householdCount'?'elevated' :'outlined'" @click="clickBtn('householdCount')">
        
          세대수
        </v-btn></v-col
      ></v-row
    >

    <div v-if="selectedButton=='carCount'">
      <v-row justify-center><v-col>주차대수         {{store.searchDto.parkPerHouse}}  이상</v-col></v-row>
      <v-row><v-slider @end="filterSearch" color = #92A3DB class="custom-slider" show-ticks="always" :ticks="tickLabelsPark" v-model="store.searchDto.parkPerHouse" min=0 max=3 step=0.1></v-slider></v-row>
      
    </div>
    <div  v-if="selectedButton=='type'">
      <v-row justify-center>
        <v-col>현관구조</v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn 
          color="#92A3DB"
          :variant="store.searchDto.aisleType =='계단식'? 'elevated' :'outlined'"
          @click="clickType('계단식')"> 계단식 </v-btn>
        </v-col>
        <v-col>
          <v-btn 
          color="#92A3DB"
          :variant="store.searchDto.aisleType =='복도식'? 'elevated' :'outlined'"
          @click="clickType('복도식')"> 복도식 </v-btn>
        </v-col>
        <v-col>
          
          <v-btn 
          color="#92A3DB"
          :variant="store.searchDto.aisleType =='복합식'? 'elevated' :'outlined'"
          @click="clickType('복합식')"> 복합식 </v-btn>
        </v-col>
      </v-row>
    </div>
    <div  v-if="selectedButton=='householdCount'">
      <v-row justify-center><v-col>세대수</v-col><v-col>{{store.searchDto.householdCount}}</v-col></v-row>
      <v-row><v-slider  @end="filterSearch" color = #92A3DB show-ticks="always" :ticks="tickLabelsHouse" v-model="store.searchDto.householdCount" min=0 max=1000 step=10></v-slider></v-row>
    </div>
  </v-container>
</template>

<style scoped>


.custom-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1rem;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  /* pointer-events: none; */
  border-radius: 999px;
  z-index: 0;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #00865a;
  /* z-index: -1; */
  pointer-events: none;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  /* top: 50%; 
  transform: translate(0, -50%);
  */
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #00bd7e;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}
</style>
