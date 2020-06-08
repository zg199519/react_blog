
import axios from 'axios'
// import store from '@/store'

// import 'nprogress/nprogress.css'

// import { LogOut , accountAbnormal} from './../libs/base'
// import { Message} from 'element-ui';//UI框架



// 创建axios请求实例
const request = axios.create({
    baseURL: API_BASE_URL, // 设置跨域代理接口统一的前置地址
    timeout: 6000,//请求超时时间
    // headers: {
    //     'Authorization' : store.getters.getToken
    // }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {

    

    // //接口响应正确
    const data = response.data  
    // if(data.code == 4000){//账户异常 用户不存在 账户到期 账户被禁用
    //     Message.error(data.message)
    //     accountAbnormal(data.message)
    // }else if(data.code == 2000){//普通异常
    //     Message.error(data.message)
    // }

    console.log(data)
    return data;

}, function (error) {

    // if(error.response){
    //     switch (error.response.status) {
    //         case 401://代表token 验证错误 
    //         LogOut()//退出登录
    //     }
    // }
    return Promise.reject(error)
})

export default request