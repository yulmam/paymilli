import './global.css';
import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import Loading from './component/Loading';
import { getRandomCatData, getSearchCatData } from './api/api';
import Fail from './component/Fail';
import styled from 'styled-components';

const Modal = lazy(() => import('./component/Modal'));
const RandomCatBanner = lazy(() => import('./component/RandomCatBanner'));

function App() {
  // input value로 useState를 사용하여 상태관리, 양반향 데이터 바인딩, 재렌더링 최소화를 한다.
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [catsList, setCatsList] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isVisibleHistory, setIsVisibleHistory] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCat, setCurrentCat] = useState('');
  const [currentPages, setCurrentPages] = useState(1);

  // 페이지 진입 시 포커스 https://developer-talk.tistory.com/129
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
    // Local Storage에서 검색 결과를 불러오는 함수
    const loadSearchResultFromLocalStorage = () => {
      const savedResult = localStorage.getItem('lastSearchResult') || '';
      if (savedResult) {
        console.log('A', JSON.parse(savedResult));
        setKeyword(JSON.parse(savedResult));
        searchCats(JSON.parse(savedResult));
      }
    };
    loadSearchResultFromLocalStorage();
    // 컴포넌트가 처음 렌더링 될 때 스크롤 이벤트 리스너를 추가
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(searchHistory);
  }, [searchHistory]);

  // 사용자가 값을 입력하면 보여준다.
  const displayKeyword = (e) => {
    setKeyword(e.target.value);
  };

  //사용자가 input 클릭시 초기화한다.
  const clearKeyword = () => {
    setKeyword('');
  };

  // 검색 결과를 Local Storage에 저장하는 함수
  const saveSearchResultToLocalStorage = (data) => {
    localStorage.setItem('lastSearchResult', JSON.stringify(data));
  };

  // 사용자가 고양이를 검색한다.
  const checkEnterKey = async (event) => {
    if (event.key === 'Enter') {
      await searchCats(keyword);
    }
  };
  const searchCats = async (keyword) => {
    setIsLoading(true);
    const catsList = await getSearchCatData(keyword, currentPages);
    console.log(catsList.data);
    setCatsList(catsList.data);

    if (keyword !== '') saveSearchResultToLocalStorage(keyword);

    // 검색어 중복 제거 및 최대 5개까지 저장
    const historySet = new Set([keyword, ...searchHistory]);
    setSearchHistory([...historySet].slice(0, 5));
    setIsLoading(false);
  };

  //랜덤으로 고양이를 보여준다.
  const randomCats = async () => {
    setIsLoading(true);
    const catsList = await getRandomCatData();
    console.log(catsList.data);
    setCatsList(catsList.data);
    setIsLoading(false);
  };

  // theame 변환
  const changeTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 모달 보여주는 함수
  const displayModal = async (id) => {
    setIsModalOpen(true);
    setCurrentCat(id);
  };

  // 스크롤 이벤트 처리 함수
  const handleScroll = () => {
    // 브라우저의 스크롤 위치와 문서의 전체 높이를 비교하여 끝까지 도달했는지 체크
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 끝까지 도달하면 다음 페이지를 로딩
      loadMoreCats();
    }
  };

  // 스크롤 페이징 구현
  const loadMoreCats = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getSearchCatData(keyword, currentPages + 1);
      const newCatsList = response.data;
      setCatsList([...catsList, ...newCatsList]);
      setCurrentPages(currentPages + 1);
    } catch (error) {
      console.error('Error while loading more cats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Event delegation 함수
  const handleImgClick = (event) => {
    const clickedImage = event.target.closest('img');
    if (clickedImage) {
      const id = clickedImage.getAttribute('alt');
      displayModal(id);
    }
  };

  if (isLoading) return <Loading isDarkMode={isDarkMode} />;

  return (
    <S.Wrapper className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <S.HeaderContainer>
        <div
          id="theme"
          style={{ display: 'flex', flexDirection: 'row', marginRight: 100 }}
        >
          <p>mode : {isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
          <input type="checkbox" checked={isDarkMode} onChange={changeTheme} />
        </div>
        <input
          type="search"
          placeholder="고양이를 검색해주세요"
          ref={inputFocus}
          value={keyword}
          onClick={clearKeyword}
          onChange={displayKeyword}
          onKeyDown={checkEnterKey}
          onFocus={() => setIsVisibleHistory(true)}
          onBlur={() => setIsVisibleHistory(false)}
          //onClick={() => displayModal(v.id)} />
        />
        <S.Button onClick={randomCats}>random</S.Button>
      </S.HeaderContainer>

      <main id="body">
        <Suspense fallback={<div>Loading...</div>}>
          <RandomCatBanner isDarkMode={isDarkMode} />
        </Suspense>
        {searchHistory.length > 0 && isVisibleHistory && (
          <ul>
            {searchHistory.map((keyword, i) => (
              <li key={i}>{keyword}</li>
            ))}
          </ul>
        )}
        {catsList?.length ? (
          <S.ImgContainer onClick={handleImgClick}>
            {catsList.map((v, i) => (
              <S.Img
                loading="lazy"
                src={v.url}
                key={i}
                alt={v.id}
                title={v.name}
              />
            ))}
          </S.ImgContainer>
        ) : (
          <Fail />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            id={currentCat}
          />
        </Suspense>
      </main>
    </S.Wrapper>
  );
}

export default App;

const S = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
  `,
  HeaderContainer: styled.header`
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
  `,
  Img: styled.img`
    width: 250px;
    height: 250px;
  `,

  ImgContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 기본 설정: 5개의 column */
    gap: 10px; /* 각 column 사이의 간격 */

    @media (max-width: 992px) {
      grid-template-columns: repeat(
        3,
        1fr
      ); /* 가로 길이 992px 이하: 3개의 column */
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(
        2,
        1fr
      ); /* 가로 길이 768px 이하: 2개의 column */
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(
        1,
        1fr
      ); /* 가로 길이 576px 이하: 1개의 column */
    }
  `,
  Button: styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    &:active {
      background-color: #0056b3;
      box-shadow: none;
    }
  `,
};
