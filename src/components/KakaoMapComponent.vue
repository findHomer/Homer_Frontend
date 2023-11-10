<script setup>
import { onMounted, toRaw } from "vue";
const { VITE_KAKAO_APP_KEY } = import.meta.env;

const markerPositions1 = [
  [33.452278, 126.567803],
  [33.452671, 126.574792],
  [33.451744, 126.572441],
];
const markerPositions2 = [
  [37.499590490909185, 127.0263723554437],
  [37.499427948430814, 127.02794423197847],
  [37.498553760499505, 127.02882598822454],
  [37.497625593121384, 127.02935713582038],
  [37.49629291770947, 127.02587362608637],
  [37.49754540521486, 127.02546694890695],
  [37.49646391248451, 127.02675574250912],
];
const displayMarker = (markerPositions) => {
  if (this.markers.length > 0) {
    this.markers.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

  if (positions.length > 0) {
    this.markers = positions.map(
      (position) =>
        new kakao.maps.Marker({
          map: toRaw(this.map),
          position,
        })
    );

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new kakao.maps.LatLngBounds()
    );

    toRaw(this.map).setBounds(bounds);
  }
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  }; //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  new kakao.maps.Map(container, options);
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
  <div>
    <div id="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<style scoped></style>
