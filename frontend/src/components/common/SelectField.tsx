import styled from "styled-components";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required,
}: SelectFieldProps) {
  return (
    <SelectWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledSelect
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 13px;
  border: 1px solid #333;
  border-radius: 10px;
  color: var(--main-color);

  &:focus {
    border-color: #333;
  }
`;
