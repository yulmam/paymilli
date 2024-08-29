import React, { useEffect, useState } from 'react';
import { getRandomCatData } from '../api/api';
import styled from 'styled-components';
import Loading from './Loading';
import SlideShow from './SlideShow';

const BannerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const RandomCatBanner = ({ isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomCats, setRandomCats] = useState([]);

  useEffect(() => {
    const fetchRandomCats = async () => {
      try {
        setIsLoading(true);
        const response = await getRandomCatData();
        setRandomCats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error while fetching random cats:', error);
        setRandomCats([]);
      }
    };

    fetchRandomCats();
  }, []);

  if (isLoading) return <Loading isDarkMode={isDarkMode} />;
  return (
    <BannerContainer>
      {randomCats && (
        <SlideShow catsList={randomCats.slice(0, 5)} isDarkMode={isDarkMode} />
      )}
    </BannerContainer>
  );
};

export default RandomCatBanner;
