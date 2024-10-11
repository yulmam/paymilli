import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface EmptyCartProps {
  mall: string;
}
export default function EmptyCart({ mall }: EmptyCartProps) {
  const navigate = useNavigate();
  return (
    <S.container>
      <S.description>장바구니가 비어 있습니다.</S.description>
      <S.Button onClick={() => navigate(`/mall/${mall}/shopping`)}>
        상품 담으러 가기
      </S.Button>
    </S.container>
  );
}

const S = {
  container: styled.div`
    margin-top: 40px;
    padding: 78px !important;
    text-align: center;
    background-color: #f7f7f7;
  `,

  description: styled.p`
    color: #000;
    font-size: 20px;

    font-weight: 500;
  `,

  Button: styled.button`
    margin-top: 30px;
    background-color: var(--sub-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: var(--main-color);
    }
  `,
};
