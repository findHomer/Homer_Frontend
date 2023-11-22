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

const searchApart = function () {
    const code = selectedSido.value + selectedSigungu.value + selectedDongupri.value
    store.searchNameDto.dongCode = code
    store.searchNameDto.aptName = searchName.value
    
    store.clicked = true;
    
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

}

const moveDong = function () {
  store.dongCode = selectedSido.value + selectedSigungu.value + selectedDongupri.value
  store.findDong = true;
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
    <v-row>
      <v-text-field v-model="searchName"></v-text-field>
      <v-btn @click="searchApart">검색</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          class="selectbox"
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

    <v-row justify-space-around>
      <v-col
        ><v-btn :outlined="selectedButton !== 'carCount'" @click="clickBtn('carCount')">
          주차대수
        </v-btn></v-col
      >
      <v-col
        ><v-btn :outlined="selectedButton!=='type'" @click="clickBtn('type')">
          현관구조
        </v-btn></v-col
      >
      <v-col
        ><v-btn
        :outlined="selectedButton !== 'householdCount'" @click="clickBtn('householdCount')">
        
          세대수
        </v-btn></v-col
      ></v-row
    >

    <div v-if="selectedButton=='carCount'">
      <v-row justify-center><v-col>주차대수</v-col><v-col>{{store.searchDto.parkPerHouse}}</v-col></v-row>
      <v-row><v-slider v-model="store.searchDto.parkPerHouse" min="0" max="3" step="0.1"></v-slider></v-row>
      
    </div>
    <div  v-if="selectedButton=='type'">
      <v-row justify-center>
        <v-col>현관구조</v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn  :varaint="selectedButton=='계단식'?'outlined':''" @click="clickType('계단식')"> 계단식 </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="clickType('복도식')"> 복도식 </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="clickType('복합식')"> 복합식 </v-btn>
        </v-col>
      </v-row>
    </div>
    <div  v-if="selectedButton=='householdCount'">
      <v-row justify-center><v-col>세대수</v-col><v-col>{{store.searchDto.householdCount}}</v-col></v-row>
      <v-row><v-slider v-model="store.searchDto.householdCount" min="0" max="1000" step="10"></v-slider></v-row>
    </div>
  </v-container>
</template>

<style scoped>

</style>
