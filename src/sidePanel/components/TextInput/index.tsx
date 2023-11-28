import {
  Container,
  Label,
  SavedStatus,
  StyledTextInput,
  TextInputWrapper,
} from "./styled";

type TextInputProps = {
  label?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showSavedStatus?: boolean;
  value: string;
};

const TextInput = ({
  label,
  onChange,
  onKeyDown,
  placeholder,
  showSavedStatus,
  value,
}: TextInputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <TextInputWrapper>
        <StyledTextInput
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        {showSavedStatus && <SavedStatus>Saved</SavedStatus>}
      </TextInputWrapper>
    </Container>
  );
};

export default TextInput;
