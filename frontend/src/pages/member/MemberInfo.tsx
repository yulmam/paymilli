import styled from "styled-components";
import MemberInfoForm from "../../components/member/MemberInfoForm";
import DeleteMemberForm from "../../components/member/DeleteMemberForm";
import LogoutForm from "../../components/member/LogoutForm";
import PaymentPasswordForm from "../../components/member/PaymentPasswordForm";
import NavBar from "components/layout/NavBar";

export default function MemberInfo() {
  return (
    <>
      <NavBar />
      <MemberInfoContainer>
        <MemberInfoTitle>사용자 정보</MemberInfoTitle>
        <MemberInfoForm />
        <PaymentPasswordForm />
        <Spacer />
        <ButtonContainer>
          <DeleteMemberForm />
          <LogoutForm />
        </ButtonContainer>
      </MemberInfoContainer>
    </>
  );
}

const MemberInfoContainer = styled.div`
  max-width: 400px;
  margin: 120px auto;
  margin-bottom: 48px;
  padding: 24px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const MemberInfoTitle = styled.h1`
  text-align: center;
  margin: 12px;
  margin-bottom: 0px;
  font-size: 24px;
  color: var(--main-color);
`;

const Spacer = styled.div`
  height: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
