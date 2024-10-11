import React, { ReactNode, CSSProperties } from "react";
import styled from "styled-components";

interface ButtonComponentProps {
  children: ReactNode;
  importance?: "high" | "medium" | "low";
  width?: string;
  height?: string;
  onClick?: () => void;
}

const getButtonColor = (importance?: "high" | "medium" | "low"): string => {
  switch (importance) {
    case "high":
      return "#ff6500;";
    case "medium":
      return "var(--primary-color);";
    case "low":
      return "#aaa";
    default:
      return "white";
  }
};

const S = {
  ButtonComponent: styled.div<ButtonComponentProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    background-color: ${(props) => getButtonColor(props.importance)};
    ${(props) => props.width && `width: ${props.width};`}
    ${(props) => props.height && `height: ${props.height};`}
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
  `,
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  importance,
  width,
  height,
  onClick,
}) => {
  return (
    <S.ButtonComponent
      importance={importance}
      width={width}
      height={height}
      onClick={onClick}
    >
      {children}
    </S.ButtonComponent>
  );
};

export default ButtonComponent;
