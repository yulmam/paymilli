import React, { useState } from "react";
import Cookies from "js-cookie";
import { postLogoutAPI } from "../../api/memberApi";
import RedButton from "../common/RedButton";
import { useNavigate } from "react-router-dom";

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

    if (!window.confirm("로그아웃을 진행하시겠습니까?")) {
      return;
    }

    try {
      await postLogoutAPI(accessToken);
      alert("로그아웃 성공");
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || err.message || undefined);
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RedButton label="로그아웃" />
    </form>
  );
}
