import { useAtom } from "jotai";
import { useCallback } from "react";

import { getChatMessages } from "indexedDb/chatMessage";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import useConversations from "sidePanel/hooks/useConversations";
import { currentTabAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { Conversation, Order } from "utils/types";

import {
  DeleteButton,
  DeleteButtonContainer,
  GroupItem,
  Preview,
  PreviewContainer,
} from "./styled";

type ConversationRowProps = {
  conversation: Conversation;
};

const ConversationRow = ({ conversation }: ConversationRowProps) => {
  const [, setCurrentTab] = useAtom(currentTabAtom);
  const { currentConversation, setCurrentConversation } = useConversation();
  const { setCurrentChatMessages } = useChatMessages();
  const { deleteConversation } = useConversations();

  const onItemClick = useCallback(
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
    [
      currentConversation,
      setCurrentChatMessages,
      setCurrentTab,
      setCurrentConversation,
    ]
  );

  return (
    <GroupItem key={conversation.id}>
      <PreviewContainer
        tabIndex={0}
        onClick={() => onItemClick(conversation)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onItemClick(conversation);
          }
        }}
      >
        <Preview>{conversation.preview}</Preview>
      </PreviewContainer>
      <DeleteButtonContainer>
        <DeleteButton
          tabIndex={0}
          onClick={() => deleteConversation(conversation)}
        >
          Delete
        </DeleteButton>
      </DeleteButtonContainer>
    </GroupItem>
  );
};

export default ConversationRow;
