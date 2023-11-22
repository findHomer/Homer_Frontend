import { ref } from 'vue'
import { defineStore } from 'pinia'
import { localAxios } from "@/util/http-commons";
const token = ref("")
const instance = localAxios()
// Pinia Composing Store
// https://pinia.vuejs.org/cookbook/composing-stores.html
export const useUserStore = defineStore('userStore', () => {

    // ***************** state ***************** 
   // const axios = inject('axios')

    const menuList = ref([
        { name: '로그인', show: true },
        { name: '회원가입', show: true },
        { name: '마이페이지', show: false, routeName: 'myPage' },
        { name: '로그아웃', show: false, routeName: 'logout' }
    ])
    const searchDto = ref({
        "aptName": '',
        "aisleType": '',
        "householdCount": '',
        "parkPerHouse": '',
    })
    const aptId= ref('A10022970');

    const changeMenuState = () => {
        menuList.value.forEach(menu => {
            menu.show = !menu.show
        })
    }

    // **************** actions **************** 
    const login = async (userInfo) => {
        // 서버로 요청
        
        await instance.post('/login', userInfo)
        .then((response) => {
            const accessToken = response.data.accessToken
            
            // 이미 페이지가 로드된 시점에 로그인을 수행 했으므로
            // axios 객체의 아래 값은 초기화가 되어있지 않음으로 값을 저장.
            // accessToken을 storage에 저장하는 경우 취약점이 발생할 수 있다.
            // pinia-plugin-persistedstate 를 사용하는 경우 storage에 저장되는 것을 막아야한다.
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
            console.log(accessToken);
            token.value= 'Bearer ' + accessToken
           
            // 로그인을 성공하여 토큰이 정상적으로 저장된 경우
            // 메뉴 표시를 수정.
            changeMenuState()

        })
    }

    const logout = async () => {
        instance.defaults.headers.common['Authorization'] = token.value
        await instance.post('/users/logout')
        .then( () => {
            instance.defaults.headers.common['Authorization'] = ''
            token.value = ''
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
            }
            changeMenuState()
        })
    }

    // 회원 정보를 수정하면 axios header에 저장된 accessToken을 삭제한다.
    const modify = async (userInfo) => {
        await instance.put('/users/modify', userInfo)
        .then( () => {
            instance.defaults.headers.common['Authorization'] = ''
            changeMenuState()
        })
    } 

    // 회원 탈퇴 시 axios header에 저장된 accessToken을 삭제한다.
    const withdrawal = async (userInfo) => {
        await instance.delete('/users/withdrawal', userInfo)
        .then( () => {
            instance.defaults.headers.common['Authorization'] = ''
            changeMenuState()
        })
    } 


    return {
        login,
        logout,
        modify,
        withdrawal,
        changeMenuState,
        menuList,
        aptId,
        searchDto
    }
},
    {
        persist: {
            storage: localStorage
        }
    }

    
)
export{
    token
    }