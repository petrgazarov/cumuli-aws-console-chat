import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatError from "sidePanel/hooks/useChatError";
import useConversation from "sidePanel/hooks/useConversation";
import {
  currentChatMessagesAtom,
  currentTextareaRefAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage } from "utils/types";

import ChatError from "./ChatError";
import NewChatButton from "./NewChatButton";
import { ChatTabContent, NewChatButtonContainer } from "./styled";

const ChatTab = () => {
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const { currentConversation } = useConversation();
  const [isScrolled, setIsScrolled] = useState(false);
  const newMessageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const chatError = useChatError();

  const renderMessage = useCallback((chatMessage: ChatMessage) => {
    return (
      <Fragment key={chatMessage.id}>
        <ConversationMessage chatMessage={chatMessage} />
      </Fragment>
    );
  }, []);

  useEffect(() => {
    // Focusing the textarea scrolls the chat to the bottom. "isScrolled" state
    // is used to add a delay to prevent flickering.
    setIsScrolled(true);
  }, [currentTextareaRef, setIsScrolled]);

  useEffect(() => {
    setLlmStreamingError(null);
  }, [setLlmStreamingError, currentConversation]);

  return (
    <ChatTabContent $isScrolled={isScrolled}>
      {currentChatMessages.map(renderMessage)}
      <NewMessage textareaRef={newMessageTextareaRef} />
      {chatError && <ChatError />}
      <NewChatButtonContainer>
        <NewChatButton />
      </NewChatButtonContainer>
    </ChatTabContent>
  );
};

export default ChatTab;
