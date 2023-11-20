<script setup>
import { ref,computed,inject,watch,onMounted } from 'vue'
const searchName = ref('')
const axios = inject('axios')
const sido = ref([])
const sigungu= ref([])

const selectedSido= ref('')
const getSigungu = async () => {
    console.log(sido.value);
    for (let i=0; i<sido.value.length; i++) {
        if (sido.value.name === selectedSido.value) {
            const response = await axios.get(`/dongcode/${sido.value.code}/sigungu`)
            sigungu.value = response.data.map((data) => ({
                    name: data.name,
                    code: data.code
            }));
            console.log(sigungu)
            break;
        }
    }
    //시군구 동읍 초기화
    
    
    
    console.log(sido);
}


onMounted(async() => {
    const response = await axios.get(`/dongcode/sido`)
    sido.value = response.data.map((data) => ({
        name: data.name,
        code: data.code
    }));
    console.log(sido)

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
                @update:modelValue = "getSigungu"
                variant="outlined"
            ></v-select>
            </v-col>
            <v-col> <v-select
                label="시군구"
                :items="sigungu"
                @change = "getDongupri"
                variant="outlined"
            ></v-select>
            </v-col>
            <v-col> <v-select
                label="동읍리"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="outlined"
            ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>