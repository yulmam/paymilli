import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = ({ isDarkMode }) => {
  console.log(isDarkMode);
  return (
    <S.SpinnerWrapper isDarkMode={isDarkMode}>
      <S.Spinner />
    </S.SpinnerWrapper>
  );
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const size = 100;

const S = {
  SpinnerWrapper: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 3;
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? '#0d0d0d' : '#f5f7f7'};
  `,

  Spinner: styled.div`
    width: ${size}px;
    height: ${size}px;
    border-width: ${size / 12}px;
    border-style: solid;
    border-color: #e6f7fa;
    border-top-color: #cff4fa;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
    box-sizing: border-box;
  `,
};
export default Loading;
