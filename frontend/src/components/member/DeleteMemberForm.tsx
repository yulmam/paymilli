import React, { useState } from "react";
import Cookies from "js-cookie";
import { deleteMemberAPI } from "../../api/memberApi";
import RedButton from "../common/RedButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DeleteMemberForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!window.confirm("회원탈퇴를 진행하시겠습니까?")) {
      return;
    }

    try {
      await deleteMemberAPI(accessToken);
      alert("회원 탈퇴 성공");
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
      alert(errorMessage);
    }
  };

  return <ResignP onClick={handleSubmit}>회원탈퇴 🛑 </ResignP>;
}

const ResignP = styled.p`
  color: var(--gray);
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;
