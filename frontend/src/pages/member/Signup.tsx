import styled from "styled-components";
import SignupForm from "../../components/member/SignupForm";
import NavBar from "components/layout/NavBar";

export default function Signup() {
  return (
    <>
      <NavBar />
      <SignupContainer>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm />
      </SignupContainer>
    </>
  );
}

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 120px auto;
  margin-bottom: 48px;
  padding: 24px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const SignupTitle = styled.h1`
  text-align: center;
  margin: 12px;
  margin-bottom: 0px;
  font-size: 24px;
  color: var(--main-color);
`;
