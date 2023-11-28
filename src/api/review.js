import {localAxios} from "@/util/http-commons"
import {token} from "@/components/stores/user-store"

const local = localAxios();
const baseUrl = '/review';

function getReviews(aptId, success, fail){
    local.defaults.headers.common['Authorization'] = token.value

    local.get(`${baseUrl}/${aptId}`).then(success).catch(fail)
}

function postReview(review, image, success, fail){
    local.defaults.headers.common['Authorization'] = token.value
    const form = new FormData();
    form.append("review", new Blob([JSON.stringify(review)], { type: "application/json" }) );
    if(image.value != null && image.value != undefined && image.value != ""){
        console.log(image.value);
        form.append("image", image.value[0]);
    }else{
        form.append("image", null);
    }
    local.defaults.headers.post['Content-Type'] = "multipart/form-data"
    local.post(`${baseUrl}`, form ).then(success).catch(fail)
}

function modifyReview(review, success, fail){

    local.patch(`${baseUrl}`,JSON.stringify(review)).then(success).catch(fail)
}

function deleteReview(reviewId, success, fail){
    console.log(reviewId);
    local.delete(`${baseUrl}`, { params :{"reviewId" : reviewId}}).then(success).catch(fail);
}

export {
    getReviews,
    postReview,
    modifyReview,
    deleteReview
}