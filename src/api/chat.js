import { localAxios } from "@/util/http-commons";
import {token} from "@/components/stores/user-store"

const local = localAxios();

//방전체 조회 - 방 list 반환
const findAllRoom = (success, fail) => {
    local.get('/chat/rooms').then(success).catch(fail);
}

export {findAllRoom}