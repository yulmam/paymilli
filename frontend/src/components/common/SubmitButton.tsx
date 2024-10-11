import styled from "styled-components";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function SubmitButton({
  label,
  onClick,
  disabled,
}: SubmitButtonProps) {
  return (
    <StyledButton type="submit" onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: var(--main-color);
  color: white;
  font-size: 16px;
  border: 1px solid var(--main-color);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: white;
    color: var(--main-color);
  }
`;
