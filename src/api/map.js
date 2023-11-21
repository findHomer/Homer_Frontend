
import { localAxios } from "@/util/http-commons";

const instance = localAxios()

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
}

export { getMarkers }