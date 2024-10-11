import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackIcon from "../common/BackIcon";

interface PaymentPasswordInputProps {
  nickName?: string;
  onSubmit: (password: string) => void;
  restorePayment: () => void;
}

export default function PaymentPasswordInput({
  nickName = "",
  onSubmit,
  restorePayment,
}: PaymentPasswordInputProps) {
  const [password, setPassword] = useState<string>("");
  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);
  const [randomActiveIndices, setRandomActiveIndices] = useState<number[]>([]);

  const navigate = useNavigate();

  const shuffleNumbers = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setShuffledNumbers(shuffled);
  };

  const randomizeActiveButtons = () => {
    const randomIndices = Array(3)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    setRandomActiveIndices(randomIndices);
  };

  useEffect(() => {
    setPassword("");
    shuffleNumbers();
  }, []);

  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
    if (password.length === 5) {
      onSubmit(password + num);
    }
    randomizeActiveButtons();
    setTimeout(() => {
      setRandomActiveIndices([]);
    }, 50);
  };

  const handleDeleteClick = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleClearClick = () => {
    setPassword("");
  };

  const handleBackClick = () => {
    restorePayment();
  };

  return (
    <Wrapper>
      <Content>
        <BackButton onClick={handleBackClick}>
          <BackIcon />
        </BackButton>
        <Description>
          {nickName && <p>{nickName}님의</p>}
          <PasswordP>비밀번호 입력</PasswordP>
          <PasswordDisplay>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <Dot key={index} filled={index < password.length} />
              ))}
          </PasswordDisplay>
        </Description>
        <PasswordInputContainer>
          {shuffledNumbers.slice(0, 9).map((num, index) => (
            <Button
              key={index}
              onClick={() => handleNumberClick(num.toString())}
              isActive={randomActiveIndices.includes(index)}
            >
              {num}
            </Button>
          ))}
          <Button onClick={handleClearClick}>전체 삭제</Button>
          <Button
            onClick={() => handleNumberClick(shuffledNumbers[9].toString())}
            isActive={randomActiveIndices.includes(9)}
          >
            {shuffledNumbers[9]}
          </Button>
          <Button onClick={handleDeleteClick}>삭제</Button>
        </PasswordInputContainer>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 50px;
`;

const Content = styled.div`
  position: relative;
  width: calc(100% - 36px);
  height: 60vh;
  margin: 0px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PasswordP = styled.p`
  font-size: 17px;
  font-weight: bold;
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
`;

const Description = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const PasswordDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ filled }) => (filled ? "darkgray" : "lightgray")};
  margin: 0 5px;
`;

const PasswordInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  width: calc(100% - 20px);
`;

const Button = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? "var(--hover-color)" : "var(--main-color)"};
  color: white;
  height: 8vh;
  font-size: 18px;
  margin: 0px;
  cursor: pointer;

  &:active {
    background-color: var(--hover-color);
  }
`;
