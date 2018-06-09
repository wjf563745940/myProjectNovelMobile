import axios from 'axios';
import Qs from 'qs'
import cookieUtil from 'js-cookie'
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置
//POST传参序列化
axios.interceptors.request.use(
    config => {
      if(config.method  === 'post'){
          config.data = Qs.stringify(config.data);
      }
      if (cookieUtil.get('csrfToken') && !(/^(GET|HEAD|OPTIONS|TRACE)$/.test(config.method)) ) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          console.log(cookieUtil.get('csrfToken'))
             config.headers['x-csrf-token'] = cookieUtil.get('csrfToken')
         }
      return config;
    },
    error =>{
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:break;//假定401为约定好的后台session失效的状态吗，页面重新跳转到登陆页清掉cookie缓存
                case 500:break;
                case 403 ://未登录
                router.push('/login')    
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
const DEBUG_MODE = true
var URL_PREFIX = DEBUG_MODE ? ' /api' :'http://192.168.51.199:7001';// ' http://192.168.1.100:7001'; //
export  default {
  
  getNovelByName(par){
    return axios.get(URL_PREFIX+'/getNovelByName?'+par)
  },
 addNovel(par){
    return axios.get(URL_PREFIX+'/addNovel?'+par)
  },

}
