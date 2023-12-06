import { useAtom } from "jotai";

import SendIcon from "sidePanel/components/icons/SendIcon";
import {
  UserInstructionType,
  UserInstructions,
} from "sidePanel/components/UserInstructions";
import { currentTextareaRefAtom } from "sidePanel/utils/atoms";
import {
  llmLoadingAtom,
  llmStreamingAtom,
  openaiApiKeyAtom,
} from "sidePanel/utils/atoms";

import { SendButton, StyledTextarea, TextareaContainer } from "./styled";

type TextareaProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  userInstructionType?: UserInstructionType;
  value: string;
};

const Textarea = ({
  onChange,
  onKeyDown,
  onSendButtonClick,
  textareaRef,
  userInstructionType,
  value,
}: TextareaProps) => {
  const [, setCurrentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);

  const sendButtonDisabled = !value || llmStreaming || llmLoading;

  return (
    <>
      <TextareaContainer>
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
        <SendButton
          onClick={() => onSendButtonClick(value)}
          disabled={sendButtonDisabled}
        >
          <SendIcon />
        </SendButton>
      </TextareaContainer>
      {userInstructionType && (
        <UserInstructions messageType={userInstructionType} />
      )}
    </>
  );
};

export default Textarea;
