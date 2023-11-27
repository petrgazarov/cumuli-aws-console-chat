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
  const { resetConversation } = useConversation();
  const { currentChatMessages } = useChatMessages();
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);

  if (!currentChatMessages.length) {
    return null;
  }

  return (
    <NewChatButtonContainer>
      <Button disabled={!openaiApiKey} onClick={resetConversation}>
        New Chat
      </Button>
    </NewChatButtonContainer>
  );
};

const ChatTab = () => {
  const { textareaRef } = useSidePanel();
  const [currentTab] = useAtom(currentTabAtom);
  const { currentChatMessages } = useChatMessages();

  const renderMessage = useCallback((chatMessage: ChatMessage) => {
    return (
      <React.Fragment key={chatMessage.id}>
        <ConversationMessage chatMessage={chatMessage} />
        <Separator />
      </React.Fragment>
    );
  }, []);

  console.log("currentChatMessages", currentChatMessages);

  return (
    <ChatTabContent $show={currentTab == TabTitlesEnum.chat}>
      {currentChatMessages.map(renderMessage)}
      <NewMessage textareaRef={textareaRef} />
      <NewChat />
    </ChatTabContent>
  );
};

export default ChatTab;
