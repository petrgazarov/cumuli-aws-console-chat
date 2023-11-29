import { useAtom } from "jotai";

import { currentTextareaRefAtom } from "sidePanel/utils/atoms";

import { StyledTextarea } from "./styled";

type TextareaProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
};

// Textarea value:
//   - textareaRef is used to read the value. This avoids resetting the
//     onMessage listener on every value change.
//   - textInput state is used to set the value.

const Textarea = ({
  onChange,
  onKeyDown,
  textareaRef,
  value,
}: TextareaProps) => {
  const [, setCurrentTextareaRef] = useAtom(currentTextareaRefAtom);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onFocus={() => setCurrentTextareaRef(textareaRef)}
      onChange={onChange}
      onKeyDown={onKeyDown}
      minRows={1}
    />
  );
};

export default Textarea;
