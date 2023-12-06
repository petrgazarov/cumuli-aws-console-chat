import { useAtom } from "jotai";

import { currentTextareaRefAtom } from "sidePanel/utils/atoms";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";

import { StyledTextarea } from "./styled";

type TextareaProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
};

const Textarea = ({
  onChange,
  onKeyDown,
  textareaRef,
  value,
}: TextareaProps) => {
  const [, setCurrentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onFocus={() => setCurrentTextareaRef(textareaRef)}
      onChange={onChange}
      onKeyDown={onKeyDown}
      minRows={1}
      disabled={!openaiApiKey}
      placeholder="Type a message..."
    />
  );
};

export default Textarea;
