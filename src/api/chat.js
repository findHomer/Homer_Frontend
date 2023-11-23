import { localAxios } from "@/util/http-commons";

const local = localAxios();


//내정보가져오기
const getMyInfo =  (success,fail) => {
    local.get('/chat/user').then(success).catch(fail)
}

//방전체 조회 - 방 list 반환
const findAllRoom = (success, fail) => {
    local.get('/chat/rooms').then(success).catch(fail);
}

//채팅방 생성
const createChatroom = (success, fail) => {
    local.post('/chat/room/create').then(success).catch(fail);
}

//채팅 가져오기
const getAllchat = async (roomId) => {
    return await local.get(`/chat/room/${roomId}`);
}

//채팅 보내기는 웹 소캣으로 수행한다.

export {findAllRoom, createChatroom, getAllchat , getMyInfo}