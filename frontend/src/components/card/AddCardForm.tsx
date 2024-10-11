import React, { useState, useRef } from "react";
import styled from "styled-components";
import { AddCardFormData } from "../../types/card/cardTypes";
import EyeIcon from "../common/EyeIcon";
import EyeSlashIcon from "../common/EyeSlashIcon";

interface AddCardFormProps {
  onSubmit: (formData: AddCardFormData) => void;
  onCancel: () => void;
}

export default function AddCardForm({ onSubmit, onCancel }: AddCardFormProps) {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [isMasked, setIsMasked] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const cardNumberRefs = useRef<HTMLInputElement[]>([]);

  const handleCardNumberChange = (index: number, value: string) => {
    const newCardNumber = [...cardNumber];
    if (/^[0-9]*$/.test(value)) {
      newCardNumber[index] = value;
      setCardNumber(newCardNumber);

      if (value.length === 4 && index < cardNumberRefs.current.length - 1) {
        cardNumberRefs.current[index + 1].focus();
      }
    }
  };

  const maskCardNumber = (value: string) => {
    if (isMasked && value.length === 4) {
      return value.slice(0, 2) + "**";
    }
    return value;
  };

  const toggleMasking = () => {
    setIsMasked(!isMasked);
  };

  const handleExpiryDateChange = (value: string) => {
    const formattedValue = value.replace(/\D/g, "").slice(0, 4);
    if (formattedValue.length >= 3) {
      setExpiryDate(`${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`);
    } else {
      setExpiryDate(formattedValue);
    }
  };

  const handleCvcChange = (value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 3) {
      setCvc(value);
    }
  };

  const handlePasswordChange = (value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 2) {
      setPassword(value);
    }
  };

  const handleCardHolderNameChange = (value: string) => {
    const uppercaseValue = value.toUpperCase();
    if (/^[A-Z]*$/.test(uppercaseValue)) {
      setCardHolderName(uppercaseValue);
    }
  };

  const handleSubmit = () => {
    if (!isAgreed) {
      alert("간편결제 서비스 이용에 동의해야 합니다.");
      return;
    }
    const formData: AddCardFormData = {
      cardNumber: cardNumber.join(""),
      cvc,
      expirationDate: expiryDate.replace("/", ""),
      cardHolderName,
      cardPassword: password,
    };
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title>결제 시 사용할 카드를 등록해 주세요.</Title>
      <CardNumberContainer>
        <label>카드 번호</label>
        <CardInputWrapper>
          {cardNumber.map((num, index) => (
            <CardInput
              key={index}
              type="text"
              placeholder="0000"
              maxLength={4}
              value={maskCardNumber(num)}
              onChange={(e) => handleCardNumberChange(index, e.target.value)}
              ref={(el) => (cardNumberRefs.current[index] = el!)}
            />
          ))}
          <IconWrapper onClick={toggleMasking}>
            {isMasked ? <EyeIcon /> : <EyeSlashIcon />}
          </IconWrapper>
        </CardInputWrapper>
      </CardNumberContainer>

      <InputContainer>
        <label>유효기간</label>
        <div>
          <InputField
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => handleExpiryDateChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>CVC</label>
        <div>
          <InputField
            type="password"
            maxLength={3}
            value={cvc}
            onChange={(e) => handleCvcChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>카드 비밀번호</label>
        <div>
          <InputField
            type="password"
            placeholder="앞 2자리"
            maxLength={2}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <InputContainer>
        <label>카드 소유자 이름</label>
        <div>
          <NameInputField
            type="text"
            placeholder="HONGGILDONG"
            value={cardHolderName}
            onChange={(e) => handleCardHolderNameChange(e.target.value)}
          />
        </div>
      </InputContainer>

      <CheckboxContainer>
        <input
          type="checkbox"
          id="agree"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <label htmlFor="agree">간편결제 서비스 이용에 동의합니다.</label>
      </CheckboxContainer>

      <ButtonContainer>
        <Button onClick={handleSubmit}>등록</Button>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonContainer>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--description-color);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
`;

const CardNumberContainer = styled.div`
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
    color: #333;
    font-size: 16px;
  }
`;
const CardInputWrapper = styled.div`
  display: flex;
  align-items: center;
s`;

const CardInput = styled.input`
  width: 50px;
  padding: 4px;
  margin-left: 6px;
  font-size: 16px;
  text-align: start;
  &::placeholder {
    color: #ccc;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
`;

const InputContainer = styled.div`
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
    color: #333;
    font-size: 14px;
  }
`;

const InputField = styled.input`
  width: 100px;
  padding: 4px;
  margin-left: 6px;
  text-align: start;
  font-size: 16px;
  &::placeholder {
    color: #ccc;
  }
`;

const NameInputField = styled(InputField)`
  width: 150px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 6px;
  input[type="checkbox"] {
    transform: scale(1.5);
  }

  label {
    font-size: 16px;
    color: #333;
    margin-left: 6px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 6px;
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: white;
    color: var(--main-color);
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  margin-right: 6px;
  background-color: #7f8c8d;
  border: none;

  &:hover {
    border: none;
    color: white;

    background-color: #95a5a6;
  }
`;
