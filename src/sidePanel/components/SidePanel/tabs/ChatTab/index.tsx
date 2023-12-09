import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect } from "react";

import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatError from "sidePanel/hooks/useChatError";
import useConversation from "sidePanel/hooks/useConversation";
import {
  currentChatMessagesAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage } from "utils/types";

import ChatError from "./ChatError";
import NewChatButton from "./NewChatButton";
import { ChatTabContent, NewChatButtonContainer } from "./styled";

const ChatTab = () => {
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const { currentConversation } = useConversation();
  const chatError = useChatError();

  const renderMessage = useCallback((chatMessage: ChatMessage) => {
    return (
      <Fragment key={chatMessage.id}>
        <ConversationMessage chatMessage={chatMessage} />
      </Fragment>
    );
  }, []);

  useEffect(() => {
    setLlmStreamingError(null);
  }, [setLlmStreamingError, currentConversation]);

  return (
    <ChatTabContent>
      {currentChatMessages.map(renderMessage)}
      <NewMessage />
      {chatError && <ChatError />}
      <NewChatButtonContainer>
        <NewChatButton />
      </NewChatButtonContainer>
    </ChatTabContent>
  );
};

export default ChatTab;
