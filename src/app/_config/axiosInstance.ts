import axios from "axios";
import API_CONFIG from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

// // 요청 또는 응답 인터셉터 추가 가능
// axios.interceptors.request.use(
//   (config) => {
//     // 요청을 보내기 전에 할 작업
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
