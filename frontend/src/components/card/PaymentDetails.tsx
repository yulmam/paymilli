import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PaymentDetailProps } from "types/card/cardTypes";
import RefundImg from "../../assets/refund.png";

interface Props extends PaymentDetailProps {
  isRefund: boolean;
}

export default function PaymentDetail({ payment, isRefund }: Props) {
  const navigate = useNavigate();

  if (!payment || !payment.storeName) {
    return <NoData>결제 세부 정보가 없습니다.</NoData>;
  }

  return (
    <DetailContainer>
      {isRefund && (
        <RefundIconWrapper>
          <RefundIcon src={RefundImg} alt="Refund" />
        </RefundIconWrapper>
      )}
      <Title>승인내역</Title>
      <DetailItem>
        <Label>가게명</Label> <Value>{payment.storeName}</Value>
      </DetailItem>
      <DetailItem>
        <Label>결제 금액</Label>{" "}
        <Value>{payment.price.toLocaleString()}원</Value>
      </DetailItem>
      <DetailItem>
        <Label>결제 날짜</Label>
        <Value>{new Date(payment.date).toLocaleString()}</Value>
      </DetailItem>
      <DetailDivider />
      <CardTitle
        onClick={() => navigate("/card/management")}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        결제 카드
      </CardTitle>
      <CardList>
        {payment.paymentResponse.map((card) => (
          <li key={card.cardId}>
            <CardDetail>
              <Label
                onClick={() => navigate("/card/management")}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {card.cardName}
              </Label>
              <Value>{card.cardType}</Value>
            </CardDetail>
            <CardDetail>
              <Label>결제금액</Label>{" "}
              <Value>{card.chargePrice.toLocaleString()}원</Value>
            </CardDetail>
            {card.cardType !== "CHECK" && (
              <CardDetail>
                <Label>할부</Label> <Value>{card.installment}개월</Value>
              </CardDetail>
            )}
            <Line />
          </li>
        ))}
      </CardList>
    </DetailContainer>
  );
}

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DetailContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  max-width: 600px;
  margin: 0px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 16px;
`;

const RefundIconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 50px;
  z-index: 2;
  opacity: 0.3;
`;

const RefundIcon = styled.img`
  transform: rotate(20deg);
  width: 300px;
  height: 300px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.div`
  font-weight: bold;
  color: #000;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  flex: 1;
  text-align: right;
  color: #666;
`;

const DetailDivider = styled.div`
  border-bottom: 2px solid #ddd;
  margin: 20px 0;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
`;

const CardList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;

  li {
    margin-bottom: 15px;
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #ddd;
  margin: 10px 0;
`;

const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 50px 0;
  border: 1px solid #ddd;
  background-color: var(--description-color);
  border-radius: 12px;
  max-width: 500px;
  margin: 30px auto;
`;
