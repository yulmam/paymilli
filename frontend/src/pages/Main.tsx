import NavBar from "components/layout/NavBar";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function Main() {
  const [isElectronicMallModalOpen, setElectronicMallModalOpen] =
    useState(false);
  const [isFoodMallModalOpen, setFoodMallModalOpen] = useState(false);

  useEffect(() => {
    setElectronicMallModalOpen(true);
    setFoodMallModalOpen(true);
  }, []);

  const toggleElectronicMallPopup = () => {
    setElectronicMallModalOpen(!isElectronicMallModalOpen);
  };

  const toggleFoodMallPopup = () => {
    setFoodMallModalOpen(!isFoodMallModalOpen);
  };

  return (
    <>
      <NavBar />
      <ImageContainer>
        {[1, 2, 3, 4].map((idx) => (
          <img
            src={`/img/mainPage/${idx}.png`}
            alt="사이트 소개 사진"
            key={idx}
          />
        ))}
      </ImageContainer>

      {isElectronicMallModalOpen && (
        <AdContainer height={-340} mall="electronic">
          <Logo width={100} src="/img/samsungApp.svg" alt="삼성 닷컴 로고" />
          <TopText>제휴 쇼핑몰 추천 리스트 Ⅰ</TopText>
          <MainHeading>
            신혼부부를 위한 필수 가전! <br />
            PAY-MILLI와 함께 스마트한 선택을 해보세요! ✨
          </MainHeading>
          <ButtonContainer>
            <AdButton
              mall={"electronic"}
              href="/mall/electronic/shopping"
              target="_blank"
            >
              삼성 닷컴
            </AdButton>
          </ButtonContainer>
          <CloseButton onClick={toggleElectronicMallPopup}>X</CloseButton>
        </AdContainer>
      )}

      {isFoodMallModalOpen && (
        <AdContainer height={0} mall="food">
          <Logo
            width={150}
            src="/img/logo_shopingmall.png"
            alt="맛집 탐방 로고"
          />
          <TopText>제휴 쇼핑몰 추천 리스트 Ⅱ</TopText>
          <MainHeading>
            {"매일의 식사, 더 맛있고 건강하게🍖 "}
            <br />
            {"PAY-MILLI가 추천하는 TAGLINE SHOP에서 쇼핑하세요!"}
          </MainHeading>

          <ButtonContainer>
            <AdButton mall={"food"} href="/mall/food/shopping" target="_blank">
              TAGLINE SHOP
            </AdButton>
          </ButtonContainer>
          <CloseButton onClick={toggleFoodMallPopup}>X</CloseButton>
        </AdContainer>
      )}
    </>
  );
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 100px;
  align-items: center;

  img {
    max-width: 80%;
    height: auto;
    border-radius: 8px;
  }
`;

const AdContainer = styled.div<{ height: number; mall: string }>`
  position: fixed;
  bottom: 0;
  right: 10px;
  transform: translateY(${(props) => props.height}px);
  width: 400px;
  background: ${(props) =>
    props.mall === "electronic"
      ? "linear-gradient(5deg, #ff7e5f, #feb47b)" // 전자상가에 대한 그라데이션
      : "linear-gradient(135deg, #86a8e7, #91eae4)"}; // 식품몰에 대한 그라데이션
  border: 1px solid #ddd;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 12px;
  z-index: 1000;
  text-align: center;
`;

const Logo = styled.img<{ width: number }>`
  width: ${(props) => props.width}px;
  height: auto;
`;

const TopText = styled.h3`
  font-size: 20px;
  color: var(--primary-color);
`;

const MainHeading = styled.h2`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 30px;
`;

const AdButton = styled.a<{ mall: string }>`
  background-color: ${(props) =>
    props.mall === "electronic" ? "var(--main-color)" : "#ff6500"};
  color: white;
  padding: 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  width: 45%;
  text-align: center;
  flex: 1;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const SubText = styled.p`
  font-size: 12px;
  color: #f0f0f0;
  margin-top: 5px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    color: #e74c3c;
  }
`;
