import { localAxios } from "@/util/http-commons";

const instance = localAxios()

function regist(registDto,success, fail){
    
    console.log(registDto);
    instance.post('/users/signup', registDto.value)
    .then(success)
    .catch(fail)
}



export { regist}