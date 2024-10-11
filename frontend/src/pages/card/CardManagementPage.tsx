import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import CardList from "../../components/card/CardList";
import AddCardForm from "../../components/card/AddCardForm";
import CardDetail from "../../components/card/CardDetail";
import NavBar from "components/layout/NavBar";
import { AddCardFormData, CardInfoData } from "../../types/card/cardTypes";
import {
  getCardListAPI,
  addCardAPI,
  deleteCardAPI,
  updateMainCardAPI,
} from "../../api/cardApi";

export default function CardManagementPage() {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [cards, setCards] = useState<CardInfoData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainCardId, setMainCardId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getCardList = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const response = await getCardListAPI(accessToken);

      setMainCardId(response.mainCardId);

      setCards(
        response.cardList.map((card: CardInfoData) => ({
          cardId: card.cardId,
          cardName: card.cardName,
          cardType: card.cardType,
          cardLastNum: card.cardLastNum,
          cardImage: card.cardImage,
        })),
      );
    } catch (error) {
      console.error("Error fetching card list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (cardId: string) => {
    const clickedCard = cards.find((card) => card.cardId === cardId);
    if (clickedCard) {
      setSelectedCard(clickedCard);
      setShowAddCardForm(false);
    }
  };

  const handleAddCardSubmit = async (formData: AddCardFormData) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const newCardFromServer: CardInfoData = await addCardAPI(
        accessToken,
        formData,
      );

      setCards([...cards, newCardFromServer]);
      setSelectedCard(null);
      setShowAddCardForm(false);
      alert("카드가 추가되었습니다.");
      await getCardList();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
      alert(errorMessage);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm("선택한 카드를 삭제하시겠습니까?")) {
      return;
    }
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      await deleteCardAPI(accessToken, cardId);

      setSelectedCard(null);
      await getCardList();
      alert("카드가 삭제되었습니다.");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
      alert(errorMessage);
    }
  };

  const handleMainCardChange = async (cardId: string) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) throw new Error("Access token is missing");

      await updateMainCardAPI(accessToken, cardId);

      setMainCardId(cardId);
      alert("메인카드로 설정되었습니다.");

      await getCardList();
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
      alert(errorMessage);
    }
  };

  useEffect(() => {
    getCardList();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <NavBar />
      <CardManagementPageContainer>
        <LeftSection>
          <CardList
            cards={cards}
            onCardClick={handleCardClick}
            onAddCardClick={() => setShowAddCardForm(true)}
            mainCardId={mainCardId}
            selectedCardId={selectedCard ? selectedCard.cardId : undefined}
          />
        </LeftSection>
        <RightSection>
          {showAddCardForm && (
            <AddCardForm
              onSubmit={handleAddCardSubmit}
              onCancel={() => setShowAddCardForm(false)}
            />
          )}
          {!showAddCardForm && (
            <CardDetail
              card={selectedCard}
              onDelete={handleDeleteCard}
              mainCardId={mainCardId}
              onMainCardChange={handleMainCardChange}
            />
          )}
        </RightSection>
      </CardManagementPageContainer>
    </>
  );
}

const CardManagementPageContainer = styled.div`
  margin: 150px auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 800px;
  margin: 0 auto;
  margin-top: 120px;
`;

const LeftSection = styled.div`
  width: 30%;
  border-right: 1px solid #ddd;
`;

const RightSection = styled.div`
  width: 65%;
`;
