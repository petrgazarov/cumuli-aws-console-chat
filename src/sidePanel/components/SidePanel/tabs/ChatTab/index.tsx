import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import ConversationMessage from "sidePanel/components/ConversationMessage";
import NewMessage from "sidePanel/components/NewMessage";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import { currentTabAtom, currentTextareaRefAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatMessage } from "utils/types";

import NewChatButton from "./NewChatButton";
import { ChatTabContent, NewChatButtonContainer, Separator } from "./styled";

const ChatTab = () => {
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [currentTab] = useAtom(currentTabAtom);
  const { currentChatMessages } = useChatMessages();
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

  const showContent = currentTab == TabTitlesEnum.chat;

  useEffect(() => {
    if (showContent) {
      currentTextareaRef?.current?.focus();
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [showContent]);

  const onNewChatButtonClick = useCallback(() => {
    newMessageTextareaRef.current?.focus();
  }, []);

  console.log("currentChatMessages", currentChatMessages);

  return (
    <ChatTabContent $show={showContent} $isScrolled={isScrolled}>
      {currentChatMessages.map(renderMessage)}
      <NewMessage textareaRef={newMessageTextareaRef} />
      <NewChatButtonContainer>
        <NewChatButton onClick={onNewChatButtonClick} />
      </NewChatButtonContainer>
    </ChatTabContent>
  );
};

export default ChatTab;
