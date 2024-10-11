export interface PaymentCardType {
  cardId: string;
  chargePrice: number;
  installment: number;
}

export interface PaymentDemandType {
  storeName: string;
  totalPrice: number;
  detail: string;
  paymentCards: PaymentCardType[];
}

export interface PaymentApproveResponseType {
  code: number;
  message: string;
  result: {
    storeName: string;
    totalPrice: number;
    detail: string;
    refundToken: string;
  };
}
