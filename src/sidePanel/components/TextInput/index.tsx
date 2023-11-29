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
  textInputRef?: React.RefObject<HTMLInputElement>;
  value: string;
};

const TextInput = ({
  label,
  onChange,
  onKeyDown,
  placeholder,
  showSavedStatus,
  textInputRef,
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
          ref={textInputRef}
        />
        {showSavedStatus && <SavedStatus>saved</SavedStatus>}
      </TextInputWrapper>
    </Container>
  );
};

export default TextInput;
