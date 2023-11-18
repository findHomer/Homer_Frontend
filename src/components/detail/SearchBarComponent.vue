<script setup>
import {ref} from 'vue'
const searchName=ref('')
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
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="outlined"
            ></v-select>
            </v-col>
            <v-col> <v-select
                label="시군구"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
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