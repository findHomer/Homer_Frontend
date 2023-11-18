<script setup>
import HeadingNavbar from "../components/layout/HeadingNavbar.vue";
import KakaoMapComponent from "@/components/map/KakaoMapComponent.vue";
import NavigationDrawer from "../components/layout/NavigationDrawer.vue";
import ChatView from "@/views/ChatView.vue"
</script>

<template>
  <v-app id="inspire">
    <HeadingNavbar />
    <NavigationDrawer />
    <KakaoMapComponent />
    <ChatView/>
  </v-app>
</template>
