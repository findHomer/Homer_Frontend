<script setup>
import { ref } from "vue";
import {regist} from '@/api/user'
const dialog = ref(false);
const registDto = ref({
  "email" :'',
  "password":'',
  'name':'',
  'nickname':'',
  'birth' :''
})
const doRegist = function(){
  regist(registDto);
  dialog.value =true;
}
</script>
<template>

    <v-dialog v-model="dialog" persistent width="512">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> 회원 가입 </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center pt-10">
          <span class="text-h5">회원 가입</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model = "registDto.email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model = "registDto.password" 
                  label="Password*"
                  hint="소문자,대문자,특수문자 각 1개 이상 포함 8~15자리"
                  type="password"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model = "registDto.name" label="name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model = "registDto.nickname" label="nickname*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="date" v-model = "registDto.birth" label="birth date*" required></v-text-field>
              </v-col>
              <v-col>
                <template>
                  <v-container>
                    <v-row justify="space-around">
                      <v-date-picker elevation="24"></v-date-picker>
                    </v-row>
                  </v-container>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="doRegist"> 회원가입 </v-btn>
          <v-btn color="red" variant="text" @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
<style scoped></style>
