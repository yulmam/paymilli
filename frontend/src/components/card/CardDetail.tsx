import React from "react";
import styled from "styled-components";
import { CardDetailProps } from "../../types/card/cardTypes";
import StarIcon from "../common/StarIcon";

export default function CardDetail({
  card,
  onDelete,
  mainCardId,
  onMainCardChange,
}: CardDetailProps) {
  if (!card) {
    return <EmptyState>확인하실 카드를 선택해주세요.</EmptyState>;
  }

  const handleDelete = () => {
    if (card.cardId === mainCardId) {
      alert("메인카드는 삭제할 수 없습니다.");
    } else {
      onDelete(card.cardId);
    }
  };

  const maskedCardNumber = `****-****-****-${card.cardLastNum}`;

  const handleMainCardChange = () => {
    onMainCardChange(card.cardId);
  };

  return (
    <CardDetailContainer>
      <StarIconWrapper onClick={handleMainCardChange}>
        <StarIcon active={mainCardId === card.cardId} />
      </StarIconWrapper>

      <CardImage src={card.cardImage} alt={card.cardName} />
      <CardName>{`${card.cardName}`}</CardName>
      <CardInfo>
        <span>{card.cardType === "CREDIT" ? "신용카드" : "체크카드"}</span>
        <p>{maskedCardNumber}</p>
      </CardInfo>
      <ButtonContainer>
        {mainCardId !== card.cardId ? (
          <MainCardButton onClick={handleMainCardChange}>
            메인카드 설정
          </MainCardButton>
        ) : (
          <InvisibleButton />
        )}
        <DeleteButton onClick={handleDelete}>카드 삭제</DeleteButton>
      </ButtonContainer>
    </CardDetailContainer>
  );
}

const CardDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid var(--main-color);
`;

const StarIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 10;
`;

const CardImage = styled.img`
  width: 150px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const CardName = styled.h2`
  font-size: 20px;
  color: #2d3436;
  font-weight: 700;
  margin: 0;
`;

const CardInfo = styled.div`
  font-size: 16px;
  color: #636e72;
`;

const EmptyState = styled.div`
  font-size: 16px;
  color: #b2bec3;
  text-align: center;
  padding: 30px;
  border: 1px solid #dfe6e9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InvisibleButton = styled.div`
  visibility: hidden;
  padding: 10px 20px;
`;

const MainCardButton = styled.button`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--main-color);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #001f44;
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: var(--gray);
  background-color: white;
  color: red;
  border: 1px solid red;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.7;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    color: white;
    background-color: red;
    opacity: 1;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #4169e1;
    transform: translateY(0);
  }
`;
