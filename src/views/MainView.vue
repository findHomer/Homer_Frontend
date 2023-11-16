<script setup>
import HeadingNavbar from "../components/layout/HeadingNavbar.vue";
import KakaoMapComponent from "@/components/map/KakaoMapComponent.vue";
import NavigationDrawer from "../components/layout/NavigationDrawer.vue";
</script>

<template>
  <v-app id="inspire">
    <HeadingNavbar />
    <NavigationDrawer />
    <KakaoMapComponent />
    <RouterView />
  </v-app>
</template>
