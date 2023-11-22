import { localAxios } from "@/util/http-commons";
import {token} from "@/components/stores/user-store"

const instance = localAxios()
const getMyInfo = (success, fail)=>{
    instance.defaults.headers.common['Authorization'] = token.value

    instance.get(`/users/mypage`)
    .then(success)
    .catch(fail)
}

export { getMyInfo }