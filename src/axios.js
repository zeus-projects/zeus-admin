import axios from "axios";

// 创建 axios 示例
const service = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export default service