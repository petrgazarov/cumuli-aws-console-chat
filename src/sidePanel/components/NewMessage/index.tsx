import { useAtom } from "jotai";
import { RefObject, useEffect, useMemo } from "react";

import useNewMessage from "sidePanel/components/NewMessage/useNewMessage";
import Textarea from "sidePanel/components/Textarea";
import {
  UserInstructionType,
  UserInstructions,
} from "sidePanel/components/UserInstructions";
import useChatError from "sidePanel/hooks/useChatError";
import {
  conversationStartedAtom,
  currentChatMessagesAtom,
  llmLoadingAtom,
  llmStreamingAtom,
} from "sidePanel/utils/atoms";
import { Role } from "utils/types";

import { LoadingState } from "./styled";

const NewMessage = ({
  textareaRef,
}: {
  textareaRef: RefObject<HTMLTextAreaElement>;
}) => {
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const chatError = useChatError();

  const { handleChange, handleKeyDown, value } = useNewMessage({
    textareaRef,
  });

  useEffect(() => {
    if (!conversationStarted) {
      textareaRef?.current?.focus();
    }
  }, [textareaRef, conversationStarted]);

  const isLastMessageUserMessage = useMemo(() => {
    const lastMessage = currentChatMessages[currentChatMessages.length - 1];
    return lastMessage?.role === Role.user;
  }, [currentChatMessages]);

  if (llmLoading) {
    return <LoadingState />;
  }

  if (llmStreaming || chatError || isLastMessageUserMessage) {
    return null;
  }

  return (
    <>
      <Textarea
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <UserInstructions messageType={UserInstructionType.newMessage} />
    </>
  );
};

export default NewMessage;
