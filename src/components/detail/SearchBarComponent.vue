<script setup>
import { ref,computed,inject,watch,onMounted } from 'vue'
import {getSido,getSigungu,getDongupri} from "@/api/search"
const searchName = ref('')
const sido = ref([])
const sigungu= ref([])
const dongupri=ref([])
const selectedSido = ref('')
const selectedSigungu = ref('')
const selectedDongupri = ref('')

const getSigunguList = async () => {
    const response = await getSigungu(selectedSido.value);
    sigungu.value = response.data.map((data) => ({
                name: data.name,
                code: data.code
        }));
    
    //시군구 동읍 초기화
    
}

const getDongupriList = async () => {
    const response = await getDongupri(selectedSido.value+selectedSigungu.value);
    dongupri.value = response.data.map((data) => ({
            name: data.name,
                code: data.code
        }));
    
    //시군구 동읍 초기화
    
}


onMounted(async() => {
    const response = await getSido();
    sido.value = response.data.map((data) => ({
        name: data.name,
        code: data.code
    }));

});
</script>

<template>

    <v-container>
        <v-row>
       
        <v-text-field
            v-model = "searchName"
        ></v-text-field>
        </v-row>
        <v-row>
            <v-col> <v-select
                label="시도"
                :items = "sido"
                item-title="name"
                item-value="code"
                v-model="selectedSido"
                @update:modelValue = "getSigunguList"
                variant="outlined"
            ></v-select>
            </v-col>
            <v-col> <v-select
                label="시군구"
                :items="sigungu"
                item-title="name"
                item-value="code"
                v-model="selectedSigungu"
                @update:modelValue = "getDongupriList"
                variant="outlined"
            ></v-select>
            </v-col>
            <v-col> <v-select
                label="동읍리"
                :items="dongupri"
                item-title="name"
                item-value="code"
                v-model="selectedDongupri"
                variant="outlined"
            ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>