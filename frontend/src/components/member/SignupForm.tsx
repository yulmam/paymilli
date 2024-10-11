import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postSignupAPI, postLoginAPI } from "../../api/memberApi";
import { SignupFormData } from "../../types/member/memberTypes";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import SubmitButton from "../common/SubmitButton";
import PaymentPasswordModal from "../modal/PaymentPasswordModal";
import ErrorMessage from "../common/ErrorMessage";

enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum PaymentPasswordStep {
  SET_PASSWORD = 1,
  CONFIRM_PASSWORD = 2,
}

export default function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    memberId: "",
    name: "",
    password: "",
    birthday: "",
    gender: GenderType.MALE,
    phone: "",
    paymentPassword: "",
  });

  const [displayedBirthday, setDisplayedBirthday] = useState<string>("");
  const [displayedPhone, setDisplayedPhone] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentPasswordStep, setPaymentPasswordStep] = useState(
    PaymentPasswordStep.SET_PASSWORD,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = !!Cookies.get("accessToken");

  useEffect(() => {
    if (isLogin) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrorMessage("");
    setConfirmPassword(e.target.value);
  };

  const validateName = (name: string): boolean => {
    const koreanRegex = /^[가-힣]+$/;
    const singleConsonantOrVowelRegex = /^[ㄱ-ㅎㅏ-ㅣ]+$/;

    return (
      name.length === 3 &&
      koreanRegex.test(name) &&
      !singleConsonantOrVowelRegex.test(name)
    );
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value } = e.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, 8);
    let formattedBirthday = onlyNumbers;

    if (onlyNumbers.length > 4) {
      formattedBirthday = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}`;
    }
    if (onlyNumbers.length > 6) {
      formattedBirthday = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}-${onlyNumbers.slice(6, 8)}`;
    }

    setFormData({ ...formData, birthday: onlyNumbers });
    setDisplayedBirthday(formattedBirthday);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { value } = e.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, 11);
    let formattedPhone = onlyNumbers;

    if (onlyNumbers.length > 3) {
      formattedPhone = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}`;
    }
    if (onlyNumbers.length > 7) {
      formattedPhone = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
    }

    setFormData({ ...formData, phone: onlyNumbers });
    setDisplayedPhone(formattedPhone);
  };

  const validateBirthday = (birthday: string): boolean => {
    if (birthday.length !== 8) return false;
    const year = parseInt(birthday.slice(0, 4), 10);
    const month = parseInt(birthday.slice(4, 6), 10);
    const day = parseInt(birthday.slice(6, 8), 10);

    if (year < 1900 || year > 2024) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeapYear = (year: number) =>
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    if (month === 2 && isLeapYear(year)) daysInMonth[1] = 29;
    if (day < 1 || day > daysInMonth[month - 1]) return false;

    return true;
  };

  const validatePhone = (phone: string): boolean => {
    return phone.length === 11;
  };

  const validateMemberId = (memberId: string): boolean => {
    const memberIdRegex = /^[A-Za-z0-9]{4,20}$/;
    return memberIdRegex.test(memberId);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}$/;
    return passwordRegex.test(password);
  };

  const validatePaymentPassword = (paymentPassword: string): boolean => {
    const paymentPasswordRegex = /^[0-9]{6}$/;
    return paymentPasswordRegex.test(paymentPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validations = [
      {
        valid: validateName(formData.name),
        errorMessage: "이름은 한글로 올바르게 입력해주세요.",
        field: "name",
      },
      {
        valid: validateBirthday(formData.birthday),
        errorMessage: "생년월일을 확인해주세요.",
        field: "birthday",
      },
      {
        valid: validatePhone(formData.phone),
        errorMessage: "전화번호는 11자리여야 합니다.",
        field: "phone",
      },
      {
        valid: validateMemberId(formData.memberId),
        errorMessage: "아이디는 4~20자의 영어 또는 숫자여야 합니다.",
        field: "memberId",
      },
      {
        valid: validatePassword(formData.password),
        errorMessage: "비밀번호는 8~13자리의 문자와 숫자 조합이어야 합니다.",
        field: "password",
      },
      {
        valid: formData.password === confirmPassword,
        errorMessage: "비밀번호가 일치하지 않습니다.",
        field: "password",
      },
      {
        valid: validatePaymentPassword(formData.paymentPassword),
        errorMessage: "결제 비밀번호를 설정해주세요",
        field: "paymentPassword",
      },
    ];

    for (const validation of validations) {
      if (!validation.valid) {
        setErrorMessage(validation.errorMessage);

        setFormData({
          ...formData,
          [validation.field]: "",
        });

        if (validation.field === "birthday") {
          setDisplayedBirthday("");
        }

        if (validation.field === "phone") {
          setDisplayedPhone("");
        }
        if (validation.field === "password") {
          setConfirmPassword("");
        }
        if (validation.field === "paymentPassword") {
          setConfirmPaymentPassword("");
        }
        return;
      }
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await postSignupAPI({
        ...formData,
        gender: formData.gender === GenderType.MALE ? "MALE" : "FEMALE",
      });
      await postLoginAPI({
        memberId: formData.memberId,
        password: formData.password,
      });
      alert(`${formData.name}님, 환영합니다!`);
      navigate("/member/info");
    } catch (err: any) {
      let errorMsg = err.response?.data?.message || err.message || undefined;
      if (errorMsg === "존재하지 않는 ID입니다.") {
        errorMsg = "관리자에게 문의하세요.";
      }
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentPasswordClick = () => {
    setFormData({ ...formData, paymentPassword: "" });
    setIsModalOpen(true);
    setPaymentPasswordStep(PaymentPasswordStep.SET_PASSWORD);
  };

  const handleSetPaymentPassword = (password: string) => {
    if (paymentPasswordStep === PaymentPasswordStep.SET_PASSWORD) {
      setFormData({ ...formData, paymentPassword: password });
      setPaymentPasswordStep(PaymentPasswordStep.CONFIRM_PASSWORD);
    } else if (paymentPasswordStep === PaymentPasswordStep.CONFIRM_PASSWORD) {
      if (password !== formData.paymentPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
        setPaymentPasswordStep(PaymentPasswordStep.SET_PASSWORD);
      } else {
        setConfirmPaymentPassword(password);
        setIsModalOpen(false);
      }
    }
  };

  const getModalTitle = () => {
    if (paymentPasswordStep === PaymentPasswordStep.SET_PASSWORD) {
      return "결제 비밀번호 설정";
    } else if (paymentPasswordStep === PaymentPasswordStep.CONFIRM_PASSWORD) {
      return "결제 비밀번호 확인";
    }
    return "";
  };

  const getModalGuide = () => {
    if (paymentPasswordStep === PaymentPasswordStep.SET_PASSWORD) {
      return "결제 비밀번호를 입력해주세요.";
    } else if (paymentPasswordStep === PaymentPasswordStep.CONFIRM_PASSWORD) {
      return "한 번 더 입력해주세요.";
    }
    return "";
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="이름"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="홍길동"
          maxLength={3}
        />

        <SelectField
          label="성별"
          name="gender"
          value={formData.gender}
          options={[
            { value: GenderType.MALE, label: "남성" },
            { value: GenderType.FEMALE, label: "여성" },
          ]}
          onChange={handleChange}
          required
        />

        <InputField
          label="생년월일"
          name="birthday"
          type="text"
          value={displayedBirthday}
          onChange={handleBirthdayChange}
          required
          placeholder="1900-01-01"
          maxLength={10}
        />

        <InputField
          label="전화번호"
          name="phone"
          type="tel"
          value={displayedPhone}
          onChange={handlePhoneChange}
          required
          placeholder="010-1234-5678"
          maxLength={13}
        />

        <InputField
          label="아이디"
          name="memberId"
          type="text"
          value={formData.memberId}
          onChange={handleChange}
          required
          placeholder="gildong123"
          maxLength={20}
        />

        <InputField
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="password123"
          maxLength={13}
        />

        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          placeholder="password123"
          maxLength={13}
        />

        <InputField
          label="결제 비밀번호"
          name="paymentPassword"
          type="password"
          value={formData.paymentPassword}
          onChange={handleChange}
          required
          onClick={handlePaymentPasswordClick}
          placeholder="숫자 6자리"
          maxLength={6}
          readOnly
        />

        <ErrorMessage message={errorMessage} />

        <SubmitButtonContainer>
          <SubmitButton label="회원가입" disabled={isSubmitting} />
        </SubmitButtonContainer>
      </FormContainer>

      {isModalOpen && (
        <PaymentPasswordModal
          onSubmit={handleSetPaymentPassword}
          onClose={() => setIsModalOpen(false)}
          title={getModalTitle()}
          guide={getModalGuide()}
        />
      )}
    </>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 12px 24px;
`;

const SubmitButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;
