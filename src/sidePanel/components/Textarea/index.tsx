import { useAtom } from "jotai";

import { currentTextareaRefAtom } from "sidePanel/utils/atoms";

import { StyledTextarea } from "./styled";

type TextareaProps = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

// Textarea value:
//   - textareaRef is used to read the value. This avoids resetting the
//     onMessage listener on every value change.
//   - textInput state is used to set the value.

const Textarea = ({
  textareaRef,
  value,
  onChange,
  onKeyDown,
}: TextareaProps) => {
  const [, setCurrentTextareaRef] = useAtom(currentTextareaRefAtom);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onFocus={() => setCurrentTextareaRef(textareaRef)}
      onBlur={() => setCurrentTextareaRef(null)}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Textarea;
