import React, { useState, useEffect } from "react";
import Card from "../component/Card";
import { UserDataType } from "../type/type";

type HomeProps = {
  userData?: UserDataType[];
};

const Home: React.FC<HomeProps> = ({ userData }) => {
  const [visibleCards, setVisibleCards] = useState(8); // 처음에 보이는 카드 개수

  // 무한 스크롤 동작
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= bodyHeight) {
      // 페이지 하단에 도달했을 때 새로운 카드 로드
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Card userData={userData} />
    </div>
  );
};

export default Home;
