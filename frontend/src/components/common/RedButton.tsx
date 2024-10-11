import styled from "styled-components";

interface RedButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function RedButton({
  label,
  onClick,
  disabled,
}: RedButtonProps) {
  return (
    <StyledButton type="submit" onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background-color: white;
  color: red;
  font-size: 16px;
  border: 1px solid red;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    color: white;
    background-color: red;
  }
`;
