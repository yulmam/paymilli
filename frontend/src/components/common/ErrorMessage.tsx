import React from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "예기치 못한 오류입니다",
}) => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>;
};

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  text-align: center;
`;

export default ErrorMessage;
