import axios from "axios";
import { useNotification } from "@/hooks/message"
import { useToken } from '@/hooks/token'
import { useLoginStore } from "../store/userInfo";

// axios 实例
const axiosInstance = axios.create({
   baseURL: '/api',
   timeout: 3000,
});


// 请求拦截器
axiosInstance.interceptors.request.use(function (config) {
   const token = useToken().getToken()
   // 如果已经登录，请求时带上 token
   if (token) {
      config.headers["token"] = token;
      // config.headers['Authorization'] = `Bearer ${token}`;
   }
   return config;
}, function (error) {
   return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(function (response) {
   return response.data.data;
}, function (error) {
   const msg = error.response.data.msg || "请求失败"
   if (msg == "非法token，请先登录！") {
      useLoginStore().logout()
      location.reload()
   }
   useNotification().error(msg)
   return Promise.reject(error);
});

export default axiosInstance