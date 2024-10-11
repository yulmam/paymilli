import { PaymentApproveResponseType } from "types/shoppingmall/paymentType";

// src/global.d.ts
export {};

declare global {
  interface Window {
    notifyPaymilli: (data: PaymentApproveResponseType) => void;
  }
}
