import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
import { SignupFormData, LoginFormData } from "../types/member/memberTypes";

// 회원가입 API
export const postSignupAPI = async (formData: SignupFormData) => {
  const response = await axiosInstance.post("/member/join", formData);
  return response.data;
};

// 회원 탈퇴 API
export const deleteMemberAPI = async (accessToken: string) => {
  const response = await axiosInstance.delete("/member", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  Cookies.remove("accessToken");
  return response.data;
};

// 로그인 API
export const postLoginAPI = async (formData: LoginFormData) => {
  const response = await axiosInstance.post<{ accessToken: string }>(
    "/member/login",
    formData,
    {
      withCredentials: true,
    },
  );
  Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
  return response.data;
};

// 로그아웃 API
export const postLogoutAPI = async (accessToken: string) => {
  const response = await axiosInstance.post(
    "/member/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  return response.data;
};

// 회원 정보 조회 API
export const getMemberInfoAPI = async (accessToken: string) => {
  const response = await axiosInstance.get("/member/info", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 토큰 재발급 API
export const postRefreshTokenAPI = async () => {
  const response = await axiosInstance.post("/member/refresh", {
    withCredentials: true,
  });
  return response.data;
};

// 결제 비밀번호 인증 API
export const postVerifyPayPassword = async (
  accessToken: string,
  paymentPassword: string,
) => {
  const response = await axiosInstance.post(
    "/member/payment/password",
    { paymentPassword },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// 결제 비밀번호 변경 API
export const putUpdatePayPassword = async (
  accessToken: string,
  paymentPasswordToken: string,
  paymentPassword: string,
) => {
  const response = await axiosInstance.put(
    "/member/payment/password",
    {
      paymentPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        paymentPasswordToken: paymentPasswordToken,
      },
    },
  );
  return response.data;
};
