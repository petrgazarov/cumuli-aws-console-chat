import { useAtom } from "jotai";
import { useMemo } from "react";

import useNewMessage from "sidePanel/components/NewMessage/useNewMessage";
import Textarea from "sidePanel/components/Textarea";
import useChatError from "sidePanel/hooks/useChatError";
import {
  currentChatMessagesAtom,
  llmLoadingAtom,
  llmStreamingAtom,
  newMessageTextareaRefAtom,
} from "sidePanel/utils/atoms";
import { Role } from "utils/types";

import { LoadingState } from "./styled";
import useFocusTextarea from "./useFocusTextarea";

const NewMessage = () => {
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);
  const chatError = useChatError();

  useFocusTextarea();

  const { handleChange, handleKeyDown, handleSubmitMessage, value } =
    useNewMessage();

  const isLastMessageUserMessage = useMemo(() => {
    const lastMessage = currentChatMessages[currentChatMessages.length - 1];
    return lastMessage?.role === Role.user;
  }, [currentChatMessages]);

  if (llmLoading || llmStreaming) {
    return <LoadingState $showAnimation={llmLoading} />;
  }

  if (chatError || isLastMessageUserMessage) {
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
