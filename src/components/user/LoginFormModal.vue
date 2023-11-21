<script setup>
import { ref } from "vue";

import { useUserStore } from '@/components/stores/user-store'
const dialog = ref(false);
const email = ref('');
const password = ref('');
const userStore = useUserStore();
const doLogin = async()=> {
  const loginDto = {
    "email": email.value,
    "password":password.value
  }
  await userStore.login(loginDto);
  //dialog.value = true;
  //const response = postLogin(email.value, password.value);
  //console.log(response);
}

</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="512">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> 로그인 </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col class="text-center">
                <v-btn variant="text" @click="doLogin"> Login </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped></style>
