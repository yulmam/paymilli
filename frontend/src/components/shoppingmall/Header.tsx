import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const S = {
  HeaderComponent: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 10px 0px;
  `,
};

interface HeaderComponentProps {
  mall: "food" | "electronic";
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ mall }) => {
  const logoLink =
    mall === "food" ? "/mall/food/shopping" : "/mall/electronic/shopping";
  const imgLink =
    mall === "food" ? "/img/logo_shopingmall.png" : "/img/samsungApp.svg";
  const basketLink =
    mall === "food" ? "/mall/food/basket" : "/mall/electronic/basket";

  return (
    <S.HeaderComponent>
      <Link to={logoLink}>
        <img
          src={imgLink}
          alt="shoppingmall Logo"
          style={{ width: 194, height: 70 }}
        />
      </Link>
      <Link to={basketLink}>
        <img
          src={"/img/shoppingCartIcon.jpeg"}
          alt="장바구니 아이콘"
          style={{ width: 40, height: 40 }}
        />
      </Link>
    </S.HeaderComponent>
  );
};

export default HeaderComponent;
