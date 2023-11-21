import {localAxios} from "@/util/http-commons"

const local = localAxios();
const baseUrl = '/review';

function getReviews(aptId, success, fail){
    local.get(`${baseUrl}/${aptId}`).then(success).catch(fail)
}

function postReview(review, success, fail){
    local.post(`${baseUrl}`,JSON.stringify(review)).then(success).catch(fail)
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