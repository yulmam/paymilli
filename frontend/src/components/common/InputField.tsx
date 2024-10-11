import styled from "styled-components";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
}

export default function InputField({
  label,
  name,
  type,
  value,
  onChange,
  onClick,
  required,
  placeholder,
  maxLength,
  readOnly,
}: InputFieldProps) {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 13px;
  border: 1px solid #333;
  border-radius: 10px;
  color: var(--main-color);

  &:focus {
    border-color: #333;
    
  &::placeholder {
    color: #aaa;
  }

`;
