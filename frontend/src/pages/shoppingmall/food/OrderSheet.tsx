import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ButtonComponent from "components/shoppingmall/Button";
import { useNavigate } from "react-router-dom";
import { PaymentApproveResponseType } from "types/shoppingmall/paymentType";

interface CartType {
  id: string;
  itemTitle: string;
  imgUrl: string;
  price: number;
  oriPrice: number;
  sale: number;
  count: number;
}

const THE_FREE_SHIPPING_MINIMUM_AMOUNT = 30000;
const THE_DELIVERY_CHARGE = 3000;
const SHOPPING_MALL = "SHOP TAGLINE";

export default function OrderSheet() {
  const [cartList, setCartList] = useState<CartType[] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("pay-milli");
  const navigate = useNavigate();

  useEffect(() => {
    const preCartList = localStorage.getItem(`${SHOPPING_MALL}_cartList`);
    if (preCartList) {
      setCartList(JSON.parse(preCartList));
    }
  }, []);

  const totalCost = useMemo(() => {
    const sum = cartList
      ? cartList.reduce((acc, item) => acc + item.price * item.count, 0)
      : 0;

    return sum < THE_FREE_SHIPPING_MINIMUM_AMOUNT
      ? sum + THE_DELIVERY_CHARGE
      : sum;
  }, [cartList]);

  window.notifyPaymilli = (data: PaymentApproveResponseType) => {
    console.log("결제 완료", data);
    navigate(`/mall/food/order/complete`, {
      state: {
        paymentData: data.result,
      },
    });
  };

  const openPayPopup = () => {
    const popupOptions = "width=500,height=600,scrollbars=yes";
    window.open(
      `/payment?amount=${totalCost}&mall=SHOP TAGLINE`,
      "paymentWindow",
      popupOptions,
    );
  };

  return (
    <>
      <S.pageNav>주문/결제</S.pageNav>
      <S.container>
        {!cartList || cartList.length === 0 ? (
          <h2>{"잘못된 요청입니다. 구매하고자 하는 상품을 담아주세요"}</h2>
        ) : (
          <S.orderSummary>
            <S.orderTitle>주문 상품</S.orderTitle>
            <S.cartItems>
              {cartList.map((item) => (
                <S.cartItem key={item.id}>
                  <S.itemImage src={item.imgUrl} alt={item.itemTitle} />
                  <S.itemDetails>
                    <S.itemTitle>{item.itemTitle}</S.itemTitle>
                    <S.itemPrice>
                      {item.price.toLocaleString()} 원 x {item.count}개 총{" "}
                      {item.price * item.count}원
                    </S.itemPrice>
                  </S.itemDetails>
                </S.cartItem>
              ))}
            </S.cartItems>
            <S.totalCost>
              총 주문 금액: {totalCost.toLocaleString()} 원
            </S.totalCost>
          </S.orderSummary>
        )}

        <S.orderSummary>
          <S.orderTitle>결제수단</S.orderTitle>
          <S.paymentOptions>
            <S.radioOption>
              <input
                type="radio"
                id="pay-milli"
                name="payment-method"
                value="pay-milli"
                checked={paymentMethod === "pay-milli"}
              />
              <S.label htmlFor="pay-milli">
                <img
                  src="/img/logo_paymilli.png"
                  width={70}
                  alt="Pay-milli logo"
                />
                <span>pay-milli</span>
              </S.label>
            </S.radioOption>
            <S.radioOption>
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                value="credit-card"
                checked={false}
              />
              <S.label htmlFor="credit-card">일반 카드 결제</S.label>
            </S.radioOption>
            <S.radioOption>
              <input
                type="radio"
                id="bank-transfer"
                name="payment-method"
                value="bank-transfer"
                checked={false}
              />
              <S.label htmlFor="bank-transfer">계좌이체</S.label>
            </S.radioOption>
          </S.paymentOptions>
        </S.orderSummary>

        <S.orderFooter>
          <S.footerText>
            약관 및 주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </S.footerText>
          <ButtonComponent importance="high">
            <S.buttonText onClick={openPayPopup}>
              {totalCost.toLocaleString()} 결제하기
            </S.buttonText>
          </ButtonComponent>
        </S.orderFooter>
      </S.container>
    </>
  );
}

const S = {
  container: styled.div`
    background-color: #f3f5f7;
    padding: 20px;
    border-radius: 8px;
    padding-bottom: 100px;
  `,
  pageNav: styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #000;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
    padding: 10px 0px;
  `,
  orderSummary: styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  `,
  orderTitle: styled.h2`
    font-size: 18px;
    margin-bottom: 15px;
  `,
  cartItems: styled.div`
    margin-bottom: 20px;
  `,
  cartItem: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  `,
  itemImage: styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
  `,
  itemDetails: styled.div`
    flex: 1;
  `,
  itemTitle: styled.p`
    font-size: 16px;
    margin: 0;
  `,
  itemPrice: styled.p`
    font-size: 14px;
    color: #666;
  `,
  totalCost: styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: right;
  `,
  paymentOptions: styled.div`
    margin-top: 10px;
  `,
  radioOption: styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  `,
  label: styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;

    img {
      margin-right: 10px;
    }

    span {
      font-size: 16px;
    }
  `,
  orderFooter: styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    height: 80px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ddd;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    padding: 0 20px;
  `,
  footerText: styled.span`
    font-size: 14px;
    color: #767678;
  `,
  buttonText: styled.p`
    color: #fff;
    margin: 0;
  `,
};
