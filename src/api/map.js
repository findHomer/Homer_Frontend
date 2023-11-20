
import { localAxios } from "@/util/http-commons";

const instance = localAxios()

function getMarkers(bounds, success, fail){
    const param ={
        "startLat" : bounds.qa,
        "endLat" : bounds.pa,
        "startLng" :bounds.ha,
        "endLng" :bounds.oa
    }
    instance.get(`/apartments/locations/maps`, {params : param})
    .then(success)
    .catch(fail)
}

export { getMarkers }