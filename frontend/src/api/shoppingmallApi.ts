import { PaymentDemandType } from "types/shoppingmall/paymentType";
import axiosInstance from "./axiosInstance";

export const fetchProductListAPI = async (mall: string = "food") => {
  const apiFoodEndpoint = process.env.REACT_APP_API_FOOD_MALL_END_POINT;
  const apiElectronicEndpoint =
    process.env.REACT_APP_API_ELECTRONIC_MALL_END_POINT;

  const apiEndpoint = mall == "food" ? apiFoodEndpoint : apiElectronicEndpoint;

  if (apiEndpoint) {
    const res = await fetch(apiEndpoint);
    const result = await res.json();
    console.log(result);
    return result;
  } else {
    alert("env 설정에 문제가 생겼습니다. 관리자에게 문의해주세요!");
  }
};

// 결제 요청 1단계 API
export const postPaymentDemandAPI = async (
  accessToken: string,
  paymentData: PaymentDemandType,
) => {
  const response = await axiosInstance.post("/payment/demand", paymentData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 결제 요청 2단계 API
export const postPaymentApproveAPI = async (
  accessToken: string,
  transactionId: string,
  password: string,
) => {
  const response = await axiosInstance.post("/payment/approve", password, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      transactionId,
    },
  });
  return response.data;
};

// 환불 요청 API
export const postPaymentRefundAPI = async (
  accessToken: string,
  refundToken: string,
) => {
  const response = await axiosInstance.post("/payment/refund", refundToken, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
