<script setup>
import { ref, computed, inject, watch, onMounted } from "vue";
import { getSido, getSigungu, getDongupri } from "@/api/search";
import { useSearchStore } from "@/stores/search"
import {storeToRefs} from 'pinia'

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
  3: '이상'
});

const tickLabelsHouse = ref({
  0: 0,
  300: 300,
  600: 600,
  1000: '이상'
});


const store = useSearchStore();
const {searchDto,clicked} = storeToRefs(store);
const parkPerHouse = ref(0);
const householdCount = ref(0);
const searchApart = function () {
    const code = selectedSido.value + selectedSigungu.value + selectedDongupri.value
    store.searchNameDto.dongCode = code
    store.searchNameDto.aptName = searchName.value
    
    clicked.value = !clicked.value;
    

}

const filterSearch = function () {
    searchDto.value.parkPerHouse=parkPerHouse;
    searchDto.value.householdCount = householdCount;
    clicked.value = !clicked.value;
    
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
        ><v-btn :variant="selectedButton =='carCount'? 'outlined' :'elevated' " 
        @click="clickBtn('carCount')"
        @change="filterSearch">
          주차대수
        </v-btn></v-col
      >
      <v-col
        ><v-btn :variant="selectedButton =='type'?  'outlined' :'elevated'" @click="clickBtn('type')">
          현관구조
        </v-btn></v-col
      >
      <v-col
        ><v-btn
        :variant="selectedButton =='householdCount'? 'outlined' :'elevated'" @click="clickBtn('householdCount')">
          세대수
        </v-btn></v-col
      ></v-row
    >

    <div v-if="selectedButton=='carCount'">
      <v-row><v-slider class="mt-4" @end="filterSearch" thumb-label="always" color = #92A3DB  show-ticks="always" :ticks="tickLabelsPark" v-model="parkPerHouse" min=0 max=3 step=0.1></v-slider>
        <template v-slot:thumb-label="{ modelValue }">
          {{ modelValue  }}
        </template>
    </v-row>
      
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
      
      <v-row><v-slider  class="mt-4" @end="filterSearch" color = #92A3DB  thumb-label="always"  show-ticks="always" :ticks="tickLabelsHouse" v-model="householdCount" min=0 max=1000 step=10></v-slider>
        
    </v-row>
    </div>
  </v-container>
</template>

<style scoped>



</style>
