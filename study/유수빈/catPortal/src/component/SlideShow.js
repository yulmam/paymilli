import React, { useState } from 'react';
import styled from 'styled-components';

const SlideShowContainer = styled.article`
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
  border-radius: 5%;
`;

const SlideShowItem = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 5px;
  transition: transform 0.3s ease-in-out;
  border-radius: 20%;
`;

const SlideShowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const SlideShow = ({ catsList, isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? catsList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === catsList.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SlideShowContainer>
      <SlideShowButton onClick={handlePrev}>&#10094;</SlideShowButton>
      <SlideShowItem
        key={catsList[currentIndex].id}
        src={catsList[currentIndex].url}
        alt={catsList[currentIndex].id}
        title={catsList[currentIndex].name}
        loading="lazy"
      />
      <SlideShowButton onClick={handleNext}>&#10095;</SlideShowButton>
    </SlideShowContainer>
  );
};

export default SlideShow;
