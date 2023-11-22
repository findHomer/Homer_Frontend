
import { localAxios } from "@/util/http-commons";
import {token} from "@/components/stores/user-store"
//import {useUserStore} from '@/components/stores/user-store';
const instance = localAxios()
//const store = useUserStore();

<<<<<<< HEAD
async function getMarkers(bounds){
    const param ={
        "startLat" : bounds.qa,
        "endLat" : bounds.pa,
        "startLng" :bounds.ha,
        "endLng" :bounds.oa
    }
    const reponse = await instance.get(`/apartments/locations/maps`, {params : param})
    // .then(success)
    // .catch(fail)
    return reponse
=======
function getMarkers(bounds, searchDto, success, fail) {
    
    instance.defaults.headers.common['Authorization'] =token.value
    const param = {
        "startLat": bounds.qa,
        "endLat": bounds.pa,
        "startLng": bounds.ha,
        "endLng": bounds.oa,
        "aisleType": searchDto.aisleType,
        "householdCount": searchDto.householdCount,
        "parkPerHouse":searchDto.parkPerHouse
    }
    return instance.get(`/apartments/locations/maps`, { params:  param })
    .then(success)
    .catch(fail)
>>>>>>> e33bd8db0f2ef437fc0befa88d7b298e55c2a4a6
}


function getMarkersByName(searchNameDto, searchDto, success, fail) {
    console.log(searchNameDto)
    const param = {
        "name": searchNameDto.aptName,
        "dongCode": searchNameDto.dongCode,
        "aisleType": searchDto.aisleType,
        "householdCount": searchDto.householdCount,
        "parkPerHouse":searchDto.parkPerHouse
    }
    console.log(searchNameDto)
    return instance.get(`/apartments/locations/names`,{params: param})
    .then(success)
    .catch(fail)
}

export { getMarkers ,getMarkersByName}