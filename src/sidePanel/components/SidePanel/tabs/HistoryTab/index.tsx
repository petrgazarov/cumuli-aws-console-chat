import { useAtom } from "jotai";
import { useCallback } from "react";

import { getChatMessages } from "indexedDb/chatMessage";
import Button from "sidePanel/components/Button";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import useConversations from "sidePanel/hooks/useConversations";
import { currentTabAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { Conversation, Order } from "utils/types";

import { ConversationItem, HistoryTabContent } from "./styled";

const HistoryTab = () => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);
  const { conversations, deleteAllConversations } = useConversations();
  const { currentConversation, setCurrentConversation } = useConversation();
  const { setCurrentChatMessages } = useChatMessages();

  const onConversationClick = useCallback(
    (conversation: Conversation) => {
      if (currentConversation?.id === conversation.id) {
        setCurrentTab(TabTitlesEnum.chat);
        return;
      }

      getChatMessages({
        conversationId: conversation.id,
        order: Order.asc,
      }).then((chatMessages) => {
        setCurrentChatMessages(chatMessages);
        setCurrentTab(TabTitlesEnum.chat);
        setCurrentConversation(conversation);
      });
    },
    [currentConversation?.id]
  );

  const renderConversation = useCallback(
    (conversation: Conversation) => {
      return (
        <ConversationItem
          key={conversation.id}
          onClick={() => onConversationClick(conversation)}
        >
          <div>{conversation.createdAt}</div>
          <div>{conversation.preview}</div>
        </ConversationItem>
      );
    },
    [onConversationClick]
  );

  return (
    <HistoryTabContent $show={currentTab == TabTitlesEnum.history}>
      <Button onClick={deleteAllConversations}>Clear all</Button>
      {conversations.map(renderConversation)}
    </HistoryTabContent>
  );
};

export default HistoryTab;
