<script setup>
import { ref } from "vue";
const dialog = ref(false);
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="512">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> 로그인 </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped></style>
