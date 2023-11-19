<script setup>
import { onMounted } from "vue";
import { ref,computed,inject } from 'vue';
import {useUserStore} from '@/components/stores/user-store';

const { VITE_KAKAO_APP_KEY } = import.meta.env;
const store = useUserStore()
const markers = [];//마커들 관리하는 테이블
const markerMapping=new Map();//마커와 id 매핑하는 테이블
const axios = inject('axios')

const initMap = async() => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  }; //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  const map = new kakao.maps.Map(container, options);
  kakao.maps.event.addListener(map, 'tilesloaded', async()=> {             
    for(var i =0 ;i<markers.length;i++){
      markers[i].setMap(null);
    }
    markers.splice(0,markers.length)
    markerMapping.clear();
    // 지도 영역정보를 얻어옵니다 
    var bounds = map.getBounds();
   // console.log(bounds.ha)
    // 영역정보의 남서쪽 정보를 얻어옵니다 
    var swLatlng = bounds.getSouthWest();
    
    // 영역정보의 북동쪽 정보를 얻어옵니다 
    var neLatlng = bounds.getNorthEast();
    const response = await axios.get(`/apartments/locations/maps?startLat=${bounds.qa}&endLat=${bounds.pa}&startLng=${bounds.ha}&endLng=${bounds.oa}`)
    //console.log(response);
      response.data.forEach(element => {
        var marker = new kakao.maps.Marker({
          position : new kakao.maps.LatLng(element.lat,element.lng),
          title: element.aptName
        });
          marker.setMap(map);
          markerMapping.set(marker,element.aptId)
          
          kakao.maps.event.addListener(marker,'click',function(){
            
            store.aptId= markerMapping.get(marker)
         //   console.log(store.aptId);
            // clickApart(markerMapping[marker])
          })
          
          markers.push(marker)
          


        });

    })
   
  
  


  
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

    axios.ge
  }
});



</script>

<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style scoped></style>
