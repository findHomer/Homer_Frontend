import { localAxios } from "@/util/http-commons";

const instance = localAxios()

function getApart(aptId,success, fail){
    
    return instance.get(`/apartments/details?aptId=${aptId}`)
    .then(success)
    .catch(fail)
}



export {  getApart}