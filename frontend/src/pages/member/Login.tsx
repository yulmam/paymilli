import styled from "styled-components";
import LoginForm from "../../components/member/LoginForm";
import NavBar from "components/layout/NavBar";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <NavBar />
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm />
        <SignUpTextContainer>
          회원이 아니신가요? <SignUpLink to="/signup">회원가입</SignUpLink>
        </SignUpTextContainer>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 120px auto;
  margin-bottom: 48px;
  padding: 24px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin: 12px;
  margin-bottom: 0px;
  font-size: 24px;
  color: var(--main-color);
`;

const SignUpTextContainer = styled.div`
  text-align: center;
  font-size: 16px;
`;

const SignUpLink = styled(Link)`
  color: var(--main-color);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
