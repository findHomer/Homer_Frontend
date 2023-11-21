import { localAxios } from "@/util/http-commons";

const instance = localAxios()

function getSido(success, fail){
    return instance.get(`/dongcode/sido`)
    .then(success)
    .catch(fail)
}

function getSigungu(code, success, fail) {
    return instance.get(`/dongcode/${code}/sigungu`)
    .then(success)
    .catch(fail)
}

function getDongupri(code, success, fail) {
    return instance.get(`/dongcode/${code}/dong`)
    .then(success)
    .catch(fail)
}

export { getSido,getSigungu,getDongupri}