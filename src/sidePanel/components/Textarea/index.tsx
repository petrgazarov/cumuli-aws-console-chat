import { useAtom } from "jotai";
import { useMemo, useState } from "react";

import ReSendIcon from "sidePanel/components/icons/ReSendIcon";
import SendIcon from "sidePanel/components/icons/SendIcon";
import { focusedTextareaAtom } from "sidePanel/utils/atoms";
import {
  currentChatMessagesAtom,
  llmLoadingAtom,
  llmStreamingAtom,
  openaiApiKeyAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage } from "utils/types";

import {
  Container,
  SendButton,
  StyledTextarea,
  TextareaContainer,
} from "./styled";
import { UserInstructionType, UserInstructions } from "./UserInstructions";

type TextareaProps = {
  chatMessage?: ChatMessage;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
};

const Textarea = ({
  chatMessage,
  onChange,
  onKeyDown,
  onSendButtonClick,
  textareaRef,
  value,
}: TextareaProps) => {
  const [, setFocusedChatMessage] = useAtom(focusedTextareaAtom);
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [isFocused, setIsFocused] = useState(false);

  const showAdditionalElements = useMemo(() => {
    if (!chatMessage) {
      return true;
    }

    if (llmLoading || llmStreaming) {
      return false;
    }

    if (isFocused) {
      return true;
    }

    if (currentChatMessages[currentChatMessages.length - 1] === chatMessage) {
      return true;
    }

    return false;
  }, [chatMessage, isFocused, llmLoading, llmStreaming, currentChatMessages]);

  const userInstructionType = chatMessage
    ? UserInstructionType.existingMessage
    : UserInstructionType.newMessage;

  const sendButtonDisabled = !value || llmStreaming || llmLoading;

  return (
    <Container $reduceBottomSpace={showAdditionalElements}>
      <TextareaContainer>
        <StyledTextarea
          ref={textareaRef}
          value={value}
          onFocus={() => {
            setFocusedChatMessage({ chatMessage, textareaRef });
            setIsFocused(true);
          }}
          onBlur={() => {
            setFocusedChatMessage({});
            setIsFocused(false);
          }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          minRows={1}
          disabled={!openaiApiKey}
          placeholder="Type a message..."
        />
        <SendButton
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            textareaRef.current?.blur();
            onSendButtonClick(value);
          }}
          disabled={sendButtonDisabled}
          $show={showAdditionalElements}
          tabIndex={-1}
        >
          {chatMessage ? <ReSendIcon /> : <SendIcon />}
        </SendButton>
      </TextareaContainer>
      <UserInstructions
        messageType={userInstructionType}
        show={showAdditionalElements}
      />
    </Container>
  );
};

export default Textarea;
