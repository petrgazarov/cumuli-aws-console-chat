import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

import useNewMessage from "sidePanel/components/NewMessage/useNewMessage";
import Textarea from "sidePanel/components/Textarea";
import useChatError from "sidePanel/hooks/useChatError";
import {
  conversationStartedAtom,
  currentChatMessagesAtom,
  documentWasFocusedAtom,
  llmLoadingAtom,
  llmStreamingAtom,
  newMessageTextareaRefAtom,
} from "sidePanel/utils/atoms";
import { Role } from "utils/types";

import { LoadingState } from "./styled";

const NewMessage = () => {
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);
  const [documentWasFocused] = useAtom(documentWasFocusedAtom);
  const chatError = useChatError();

  const { handleChange, handleKeyDown, handleSubmitMessage, value } =
    useNewMessage();

  useEffect(() => {
    if (documentWasFocused && !conversationStarted) {
      newMessageTextareaRef?.current?.focus();
    }
  }, [newMessageTextareaRef, conversationStarted, documentWasFocused]);

  useEffect(() => {
    if (!llmStreaming) {
      newMessageTextareaRef?.current?.focus();
    }
  }, [llmStreaming, newMessageTextareaRef]);

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
    <Textarea
      textareaRef={newMessageTextareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onSendButtonClick={handleSubmitMessage}
    />
  );
};

export default NewMessage;
