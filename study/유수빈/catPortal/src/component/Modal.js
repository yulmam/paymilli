import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDetailCatData } from '../api/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
  }

  @media (max-width: 992px) {
    width: 540px;
    height: 613.34px;
  }

  background-color: #fff;
  padding: 20px;
  border-radius: 8px;

  /*  모달 열고 닫기에 fade in/out을 적용 */
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
`;

const Button = styled.button`
  background-color: transparent;
  width: 100px;
  height: 40px;
  margin-left: 80%;
`;

const Modal = ({ isOpen, onClose, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [catDetail, setCatDetail] = useState([]);

  // 고양이 상세 정보를 가져오는 함수
  const getDetail = async (id) => {
    try {
      setIsLoading(true);
      const response = await getDetailCatData(id);
      setCatDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error while fetching cat detail:', error);
      // setIsLoading(false);
    }
  };

  // ESC 키를 누르면 모달이 닫히도록 이벤트 리스너 추가
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    setCatDetail([]);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  // 컴포넌트가 렌더링된 후에 상세 정보를 가져옴
  useEffect(() => {
    if (isOpen) {
      getDetail(id);
      console.log('isOpen', isOpen);
    }
  }, [id, isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} isOpen={isOpen}>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <>
            <Button onClick={onClose}>x</Button>
            {catDetail && (
              <>
                <img
                  src={catDetail.url}
                  style={{ width: 400, height: 400 }}
                  alt={catDetail.id}
                  loading="lazy"
                />
                <h5>{catDetail.name}</h5>
                <p>temperament : {catDetail.temperament}</p>
                <p>origin: {catDetail.origin} </p>
              </>
            )}
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
