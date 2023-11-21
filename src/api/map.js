
import { localAxios } from "@/util/http-commons";
//import {useUserStore} from '@/components/stores/user-store';
const instance = localAxios()
//const store = useUserStore();

function getMarkers(bounds,searchDto, success, fail){
    const param = {
        "startLat": bounds.qa,
        "endLat": bounds.pa,
        "startLng": bounds.ha,
        "endLng": bounds.oa,
        "aptName": searchDto.aptName,
        "aisleType": searchDto.aisleType,
        "householdCount": searchDto.householdCount,
        "parkPerHouse":searchDto.parkPerHouse
    }
    return instance.get(`/apartments/locations/maps`, { params:  param })
    .then(success)
    .catch(fail)
}

export { getMarkers }