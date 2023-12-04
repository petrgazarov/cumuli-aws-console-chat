import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import {
  currentTextareaRefAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage } from "utils/types";

import NewChatButton from "./NewChatButton";
import { ChatTabContent, NewChatButtonContainer, Separator } from "./styled";

const ChatTab = () => {
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const { currentChatMessages } = useChatMessages();
  const { currentConversation } = useConversation();
  const [isScrolled, setIsScrolled] = useState(false);
  const newMessageTextareaRef = useRef<HTMLTextAreaElement>(null);

  const renderMessage = useCallback((chatMessage: ChatMessage) => {
    return (
      <Fragment key={chatMessage.id}>
        <ConversationMessage chatMessage={chatMessage} />
        <Separator />
      </Fragment>
    );
  }, []);

  useEffect(() => {
    // Focusing the textarea scrolls the chat to the bottom. "isScrolled" state
    // is used to add a delay to prevent flickering.
    setIsScrolled(true);
  }, [currentTextareaRef, setIsScrolled]);

  const onNewChatButtonClick = useCallback(() => {
    newMessageTextareaRef.current?.focus();
  }, []);

  useEffect(() => {
    setLlmStreamingError(null);
  }, [setLlmStreamingError, currentConversation]);

  return (
    <ChatTabContent $isScrolled={isScrolled}>
      {currentChatMessages.map(renderMessage)}
      <NewMessage textareaRef={newMessageTextareaRef} />
      <NewChatButtonContainer>
        <NewChatButton onClick={onNewChatButtonClick} />
      </NewChatButtonContainer>
    </ChatTabContent>
  );
};

export default ChatTab;
