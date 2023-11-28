import { localAxios } from "@/util/http-commons";
import {useUserStore,token} from "@/components/stores/user-store"
import {storeToRefs} from 'pinia'
const instance = localAxios()

function regist(registDto,success, fail){
    
    console.log(registDto);
    instance.post('/users/signup', registDto.value)
    .then(success)
    .catch(fail)
}

async function refresh(){
    const userStore = useUserStore();
    
    let isTokenRefreshing=false
    
    // Token을 재발급하는 동안 다른 요청이 발생하는 경우 대기.
    // 다른 요청을 진행하면, 새로 발급 받은 Token이 유효하지 않게 됨.
    if (!isTokenRefreshing) {
        isTokenRefreshing = true
        console.log("되냐!!")
        // 에러가 발생했던 컴포넌트의 axios로 이동하고자하는 경우
        // 반드시 return을 붙여주어야한다.
        //token.value=''
        await instance.post('/users/silent-refresh')
            .then((response) => {
                console.log(response);
                const newAccessToken = "Bearer "+response.data
                console.log(newAccessToken);
                instance.defaults.headers.common['Authorization'] = newAccessToken
                
                token.value= newAccessToken;
                
                
                isTokenRefreshing = false
                
                if (userStore.menuList[0].show) {
                    userStore.changeMenuState()
                }
                // 에러가 발생했던 원래의 요청을 다시 진행.
                
            })
            .catch(() => {
                if (!userStore.menuList[0].show) {
                    userStore.changeMenuState()
                }
                console.log("??")
        })
    }
}



export { regist,refresh}