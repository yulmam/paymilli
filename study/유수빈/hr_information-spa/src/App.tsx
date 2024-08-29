import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./style/app.module.css";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import NotFounnd from "./pages/NotFound";
import ContentTitle from "./component/ContentTitle";
import { http } from "./utils/http";
import { UserDataType } from "./type/type";
import { Global, css } from "@emotion/react";
import normalize from "emotion-normalize";

const baseUrl = process.env.REACT_APP_BASE_URL || ""; // 기본값은 빈 문자열로 설정

export default function App() {
  const [userData, setUserData] = useState<UserDataType[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // 로컬스토리지에 데이터 있는지 확인
      if (localStorage.getItem("personalInfo") !== null) return;

      // 로컬스토리지에 데이터 없으면 저장
      const personalInfo = await http.get(
        "https://a232e3c0-0196-4330-b87d-a45352507826.mock.pstmn.io/new_data"
      );

      console.log(personalInfo);
      localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    };

    const setData = () => {
      const data = localStorage.getItem("personalInfo");
      if (data) setUserData(JSON.parse(data));
    };
    fetchUserData();
    setData();
  }, []);

  return (
    <div>
      <Router basename={baseUrl}>
        <Global
          styles={css`
            ${normalize}
            h1, h2, h3, h4, h5, h6 {
              font-size: 1em;
              font-weight: normal;
              margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
            }
          `}
        />
        <Header />
        <ContentTitle />
        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFounnd />} />
        </Routes>
      </Router>
    </div>
  );
}
