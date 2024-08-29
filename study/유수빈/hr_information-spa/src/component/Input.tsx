import React, { ChangeEvent } from "react";

type InputType = {
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>, type: string) => void;
  type: keyof typeof typeToKorean;
  // 키값만 출력 : Object.keys(typeToKorean);
};

const typeToKorean = {
  name: "이름",
  email: "이메일",
  nickname: "닉네임",
  role: "직군",
  mbti: "MBTI",
};

const Input: React.FC<InputType> = ({ value, onChange, type }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <section style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ color: "gray", fontSize: 13 }}>{typeToKorean[type]}</p>
        <p style={{ color: "red", fontSize: 13 }}>(필수*)</p>
      </section>

      <input
        value={value}
        onChange={(event) => onChange(event, type)}
        placeholder={typeToKorean[type]}
        style={{ borderRadius: 20, width: 300, height: 40, marginBottom: 10 }}
      />
    </div>
  );
};

export default Input;
