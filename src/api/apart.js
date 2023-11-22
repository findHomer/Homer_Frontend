import { localAxios } from "@/util/http-commons";
import {token} from "@/components/stores/user-store"
const instance = localAxios()

function getApart(aptId,success, fail){
    //instance.defaults.headers.common['Authorization'] =token.value
    return instance.get(`/apartments/details?aptId=${aptId}`)
    .then(success)
    .catch(fail)
}


function postBookmark(aptId){
    //instance.defaults.headers.common['Authorization'] =token.value
    const dto={
        'aptId': aptId
    }
    console.log(dto)
    return instance.post(`/bookmarks`,dto)
    .then(success)
    .catch(fail)
}

function delBookmark(aptId){
    //instance.defaults.headers.common['Authorization'] =token.value
    
    return instance.delete(`/bookmarks?aptId=${aptId}`)
    .then(success)
    .catch(fail)
}
export {  getApart,postBookmark,delBookmark}