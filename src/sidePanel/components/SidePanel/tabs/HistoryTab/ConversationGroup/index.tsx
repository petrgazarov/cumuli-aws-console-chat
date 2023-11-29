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
  Container,
  DeleteButton,
  GroupContent,
  GroupItem,
  GroupLabel,
  Preview,
  PreviewContainer,
} from "./styled";

type ConversationGroupProps = {
  conversations: Conversation[];
  label: string;
};

const ConversationGroup = ({
  conversations,
  label,
}: ConversationGroupProps) => {
  const [, setCurrentTab] = useAtom(currentTabAtom);
  const { currentConversation, setCurrentConversation } = useConversation();
  const { deleteConversation } = useConversations();
  const { setCurrentChatMessages } = useChatMessages();

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
    [currentConversation]
  );

  return (
    <Container>
      <GroupLabel>{label}</GroupLabel>
      <GroupContent>
        {conversations.map((conversation) => (
          <GroupItem key={conversation.id}>
            <PreviewContainer onClick={() => onItemClick(conversation)}>
              <Preview>{conversation.preview}</Preview>
            </PreviewContainer>
            <DeleteButton onClick={() => deleteConversation(conversation)}>
              Delete
            </DeleteButton>
          </GroupItem>
        ))}
      </GroupContent>
    </Container>
  );
};

export default ConversationGroup;
