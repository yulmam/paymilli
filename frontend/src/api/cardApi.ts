import axiosInstance from "./axiosInstance";
import { AddCardFormData } from "../types/card/cardTypes";

// 결제내역 조회
export const getPaymentHistoryAPI = async (accessToken: string) => {
  const response = await axiosInstance.get("/payment", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.transactions;
};

// 결제내역 세부조회
export const getPaymentDetailAPI = async (
  paymentId: string,
  accessToken: string,
) => {
  const response = await axiosInstance.get(`/payment/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 카드목록 조회
export const getCardListAPI = async (accessToken: string) => {
  const response = await axiosInstance.get("/card", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { mainCardId, cardList } = response.data;

  return {
    mainCardId,
    cardList,
  };
};

// 메인카드 변경
export const updateMainCardAPI = async (
  accessToken: string,
  cardId: string,
) => {
  const response = await axiosInstance.put(
    "/card/maincard",
    {
      cardId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// 카드등록
export const addCardAPI = async (
  accessToken: string,
  formData: AddCardFormData,
) => {
  const response = await axiosInstance.post("/card", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 카드삭제
export const deleteCardAPI = async (accessToken: string, cardId: string) => {
  const response = await axiosInstance.delete("/card", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      cardId,
    },
  });
  return response.data;
};
