import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postLoginAPI, getMemberInfoAPI } from "../../api/memberApi";
import { LoginFormData } from "../../types/member/memberTypes";
import InputField from "../common/InputField";
import SubmitButton from "../common/SubmitButton";
import ErrorMessage from "../common/ErrorMessage";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    memberId: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = !!Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const data = await postLoginAPI(formData);
      const memberInfo = await getMemberInfoAPI(data.accessToken);
      alert(`${memberInfo.name}님, 안녕하세요!`);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        name="memberId"
        type="text"
        value={formData.memberId}
        onChange={handleChange}
        required
        maxLength={20}
      />

      <InputField
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        maxLength={13}
      />

      <ErrorMessage message={errorMessage} />

      <SubmitButtonContainer>
        <SubmitButton label="로그인" disabled={isSubmitting} />
      </SubmitButtonContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 12px 24px;
`;

const SubmitButtonContainer = styled.div`
  margin: 8px 0px;
  display: flex;
  justify-content: center;
`;
