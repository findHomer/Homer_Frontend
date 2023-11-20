<script setup>
import { onMounted } from "vue";
import { ref,computed,inject } from 'vue';
import {useUserStore} from '@/components/stores/user-store';

const { VITE_KAKAO_APP_KEY } = import.meta.env;
const store = useUserStore()
//const markers = [];//마커들 관리하는 테이블
const markerMapping=new Map();//마커와 id 매핑하는 테이블
const axios = inject('axios')

const initMap = async() => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  }; //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  const map = new kakao.maps.Map(container, options);
  var clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
          minLevel: 4, // 클러스터 할 최소 지도 레벨 
      gridSize: 120, //클러스터에 포함될 격자크기    
      minClusterSize: 1
          });
  kakao.maps.event.addListener(map, 'tilesloaded', async () => {

    //특정 레벨 이상시 마커 작동 x
    if (map.getLevel() >= 6) {
      clusterer.clear();
      return;
    }

    // 지도 영역정보를 얻어옴
    var bounds = map.getBounds();
    
    const response = await axios.get(`/apartments/locations/maps?startLat=${bounds.qa}&endLat=${bounds.pa}&startLng=${bounds.ha}&endLng=${bounds.oa}`)
    
    const newMarkerIds = new Set(response.data.map(item => item.aptId));
    //기존 마커 업데이트
    markerMapping.forEach((marker, id) => {
      if (!newMarkerIds.has(id))//기존의 aptId는 사라지지않게하여 다시 렌더링 방지
      {
        marker.setMap(null);
        clusterer.removeMarker(marker)
        markerMapping.delete(id);
      }
       
      
    });
    

    //apt 각각 Marker에 매핑시켜주기
    response.data.forEach(element => {
      if (markerMapping.has(element.aptId)) return;
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(element.lat, element.lng),
        title: element.aptName
      });
      marker.setMap(map);
      markerMapping.set(element.aptId, marker);
     // markerMapping.set(marker, element.aptId)
      
        kakao.maps.event.addListener(marker, 'click', function () {
          store.aptId = element.aptId; //markerMapping.get(marker)
          console.log(store.aptId);
        })
      
     
      

    });

    if (map.getLevel() >= 4) {
        clusterer.addMarkers(Array.from(markerMapping.values()));
      }

  });
   
    

  
};




onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_APP_KEY}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

  }
});



</script>

<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style scoped></style>
