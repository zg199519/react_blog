import axios from 'axios';

// 创建axios请求实例
const request = axios.create({
  baseURL: API_BASE_URL, // 设置跨域代理接口统一的前置地址
  timeout: 6000, //请求超时时间
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRFbmNyeXB0ZWQiOiI4NTcxNzIzZC0zNjU0LTRhMDQtYTM1YS04OWJiMGY4OGJlNDUiLCJpYXQiOjE1OTM0MjEyNzEsImV4cCI6MTU5NjAxMzI3MX0.qoZDqGF6JpQHsAq6GyGTEjYrs6s_gGZGY5z42gMAJ0I',
  },
});

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    //接口响应正确
    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.log('接口响应失败');
    }
  },
  function(error) {
    // if(error.response){
    //     switch (error.response.status) {
    //         case 401://代表token 验证错误
    //         LogOut()//退出登录
    //     }
    // }
    return Promise.reject(error);
  },
);

export default request;
