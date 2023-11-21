import { localAxios } from "@/util/http-commons";

const instance = localAxios()

function postLogin(userInfo,success, fail){
    
    return instance.post('/login', userInfo)
    .then(success)
    .catch(fail)
}



export { postLogin}