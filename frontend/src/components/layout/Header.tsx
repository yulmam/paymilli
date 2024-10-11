import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/favicon.png";

export default function Header() {
  const [isLogin] = useState(!!Cookies.get("accessToken"));
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    if (
      !isLogin &&
      (path === "/payment/history" || path === "/card/management")
    ) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  return (
    <HeaderContainer>
      <ServiceLinks>
        <ServiceNavLink to="/">
          서비스 소개
          <LogoImg className="home" />
        </ServiceNavLink>
        <ServiceNavLink
          to="/payment/history"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("/payment/history");
          }}
        >
          전체 결제 내역
          <LogoImg className="payment_history" />
        </ServiceNavLink>
        <ServiceNavLink
          to="/card/management"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("/card/management");
          }}
        >
          결제 수단 관리
          <LogoImg className="card_management" />
        </ServiceNavLink>
      </ServiceLinks>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid var(--main-color);
`;

const ServiceLinks = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ServiceNavLink = styled(NavLink)`
  margin: 0px 50px;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  position: relative;

  &:hover {
    color: var(--hover-color);
  }

  &.active {
    color: var(--main-color);
    font-weight: bold;

    .home,
    .payment_history,
    .card_management {
      display: block;
    }
  }
`;

const LogoImg = styled.img.attrs({
  src: logo,
  alt: "로고",
})`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 45px;
  opacity: 0.8;
  pointer-events: none;
  display: none;
`;
