import qs from 'qs';
import axios from 'axios';
import {
    Message
} from 'element-ui';
var HTTP = function(API_URL,params){
    params.token = sessionStorage.getItem("data_token");
    return new Promise((resolve,reject)=>{
        axios.post(API_URL, qs.stringify(params)).then((res) => {
            if (res.data.status == 10001) {
                window.parent.location.hash = '#/login';
            }else if (res.data.status == 1) {
                resolve(res);
            } else {
                if((API_URL == 'http://api.shopsn.cn/agent/adminstore.php/StoreInsideClass/nextClass') 
                    && (params.id == 20 || params.id == 14)) {
                } else {
                    Message.error(res.data.message);
                }
                reject(res);
            }
        })
    })
}
module.exports = HTTP;
// var HTTP=function(API_URL,params){
//     params.token=sessionStorage.getItem('data_token');
//     return new Promise((resolve,resolve)=>{
//         axios.post(API_URL,qs.stringify(params)).then((res)=>{
//             if(res.data.status===10001){
//                 window.location.hash="#/login";
//             }else if(res.data.status==1){
//                 resolve(res);
//             }else{
//                 Message.error(res.data.message);
//                 reject(res);
//             }
//         });;
//     });
// }
// module.exports= HTTP;
// export default HTTP;