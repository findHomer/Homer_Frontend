<script setup>
import { onMounted } from "vue";
const { VITE_KAKAO_APP_KEY } = import.meta.env;

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  }; //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  const map = new kakao.maps.Map(container, options);
  console.log(map);
};

onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_APP_KEY}`;
    document.head.appendChild(script);
  }
});
</script>

<template>
    <div id="map" style="width: 100%; height: 100%"></div>
  
</template>

<style scoped></style>
