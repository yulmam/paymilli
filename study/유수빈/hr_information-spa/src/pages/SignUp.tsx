import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../component/Input";
import styles from "../style/app.module.css";
import DropDownCommon from "../component/DropDown";

const typeToKorean = {
  name: "이름",
  email: "이메일",
  nickname: "닉네임",
  role: "직군",
  mbti: "MBTI",
};

const initialState = {
  name: "",
  email: "",
  nickname: "",
  role: "",
  mbti: "",
};

type ErrorType = {
  [key: string]: string;
};
const roleArr = ["직군을 선택해주세요", "프론트엔드", "백엔드", "풀스택"];
const mbtiArr =
  "MBTI를 선택해주세요, ENFJ, ENTJ, ENFP, ENTP, ESFJ, ESTJ, ESFP, ESTP, INFJ, INTJ, INFP, INTP, ISFJ, ISTJ, ISFP, ISTP".split(
    ","
  );
const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");
  const [mbti, setMbti] = useState("");
  const [errors, setErrors] = useState<ErrorType>({ ...initialState });

  const changeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof typeToKorean
  ) => {
    const errorMessage = validateField(type, event.target.value);

    // 에러 메시지 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: errorMessage,
    }));

    console.log(type);
    if (type === "name") {
      setName(event.target.value);
    } else if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "nickname") {
      setNickname(event.target.value);
    } else if (type === "role") {
      setRole(event.target.value);
    } else if (type === "mbti") {
      setMbti(event.target.value);
    }
    checkValidata(type);
  };

  const validateField = (
    type: keyof typeof typeToKorean,
    value: string
  ): string => {
    if (value.trim() === "") {
      return `${typeToKorean[type]}을(를) 입력해주세요.`;
    }

    const errorMessage = checkValidata(type) || "";
    // todo : setErrors(...)
    return errorMessage;
  };

  const checkValidata = (type: keyof typeof typeToKorean) => {
    if (type === "name") {
      const nameRegex = /^[가-핳]{2,4}$/;
      if (!nameRegex.test(name)) {
        console.log("FN", name);
        return "2~4글자의 한글만 입력이 가능합니다.";
      }
    } else if (type === "email") {
      const emailRegex = /^[a-zA-Z0-9]+@grepp\.co$/;
      if (!emailRegex.test(email)) {
        console.log("email", email);
        return `이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능\n하며, @grepp.co 형식의 이메일만 입력이 가능합니다.`;
      }
      // 정규식 ^[a-zA-Z0-9]+@grepp\.co$는 이메일 주소가 영문 대소문자와 숫자로만 이루어져 있어야 하며,
      //  그 뒤에 @grepp.co가 붙는 형식을 나타냅니다. 따라서 특수문자가 포함되지 않도록 되어있으며,
      //특수문자를 입력하면 유효하지 않은 이메일 형식으로 처리될 것입니다.
    } else {
      const nicknameRegex = /^[a-zA-Z]{3,10}$/;
      if (!nicknameRegex.test(nickname)) {
        console.log("NIC", nickname);
        return "대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다.";
      }
    }
  };

  const handleSelectedChange = (type: string, item: string) => {
    if (type === "role") {
      setRole(item);
    } else {
      setMbti(item);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      {["name", "email", "nickname"].map((v) => (
        <div key={v} style={{ position: "relative" }}>
          <Input
            value={eval(v)}
            onChange={(event) =>
              changeValue(event, v as keyof typeof typeToKorean)
            }
            type={v as keyof typeof typeToKorean}
          />

          {errors[v] && (
            <div className={styles.inputError}>
              <h5>요청한 형식과 일치시키세요.</h5>
              <div style={{ width: 280 }}>
                <p>{errors[v]}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      <DropDownCommon
        label={"직군"}
        list={roleArr}
        selected={role}
        dropDownPlaceHolder={roleArr[0]}
        handleSelectedChange={(item) => handleSelectedChange("role", item)}
        type={"role"}
      />

      <DropDownCommon
        label={"MBTI"}
        list={mbtiArr}
        selected={mbti}
        dropDownPlaceHolder={mbtiArr[0]}
        handleSelectedChange={(item) => handleSelectedChange("mbti", item)}
        type={"mbti"}
      />
    </div>
  );
};

export default SignUp;
