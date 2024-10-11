import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "util/formatCurrency";
import PaymentPasswordInput from "components/payment/PaymentPasswordInput";

interface Card {
  cardId: string;
  img: string;
  cardName: string;
  chargePrice: number;
}

const CARD_DATA: Card[] = [
  {
    cardId: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CSl1FTZlb3n9cjxIS-8JtTZY0mLK1-ucbA&s",
    cardName: "KB나라사랑카드",
    chargePrice: 20000,
  },
  {
    cardId: "2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7Ywl2SlW7v5hO171wEsh3OoHABlxagdwpQ&s",
    cardName: "IBK카드",
    chargePrice: 10000,
  },
  {
    cardId: "3",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eJg6IqyETzLjkEjcYfEgwA6Zl_3NmsS_eQ&s",
    cardName: "신한카드",
    chargePrice: 30000,
  },
];

interface RefundData {
  id: number;
  storeName: string;
  price: number;
  date: string;
  approveNumber: number;
  paymentCards: Card[];
}

const PAYMENT_CARDS: RefundData = {
  id: 1,
  storeName: "무신사",
  price: 60000,
  date: "2024-09-01 13:23",
  approveNumber: 423675,
  paymentCards: CARD_DATA,
};

export default function RefundProcess() {
  const [paymentId, setPaymentId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactionData, setTransactionData] =
    useState<RefundData>(PAYMENT_CARDS);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [paymentPassword, setPaymentPassword] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("paymentId");

    if (paymentId) {
      //todo : api 호출
      setPaymentId(paymentId);
    }
  }, [location.search]);

  const handlePasswordSubmit = (password: string) => {
    // todo : 비번 확인 로직
    if (password === "111111") {
      console.log("Password correct. Proceed with payment:");
      setIsProcessing(true);
      setShowPassword(false);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setIsProcessing(false);
      setShowPassword(false);
    }
  };

  const handleRefund = () => {
    setIsProcessing(true);
    setShowPassword(true);
  };

  const restorePayment = () => {
    setIsProcessing(false);
    setShowPassword(false);
  };

  return (
    <>
      {showPassword ? (
        <PaymentPasswordInput
          onSubmit={handlePasswordSubmit}
          restorePayment={restorePayment}
        />
      ) : (
        <Container>
          <h1>환불 페이지</h1>
          <div>
            <h2>결제 금액: {formatCurrency(transactionData.price)}</h2>
          </div>
          <div>
            <h2>카드 선택:</h2>
            {transactionData.paymentCards.map((card) => (
              <CardAllocation key={card.cardId} selected={false} rotate={false}>
                <CardImage src={card.img} alt={"카드 이미지"} />
                <p>{card.cardName}</p>
                <p>{formatCurrency(card.chargePrice)}원</p>
              </CardAllocation>
            ))}
          </div>
          <SubmitButton onClick={handleRefund} disabled={isProcessing}>
            {isProcessing ? "환불 처리 중..." : "환불하기"}
          </SubmitButton>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const CardAllocation = styled.div<{ selected: boolean; rotate: boolean }>`
  max-width: 500px;
  margin-bottom: 10px;
  border: ${(props) =>
    props.selected ? "2px solid var(--main-color)" : "1px solid #ccc"};
  padding: 10px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
`;

const SubmitButton = styled.button`
  background-color: var(--main-color);
  border: none;
  display: flex;
  border-radius: 40px;
  width: calc(100vw - 24px);
  margin: 0px 12px;
  height: 56px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  position: fixed;
  bottom: 50px;
`;
