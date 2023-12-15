import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect } from "react";

import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatError from "sidePanel/hooks/useChatError";
import useConversation from "sidePanel/hooks/useConversation";
import {
  currentChatMessagesAtom,
  newMessageTextareaValueAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage } from "utils/types";

import ChatError from "./ChatError";
import NewChatButton from "./NewChatButton";
import { ChatTabContent } from "./styled";

const ChatTab = () => {
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [, setNewMessageTextareaValue] = useAtom(newMessageTextareaValueAtom);
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
    setNewMessageTextareaValue("");
  }, [setNewMessageTextareaValue, currentConversation]);

  return (
    <ChatTabContent>
      {currentChatMessages.map(renderMessage)}
      <NewMessage />
      {chatError && <ChatError />}
      <NewChatButton />
    </ChatTabContent>
  );
};

export default ChatTab;
