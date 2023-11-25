import { useAtom } from "jotai";
import React from "react";

import Button from "sidePanel/components/Button";
import ChatMessage from "sidePanel/components/ChatMessage";
import NewMessage from "sidePanel/components/NewMessage";
import { currentTabAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { ChatTabContent, Separator, NewChatButtonContainer } from "./styled";
import useSidePanel from "../useSidePanel";

const ChatTab = () => {
  const { textAreaRef, messages, createNewChat } = useSidePanel();
  const [currentTab] = useAtom(currentTabAtom);

  const renderMessage = (message: any, index: number) => {
    return (
      <React.Fragment key={index}>
        <ChatMessage message={message} />
        <Separator />
      </React.Fragment>
    );
  };

  return (
    <ChatTabContent show={currentTab == TabTitlesEnum.chat}>
      {messages.map(renderMessage)}
      <NewMessage textAreaRef={textAreaRef} />
      {Boolean(messages.length) && (
        <NewChatButtonContainer>
          <Button onClick={createNewChat}>New Chat</Button>
        </NewChatButtonContainer>
      )}
    </ChatTabContent>
  );
};

export default ChatTab;
