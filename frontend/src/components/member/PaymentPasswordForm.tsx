import React, { useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import PaymentPasswordModal from "../../components/modal/PaymentPasswordModal";
import {
  postVerifyPayPassword,
  putUpdatePayPassword,
} from "../../api/memberApi";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../common/SubmitButton";

enum PasswordChangeStep {
  VERIFY_PASSWORD = 1,
  SET_NEW_PASSWORD = 2,
  CONFIRM_NEW_PASSWORD = 3,
}

export default function PaymentPasswordForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<PasswordChangeStep>(
    PasswordChangeStep.VERIFY_PASSWORD,
  );
  const [paymentPasswordToken, setPaymentPasswordToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSetPassword = async (password: string) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    switch (step) {
      case PasswordChangeStep.VERIFY_PASSWORD:
        try {
          const data = await postVerifyPayPassword(accessToken, password);
          setPaymentPasswordToken(data.paymentPasswordToken);
          setStep(PasswordChangeStep.SET_NEW_PASSWORD);
        } catch (err: any) {
          setErrorMessage(
            err.response?.data?.message || err.message || undefined,
          );
          alert("결제 비밀번호가 일치하지 않습니다.");
          setIsModalOpen(false);
        }
        break;

      case PasswordChangeStep.SET_NEW_PASSWORD:
        setNewPassword(password);
        setStep(PasswordChangeStep.CONFIRM_NEW_PASSWORD);
        break;

      case PasswordChangeStep.CONFIRM_NEW_PASSWORD:
        if (password === newPassword) {
          try {
            await putUpdatePayPassword(
              accessToken,
              paymentPasswordToken,
              newPassword,
            );
            alert("비밀번호가 변경되었습니다.");
            setIsModalOpen(false);
            setPaymentPasswordToken("");
          } catch (err: any) {
            setErrorMessage(
              err.response?.data?.message || err.message || undefined,
            );
            alert(errorMessage);
            setStep(PasswordChangeStep.SET_NEW_PASSWORD);
          }
        } else {
          alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
          setStep(PasswordChangeStep.SET_NEW_PASSWORD);
        }
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    setStep(PasswordChangeStep.VERIFY_PASSWORD);
    setIsModalOpen(true);
  };

  const getModalTitle = () => {
    switch (step) {
      case PasswordChangeStep.VERIFY_PASSWORD:
        return "결제 비밀번호 확인";
      case PasswordChangeStep.SET_NEW_PASSWORD:
        return "결제 비밀번호 설정";
      case PasswordChangeStep.CONFIRM_NEW_PASSWORD:
        return "결제 비밀번호 확인";
      default:
        return "";
    }
  };

  const getModalGuide = () => {
    switch (step) {
      case PasswordChangeStep.VERIFY_PASSWORD:
        return "현재 비밀번호를 입력해주세요.";
      case PasswordChangeStep.SET_NEW_PASSWORD:
        return "새 비밀번호를 입력해주세요.";
      case PasswordChangeStep.CONFIRM_NEW_PASSWORD:
        return "새 비밀번호를 다시 한번 입력해주세요.";
      default:
        return "";
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <SubmitButtonContainer>
          <SubmitButton label="결제 비밀번호 변경" onClick={handleOpenModal} />
        </SubmitButtonContainer>
      </form>

      {isModalOpen && (
        <PaymentPasswordModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSetPassword}
          title={getModalTitle()}
          guide={getModalGuide()}
        />
      )}
    </>
  );
}

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
