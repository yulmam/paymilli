import { useNavigate } from "react-router-dom";
import HeaderComponent from "components/shoppingmall/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postPaymentRefundAPI } from "api/shoppingmallApi";
import Cookies from "js-cookie";

interface OrderCompleteState {
  paymentData: {
    storeName: string;
    totalPrice: number;
    detail: string;
    refundToken: string;
  };
}
const SHOPPING_MALL = "SHOP TAGLINE";

export default function OrderComplete() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem(`${SHOPPING_MALL}_cartList`);
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("로그인 해주세요!");
      navigate("/login");
    } else setAccessToken(accessToken);
  }, [navigate]);

  const state = location.state as OrderCompleteState;
  if (!state || !state.paymentData) {
    alert("잘못된 요청입니다.");
    navigate("/mall/food/shopping");
    return null;
  }

  const { totalPrice, detail, refundToken } = state.paymentData;

  const handleRefundRequest = async () => {
    try {
      console.log("accessToken", accessToken);
      const data = await postPaymentRefundAPI(accessToken, refundToken);
      console.log("환불 요청 data", data);

      setShowModal(false);

      alert("환불 요청이 승인되었습니다.");
      navigate("/mall/food/shopping");
    } catch {
      alert("환불 오류가 발생하였습니다.");
    }
  };

  return (
    <S.Container>
      <HeaderComponent mall="food" />
      <S.Content>
        <img src="/img/check.png" width={50} height={50} />
        <S.Description>
          <h1>결제가 완료되었습니다!</h1>
          <p>주문이 정상적으로 처리되었습니다. 이용해주셔서 감사합니다.</p>
        </S.Description>
        <S.Button onClick={() => navigate("/mall/food/shopping")}>
          쇼핑 계속하기
        </S.Button>

        <S.RefundButton onClick={() => setShowModal(true)}>
          환불 요청
        </S.RefundButton>

        {showModal && (
          <S.Modal>
            <S.ModalContent>
              <h2>환불 요청</h2>
              <p>주문 상세: {detail}</p>
              <p>
                <strong>{totalPrice.toLocaleString()} 원</strong>을
                환불하시겠습니까?
              </p>
              <S.ModalButton issub={false} onClick={handleRefundRequest}>
                환불 요청
              </S.ModalButton>
              <S.ModalButton issub={true} onClick={() => setShowModal(false)}>
                취소
              </S.ModalButton>
            </S.ModalContent>
          </S.Modal>
        )}
      </S.Content>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100vw;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
  `,
  Description: styled.div`
    margin-top: 20px;

    h1 {
      font-size: 24px;
      color: #333;
      font-weight: bold;
    }

    p {
      margin-top: 10px;
      font-size: 16px;
      color: #666;
    }
  `,
  Button: styled.button`
    margin-top: 30px;
    background-color: var(--sub-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: var(--main-color);
    }
  `,
  RefundButton: styled.button`
    margin-top: 20px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: #ff7875;
    }
  `,
  Modal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ModalContent: styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    text-align: center;
  `,
  ModalButton: styled.button<{ issub: boolean }>`
    margin-top: 10px;
    background-color: ${(props) =>
      props.issub ? "var(--sub-color)" : "var(--gray)"};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background-color: var(--main-color);
    }
  `,
};
