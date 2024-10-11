export interface PaymentItemProps {
  id: string;
  storeName: string;
  detail: string;
  price: number;
  date: string;
  paymentStatus: string;
}

export interface AddCardFormData {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolderName: string;
  cardPassword: string;
}

export interface CardInfoData {
  cardId: string;
  cardName: string;
  cardType: string;
  cardLastNum: string;
  cardImage: string;
}

export interface PaymentDetailProps {
  payment: {
    id: string;
    storeName: string;
    price: number;
    date: string;
    paymentResponse: {
      cardId: string;
      cardName: string;
      cardImg: string;
      installment: number;
      chargePrice: number;
      cardType: string;
      approveNumber: string;
    }[];
  };
}

export interface CardDetailProps {
  card: CardInfoData | null;
  onDelete: (cardId: string) => void;
  mainCardId: string;
  onMainCardChange: (cardId: string) => void;
}

export interface CardListProps {
  cards: CardInfoData[];
  mainCardId: string;
  onCardClick: (cardId: string) => void;
  onAddCardClick: () => void;
  selectedCardId?: string;
}
