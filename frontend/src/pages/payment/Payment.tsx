import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "util/formatCurrency";
import PaymentPasswordInput from "components/payment/PaymentPasswordInput";
import { getCardListAPI } from "api/cardApi";
import Cookies from "js-cookie";
import { PaymentApproveResponseType } from "types/shoppingmall/paymentType";
import {
  postPaymentApproveAPI,
  postPaymentDemandAPI,
} from "api/shoppingmallApi";
import { PaymentDemandType } from "types/shoppingmall/paymentType";

interface Card {
  cardId: string;
  cardImage: string;
  cardLastNum: string;
  cardName: string;
  cardType: "CHECK" | "CREDIT";
}

interface CartType {
  id: string;
  itemTitle: string;
  imgUrl: string;
  price: number;
  oriPrice: number;
  sale: number;
  count: number;
}

export default function Payment() {
  const [paymentAmount, setPaymentAmount] = useState<string>("1000");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [cardAllocations, setCardAllocations] = useState<{
    [key: string]: string;
  }>({});
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cartList, setCartList] = useState<CartType[]>([]);
  const [transactionId, setTransactionId] = useState<string>("");
  const [shoppingMall, setShoppingMall] = useState<string>("");
  const [installments, setInstallments] = useState<{ [key: string]: number }>(
    {},
  );

  const location = useLocation();
  const navigate = useNavigate();
  const popupOptions = "width=500,height=600,scrollbars=yes";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("amount") || "0";
    const mall = queryParams.get("mall") || "";
    console.log("mall : ", mall);

    setPaymentAmount(amount);
    setShoppingMall(mall);

    const storedCartList = localStorage.getItem(`${mall}_cartList`);
    if (storedCartList) {
      setCartList(JSON.parse(storedCartList));
    }

    const fetchCards = async () => {
      try {
        const token = Cookies.get("accessToken") || "";
        setAccessToken(token);

        if (!token) {
          alert("로그인 해주세요!!");
          navigate("/login");
          return;
        }

        const data = await getCardListAPI(token);
        setCards(data.cardList);

        if (data.cardList.length > 0) {
          setCardAllocations({ [data.cardList[0].cardId]: amount });
          setSelectedCards(new Set([data.cardList[0].cardId]));
        } else {
          alert("카드 등록을 해주세요!");
          navigate("/card/management");
        }
      } catch (error) {
        console.error("카드 목록 가져오기 실패:", error);
      }
    };

    fetchCards();
  }, [location.search]);

  const handleEqualDistribution = () => {
    if (selectedCards.size === 0) {
      alert("카드를 선택해주세요.");
      return;
    }

    const totalAmount = parseFloat(paymentAmount);
    const basicAmount = Math.floor(totalAmount / selectedCards.size / 10) * 10;

    const updatedAllocations: { [key: string]: string } = {};
    let remainingAmount = totalAmount;

    selectedCards.forEach((cardId) => {
      updatedAllocations[cardId] = basicAmount.toString();
      remainingAmount -= basicAmount;
    });

    if (remainingAmount !== 0) {
      const mainCardId = Array.from(selectedCards)[0];

      updatedAllocations[mainCardId] = (
        parseFloat(updatedAllocations[mainCardId]) + remainingAmount
      ).toString();
    }

    setCardAllocations(updatedAllocations);
  };

  const handleCardAmountChange = (cardId: string, amount: string) => {
    const normalizedAmount = isNaN(parseFloat(amount))
      ? "0"
      : parseFloat(amount).toString();

    setCardAllocations((prev) => ({ ...prev, [cardId]: normalizedAmount }));

    setSelectedCards((prev) => {
      const updatedSet = new Set(prev);
      if (parseFloat(normalizedAmount) > 0) {
        updatedSet.add(cardId);
      }
      return updatedSet;
    });
  };

  const handleCheckboxChange = (cardId: string, checked: boolean) => {
    if (checked) {
      const totalAmount = parseFloat(paymentAmount);
      const numSelectedCards = selectedCards.size + 1;
      const newBasicAmount =
        Math.floor(totalAmount / numSelectedCards / 10) * 10;

      const updatedAllocations = { ...cardAllocations };
      let remainingAmount = totalAmount;

      selectedCards.forEach((id) => {
        updatedAllocations[id] = newBasicAmount.toString();
        remainingAmount -= newBasicAmount;
      });

      const cardAllocationAmount = Math.floor(remainingAmount / 10) * 10;
      updatedAllocations[cardId] = cardAllocationAmount.toString();
      remainingAmount -= cardAllocationAmount;

      if (remainingAmount !== 0) {
        const mainCardId = Array.from(selectedCards)[0] || cardId;
        updatedAllocations[mainCardId] = (
          parseFloat(updatedAllocations[mainCardId]) + remainingAmount
        ).toString();
      }

      setCardAllocations(updatedAllocations);
      setSelectedCards((prev) => new Set(prev).add(cardId));
    } else {
      setCardAllocations((prev) => ({ ...prev, [cardId]: "0" }));
      setSelectedCards((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(cardId);
        return updatedSet;
      });
    }
  };

  const proceedPay = async () => {
    try {
      const paymentCards = Object.entries(cardAllocations)
        .map(([cardId, amount]) => ({
          cardId,
          chargePrice: parseFloat(amount),
          installment: installments[cardId] || 1,
        }))
        .filter((card) => card.chargePrice > 0);

      const paymentData: PaymentDemandType = {
        storeName: shoppingMall,
        totalPrice: parseFloat(paymentAmount),
        detail:
          cartList && `${cartList[0].itemTitle} 외 ${cartList.length - 1}개`,
        paymentCards,
      };

      console.log("paymentData", paymentData);

      const data = await postPaymentDemandAPI(accessToken, paymentData);
      console.log("결제 요청 성공:", data);
      const transactionId = data.result.transactionId;
      setTransactionId(transactionId);
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  };

  const handlePayment = () => {
    // 선택된 카드들에 대한 금액 합산
    const totalAllocatedAmount = Object.entries(cardAllocations)
      .filter(([cardId]) => selectedCards.has(cardId)) // 선택된 카드만 필터링
      .reduce((acc, [, amount]) => acc + parseFloat(amount), 0);

    // 0원 결제 확인: 선택된 카드들만 대상으로 검사
    const zeroAmountCards = Object.entries(cardAllocations)
      .filter(([cardId]) => selectedCards.has(cardId)) // 선택된 카드만 필터링
      .map(([cardId, amount], idx) => ({
        cardId,
        amount: parseFloat(amount),
        index: idx,
      }))
      .filter(({ amount }) => amount === 0);

    // 선택된 카드들 중에서 0원 결제가 존재하면 경고 메시지 출력
    if (zeroAmountCards.length > 0) {
      const cardIndices = zeroAmountCards
        .map((card) => `${card.index + 1}번째 카드`) // 인덱스는 1부터 시작하도록 수정
        .join(", ");
      alert(
        `0원 결제가 불가능합니다. \n${cardIndices}가 0원으로 입력되어 있습니다.`,
      );
      return;
    }

    // 선택된 카드의 분배된 금액 합과 결제 금액이 일치하는지 확인
    if (totalAllocatedAmount !== parseFloat(paymentAmount)) {
      alert("각 카드에 분배된 금액의 합이 총 결제 금액과 일치해야 합니다.");
      return;
    }

    try {
      proceedPay();
      console.log("결제 처리 시작:", cardAllocations);
      setIsProcessing(true);
      setShowPassword(true);
    } catch (err: any) {
      alert("결제 과정 중 오류가 발생했습니다.");
    }
  };

  const notifyParentAndClose = (data: PaymentApproveResponseType) => {
    if (window.opener && typeof window.opener.notifyPaymilli === "function") {
      window.opener.notifyPaymilli(data);
    }
    window.close();
  };

  const restorePayment = () => {
    setIsProcessing(false);
    setShowPassword(false);
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const data = await postPaymentApproveAPI(
        accessToken,
        transactionId,
        password,
      );

      console.log("api 데이터", data);

      setIsProcessing(true);
      setShowPassword(false);

      notifyParentAndClose(data);
    } catch (error: any) {
      // `error?.response?.data`가 있는지 먼저 확인
      const code = error?.response?.data?.code;
      console.log(code, "의 타입 : ", typeof code);

      // 에러 메시지를 `response`가 있을 때와 없을 때로 나누어 처리
      let errorMessage =
        error?.response?.data?.message ||
        "결제 중 문제가 발생했습니다. 관리자에게 문의해주세요";

      // code가 402인 경우 카드 정보 확인 메시지 추가
      if (code === 402) {
        const cardName = error?.response?.data?.result?.cardName;
        const cardNumber = error?.response?.data?.result?.cardNumber;

        if (cardName && cardNumber) {
          console.log(cardName, cardNumber);
          errorMessage += `\n${cardName}(${cardNumber})를 확인해주세요!`;
        } else {
          console.log("Card information is missing in the response data.");
        }
      }

      // 사용자에게 경고창으로 에러 메시지 표시
      alert(errorMessage);
    }
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
          <Header>
            <img
              src="/img/logo_paymilli-removebg.png"
              width={100}
              alt="Pay-milli logo"
            />
            <h2>결제 페이지</h2>
          </Header>

          <Content>
            <DescriptionContainer>
              <div>
                <h4>최종 결제 금액 : {formatCurrency(paymentAmount)}원</h4>
                <p>결제를 원하는 카드를 선택하고 금액을 분배하세요.</p>
              </div>
              <DistributionButton onClick={handleEqualDistribution}>
                균등 분배
              </DistributionButton>
            </DescriptionContainer>

            <CardList>
              {cards &&
                cards.map((card) => (
                  <CardAllocation
                    key={card.cardId}
                    selected={selectedCards.has(card.cardId)}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCards.has(card.cardId)}
                        onChange={(e) =>
                          handleCheckboxChange(card.cardId, e.target.checked)
                        }
                      />
                      <CardImage src={card.cardImage} alt="카드 이미지" />
                      <CardInfo>
                        <RowContainer>
                          <CardName>{card.cardName}</CardName>
                          <CardType>{card.cardType}</CardType>
                        </RowContainer>
                        <CardNumber>
                          **** **** **** {card.cardLastNum}
                        </CardNumber>

                        <AmountInputWrapper>
                          <AmountInput
                            type="text"
                            value={formatCurrency(
                              cardAllocations[card.cardId] || "0",
                            )}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              handleCardAmountChange(card.cardId, value);
                            }}
                            disabled={!selectedCards.has(card.cardId)}
                          />
                          <CurrencySymbol>원</CurrencySymbol>
                          {card.cardType === "CREDIT" &&
                            selectedCards.has(card.cardId) && (
                              <InstallmentDropdown
                                value={installments[card.cardId] || 0}
                                onChange={(e) =>
                                  setInstallments((prev) => ({
                                    ...prev,
                                    [card.cardId]: Number(e.target.value),
                                  }))
                                }
                              >
                                <option value={1}>일시불</option>
                                <option value={3}>3개월</option>
                                <option value={6}>6개월</option>
                                <option value={9}>9개월</option>
                                <option value={12}>12개월</option>
                              </InstallmentDropdown>
                            )}
                        </AmountInputWrapper>
                      </CardInfo>
                    </label>
                  </CardAllocation>
                ))}
            </CardList>
          </Content>

          <SubmitButton onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "결제 처리 중..." : "결제하기"}
          </SubmitButton>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;

  img {
    margin-right: 16px;
  }

  h2 {
    color: var(--main-color);
  }
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const AmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  select {
    margin-left: 8px;
  }
`;

const InstallmentDropdown = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AmountInput = styled.input`
  width: 80px;
  text-align: right;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  &:disabled {
    color: #aaa;
  }
`;

const CurrencySymbol = styled.span`
  font-size: 16px;
  margin-left: 5px;
  color: #333;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h4,
  h5 {
    margin: 0;
    color: var(--main-color);
  }

  p {
    margin-top: 8px;
    color: #555;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 350px;
  overflow-y: auto;
  margin: 12px 0px;
`;

const CardAllocation = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border: ${(props) =>
    props.selected ? "2px solid var(--main-color)" : "1px solid #ddd"};
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.selected ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "none"};
  transition: all 0.3s ease;

  label {
    display: flex;
    align-items: center;

    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 80px;
  height: 50px;
  margin-right: 16px;
  border-radius: 8px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardName = styled.span`
  // font-weight: bold;
  color: black;
`;
const CardType = styled.span`
  color: var(--gray);
`;

const CardNumber = styled.span`
  color: var(--gray);
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: var(--main-color);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DistributionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--main-color);
  }
`;
