import { useAtom } from "jotai";
import React, { useCallback } from "react";

import Button from "sidePanel/components/Button";
import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatMessage } from "utils/types";

import { ChatTabContent, NewChatButtonContainer, Separator } from "./styled";
import useSidePanel from "../useSidePanel";

const NewChat = () => {
  const { createConversation } = useConversation();
  const { currentChatMessages } = useChatMessages();
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);

  if (!currentChatMessages.length) {
    return null;
  }

  return (
    <NewChatButtonContainer>
      <Button disabled={!openaiApiKey} onClick={createConversation}>
        New Chat
      </Button>
    </NewChatButtonContainer>
  );
};

const ChatTab = () => {
  const { textAreaRef } = useSidePanel();
  const [currentTab] = useAtom(currentTabAtom);
  const { currentChatMessages } = useChatMessages();

  const renderMessage = useCallback((message: ChatMessage) => {
    return (
      <React.Fragment key={message.id}>
        <ConversationMessage message={message} />
        <Separator />
      </React.Fragment>
    );
  }, []);

  return (
    <ChatTabContent $show={currentTab == TabTitlesEnum.chat}>
      {currentChatMessages.map(renderMessage)}
      <NewMessage textAreaRef={textAreaRef} />
      <NewChat />
    </ChatTabContent>
  );
};

export default ChatTab;
