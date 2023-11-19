<script setup>
import { onMounted } from "vue";
import { ref,computed,inject } from 'vue';
const { VITE_KAKAO_APP_KEY } = import.meta.env;

const markers = [];//마커들 관리하는 테이블
const markerMapping={};//마커와 id 매핑하는 테이블
const axios = inject('axios')

const initMap = async() => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  }; //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  const map = new kakao.maps.Map(container, options);
  await axios.get(`/apartments`)
    .then((response => {
        console.log(response);
        response.data.forEach(element => {
          var marker = new kakao.maps.Marker({
            position : new kakao.maps.LatLng(element.lat,element.lng),
            title: element.aptName
          });
          marker.setMap(map);
          markerMapping[marker]=element.aptId
          
          kakao.maps.event.addListener(marker,'click',function(){
            clickApart(markerMapping[marker])
          })
          
          markers.push(marker)
          


        });
    }))


  
};

const clickApart = async() =>{
  //아파트상세정보
}


onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_APP_KEY}`;
    document.head.appendChild(script);

    axios.ge
  }
});



</script>

<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style scoped></style>
