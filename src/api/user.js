//import { localAxios } from "@/util/http-commons";

//const instance = localAxios()

// function postLogin(email,password,success, fail){
//     const param = {
//         "email": email,
//         "password":password
//     }
//     console.log(param);
//     const response = instance.post('/login', param)
//     console.log(response);
//     const newAccessToken = 'Bearer '+response.data.accessToken
//     instance.defaults.headers.common['Authorization'] = newAccessToken
    
//     .then(success)
//     .catch(fail)
    
       
// }



//export { postLogin}