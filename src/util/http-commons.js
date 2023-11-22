import axios from 'axios'
import { httpStatusCode } from './http-status'
import { token,useUserStore } from '@/components/stores/user-store'
const { VITE_SERVER_URL } = import.meta.env

function localAxios() {
    
    // Refresh Token을 주고 받기 위한 설정.
// CORS 정책을 허용한다. => 다른 주소의 요청을 방지
// https://axios-http.com/docs/req_config
const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    withCredentials: true
})

    
// Request 발생 시 적용할 내용.
instance.defaults.headers.common['Authorization'] = ''
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'

// Request, Response 시 설정한 내용을 적용.
instance.interceptors.request.use(async(config) => {
    // 현재 accessToken 확인 없을 시 재발급(새로고침시 발동)
    if (!instance.defaults.headers.common['Authorization']) {
        
        // Token 재발급 로직
        if (!isTokenRefreshing) {
            isTokenRefreshing = true;
            const userStore = useUserStore();
            try {
                token.value=''
                const response = await instance.post('/users/silent-refresh');
                const newAccessToken = "Bearer "+response.data

                //instance.defaults.headers.common['Authorization'] = newAccessToken;
                token.value = newAccessToken;
                config.headers.Authorization = newAccessToken;
                
                if (userStore.menuList[0].show) {
                    userStore.changeMenuState()
                }
            } catch (error) {
               
                if (!userStore.menuList[0].show) {
                    userStore.changeMenuState()
                }
                // 토큰 재발급 실패 처리
                //console.error("Token refresh failed:", error);
                // 추가적인 처리, 예: 로그인 페이지로 리디렉트 등
            } finally {
                isTokenRefreshing = false;
            }
        }
    }
    return config
}), (error) => {
    return Promise.reject(error)
}

// accessToken의 값이 유효하지 않은 경우,
// refreshToken을 이용해 재발급 처리.

let isTokenRefreshing = false

instance.interceptors.response.use((response) => {
    return response
}, async (error) => {

    const { config, response: { status } } = error
    

    // 페이지가 새로고침되어 저장된 accessToken이 없어진 경우.
    // 토큰 자체가 만료되어 더 이상 진행할 수 없는 경우.
    if (status == httpStatusCode.UNAUTHORIZED) {
        // 요청 상태 저장
        
        const originalRequest = config

        // Token을 재발급하는 동안 다른 요청이 발생하는 경우 대기.
        // 다른 요청을 진행하면, 새로 발급 받은 Token이 유효하지 않게 됨.
        if (!isTokenRefreshing) {
            isTokenRefreshing = true
            const userStore = useUserStore();
            // 에러가 발생했던 컴포넌트의 axios로 이동하고자하는 경우
            // 반드시 return을 붙여주어야한다.
            token.value=''
            return await instance.post('/users/silent-refresh')
                .then((response) => {
                    const newAccessToken = "Bearer "+response.data

                    //instance.defaults.headers.common['Authorization'] = newAccessToken
                    token.value= newAccessToken;
                    originalRequest.headers.Authorization = newAccessToken

                    isTokenRefreshing = false
                    
                    if (userStore.menuList[0].show) {
                        userStore.changeMenuState()
                    }
                    // 에러가 발생했던 원래의 요청을 다시 진행.
                    return instance(originalRequest)
                })
                .catch(() => {
                    if (!userStore.menuList[0].show) {
                        userStore.changeMenuState()
                    }
            })
        }
    }
    else if (status == httpStatusCode.FORBIDDEN) {
        alert(error.response.data.message)
    }

    return Promise.reject(error)
    }
);
return instance;
}

export {localAxios};