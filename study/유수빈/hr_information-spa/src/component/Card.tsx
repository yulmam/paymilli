import { UserDataType } from "../type/type";
import React, { useEffect, useState } from "react";
import styles from "../style/app.module.css";

type CardProps = {
  userData?: UserDataType[];
};

type CardStatusType = {
  id: number;
  status: string;
};
const Card: React.FC<CardProps> = ({ userData }) => {
  const [flipped, setFlipped] = useState("");
  const [current, setCurrent] = useState(-1);
  const [cardStatus, setCardStatus] = useState<CardStatusType[]>([]);

  const handleClick = (i: number) => {
    setCurrent(i);
    setFlipped("is-flipped");
    setTimeout(() => {
      setFlipped(""); // 1초 후에 뒤집힘 상태 초기화
    }, 1000);
    // 카드 상태 변화
    changeCardSatus(i);
  };

  const changeCardSatus = (i: number) => {
    const newCardStatus = cardStatus.slice();
    newCardStatus[i] = {
      id: i,
      status: cardStatus[i].status === "card" ? "card is-flipped" : "card",
    };
    console.log(newCardStatus);
    storeCardStatus(newCardStatus);
  };

  const storeCardStatus = (data: CardStatusType[]) => {
    localStorage.setItem("cardStatus", JSON.stringify(data));
    setCardStatus(data);
  };
  useEffect(() => {
    console.log("CCC", cardStatus);
  }, [cardStatus]);

  useEffect(() => {
    // 이전에 저장한 카드의 상태를 로컬스토리지에서 가져옴
    const storedCardStatus = localStorage.getItem("cardStatus");
    if (storedCardStatus) {
      setCardStatus(JSON.parse(storedCardStatus));
    } else if (userData?.length) {
      console.log(userData);
      console.log(userData?.map((_, i) => ({ id: i, status: "card" })));
      const cardStatus = userData?.map((_, i) => ({
        id: i,
        status: "card",
      }));
      storeCardStatus(cardStatus);
    }
  }, [userData]);

  return (
    // 카드 컨테이너
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {userData &&
        userData.map((user, i) => {
          return (
            <section
              key={i}
              className={`${styles.card}  ${
                current === i ? styles[flipped] : ""
              } `}
              onClick={() => handleClick(i)}
              style={{ cursor: "pointer" }}
              // style={{
              //   width: 200,
              //   marginRight: 20,
              //   height: 260,
              //   backgroundColor: "#0D0D0D",
              //   color: "white",
              //   borderRadius: "10%",
              //   // textAlign: "center",
              //   // 카드 정가운데 위치
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   fontSize: 40,
              //   fontWeight: 700,
              // }}
            >
              {/* <div className={`${flipped ? "card_plane" : ""}`}> // 안됨. */}
              {cardStatus &&
              cardStatus[i].status === "card is-flipped" &&
              i === current
                ? user.mbti
                : user.nickname}
              {/* </div> */}
            </section>
          );
        })}
    </div>
  );
};

export default Card;
