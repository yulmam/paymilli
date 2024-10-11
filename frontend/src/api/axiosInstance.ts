import axios from "axios";
import Cookies from "js-cookie";
import { postRefreshTokenAPI } from "./memberApi";

const BASE_URL = process.env.REACT_APP_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] 요청에 문제가 있습니다.`);
    console.error(error);
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message === "access token이 유효하지 않습니다."
    ) {
      try {
        const data = await postRefreshTokenAPI();
        Cookies.set("accessToken", data.accessToken, { expires: 1 });
        const accessToken = Cookies.get("accessToken");
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
