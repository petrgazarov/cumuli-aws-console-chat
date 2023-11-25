import { StyledTextInput } from "./styled";

type TextInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};

const TextInput = ({ onChange, value, placeholder }: TextInputProps) => {
  return (
    <StyledTextInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
