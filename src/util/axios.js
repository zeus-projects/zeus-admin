import axios from "axios";
import { notifyError } from "@/util/notify"
import { getToken } from '@/util/auth'

// axios 实例
const axiosInstance = axios.create({
   baseURL: '/api',
   timeout: 3000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(function (config) {
   const token = getToken()
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
   notifyError(error.response.data.msg || "请求失败", 'error')
   return Promise.reject(error);
});

export default axiosInstance