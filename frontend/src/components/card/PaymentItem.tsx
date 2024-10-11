import React from "react";
import styled from "styled-components";
import { PaymentItemProps } from "../../types/card/cardTypes";

export default function PaymentItem({
  storeName,
  detail,
  price,
  date,
  paymentStatus,
  onClick,
  isSelected,
}: PaymentItemProps & { onClick: () => void; isSelected: boolean }) {
  const formatDate = (isoDate: string): string => {
    const [datePart, timePart] = isoDate.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    return `${year}.${month}.${day} ${hour}:${minute}:${second.split(".")[0]}`;
  };

  const formattedDetail = detail.endsWith("외 0개")
    ? detail.replace(/ 외 0개$/, "")
    : detail;

  return (
    <PaymentItemContainer
      onClick={onClick}
      isSelected={isSelected}
      paymentStatus={paymentStatus}
    >
      <PaymentItemDetail>
        <Header>
          <Date>{formatDate(date)}</Date>
          <Store>{storeName}</Store>
        </Header>
        <Detail>{formattedDetail}</Detail>
        <Footer>
          <Price paymentStatus={paymentStatus}>
            {price.toLocaleString()}원
          </Price>
          <Status paymentStatus={paymentStatus}>
            {paymentStatus === "PAYMENT" ? "결제 완료" : "환불 완료"}
          </Status>
        </Footer>
      </PaymentItemDetail>
    </PaymentItemContainer>
  );
}

const PaymentItemContainer = styled.div<{
  isSelected: boolean;
  paymentStatus: string;
}>`
  background-color: ${({ paymentStatus }) =>
    paymentStatus === "REFUND" ? "#fdebef" : "var(--description-color)"};
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border: ${({ isSelected }) =>
    isSelected ? "2px solid var(--main-color)" : "none"};
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const PaymentItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Date = styled.span`
  font-size: 13px;
  color: #888;
`;

const Store = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Detail = styled.span`
  font-size: 14px;
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span<{ paymentStatus: string }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) =>
    props.paymentStatus === "REFUND" ? "var(--gray)" : "var(--black)"};
  text-decoration: ${(props) =>
    props.paymentStatus === "REFUND" ? "line-through" : "none"};
`;

const Status = styled.span<{ paymentStatus: string }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ paymentStatus }) =>
    paymentStatus === "PAYMENT" ? "#28a745" : "#dc3545"};
  background-color: ${({ paymentStatus }) =>
    paymentStatus === "PAYMENT" ? "#e8f5e9" : "#f8d7da"};
  padding: 5px 10px;
  border-radius: 8px;
`;
