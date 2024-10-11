import React from "react";
import styled from "styled-components";
import { CardListProps } from "types/card/cardTypes";

export default function CardList({
  cards,
  mainCardId,
  onCardClick,
  onAddCardClick,
  selectedCardId,
}: CardListProps) {
  const sortedCards = [...cards].sort((a, b) => {
    if (a.cardId === mainCardId) return -1;
    if (b.cardId === mainCardId) return 1;
    return 0;
  });

  return (
    <CardListContainer>
      <AddCardItem onClick={onAddCardClick}>
        <AddIcon>+</AddIcon>
      </AddCardItem>
      {sortedCards.map((card) => (
        <CardItem
          key={card.cardId}
          onClick={() => onCardClick(card.cardId)}
          isMain={card.cardId === mainCardId}
          isSelected={card.cardId === selectedCardId}
        >
          <CardImage src={card.cardImage} alt={card.cardName} />
          {card.cardId === mainCardId && (
            <MainCardLabel>메인카드</MainCardLabel>
          )}
        </CardItem>
      ))}
    </CardListContainer>
  );
}

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  padding: 0;
  overflow: visible;
`;

const CardItem = styled.div<{ isMain: boolean; isSelected: boolean }>`
  width: 200px;
  height: 120px;
  background-color: ${({ isMain }) => (isMain ? "#e0f7fa" : "#f0f0f0")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid var(--main-color)" : "none"};
  box-shadow: none;
  border-radius: 8px;
`;

const MainCardLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #4caf50;
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const AddCardItem = styled.div`
  width: 200px;
  height: 120px;
  background-color: var(--description-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  box-shadow: none;
`;

const AddIcon = styled.div`
  font-size: 24px;
`;
