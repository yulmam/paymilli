import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import XmarkIcon from "../common/XmarkIcon";

interface PaymentPasswordModalProps {
  onSubmit: (password: string) => void;
  onClose: () => void;
  title: string;
  guide?: string;
}

export default function PaymentPasswordModal({
  onSubmit,
  onClose,
  title,
  guide,
}: PaymentPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);
  const [isProtectedMode, setIsProtectedMode] = useState(true);
  const [randomActiveIndices, setRandomActiveIndices] = useState<number[]>([]);

  const shuffleNumbers = useCallback(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setShuffledNumbers(shuffled);
  }, []);

  const randomizeActiveButtons = () => {
    const randomIndices = Array(3)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    setRandomActiveIndices(randomIndices);
  };

  useEffect(() => {
    setPassword("");
    shuffleNumbers();
  }, [title, guide, shuffleNumbers]);

  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
    if (password.length === 5) {
      onSubmit(password + num);
    }

    if (isProtectedMode) {
      shuffleNumbers();
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

  const toggleProtectedMode = () => {
    setIsProtectedMode((prev) => !prev);
  };

  return (
    <Wrapper>
      <Content>
        <ToggleWrapper>
          <Tooltip>보호모드</Tooltip>
          <SwitchLabel>
            <SwitchInput
              type="checkbox"
              checked={isProtectedMode}
              onChange={toggleProtectedMode}
            />
            <Slider />
          </SwitchLabel>
        </ToggleWrapper>
        <CloseButton onClick={onClose}>
          <XmarkIcon />
        </CloseButton>
        <Description>
          <p>{title}</p>
          {guide && <GuideText>{guide}</GuideText>}
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;

  &:hover div {
    visibility: visible;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -40px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  ${ToggleWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 25px;

  &::before {
    position: absolute;
    content: "";
    height: 19px;
    width: 19px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: var(--main-color);
  }

  ${SwitchInput}:checked + &::before {
    transform: translateX(26px);
  }
`;

const Content = styled.div`
  background-color: white;
  position: relative;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  background: none;
  border: none;
`;

const Description = styled.h2`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
`;

const GuideText = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const PasswordDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ filled }) =>
    filled ? "var(--main-color)" : "lightgray"};
  margin: 0 5px;
`;

const PasswordInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? "var(--hover-color)" : "var(--main-color)"};
  color: white;
  height: 50px;
  font-size: 18px;
  margin: 0px;
  cursor: pointer;

  &:active {
    background-color: var(--hover-color);
  }
`;
