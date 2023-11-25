import { useAtom } from "jotai";
import { useState, useEffect, useCallback } from "react";

import { currentTabAtom } from "sidePanel/utils/atoms";
import { getConversationPreview } from "sidePanel/utils/helpers";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getConversations } from "utils/indexedDb";
import { ChatConversation } from "utils/types";

import { HistoryTabContent, ConversationItem } from "./styled";

const HistoryTab = () => {
  const [currentTab] = useAtom(currentTabAtom);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  useEffect(() => {
    getConversations().then((conversations) => {
      setConversations(conversations);
    });
  }, []);

  const renderConversation = useCallback(
    (conversation: ChatConversation) => {
      const preview = getConversationPreview(conversation);

      return (
        <ConversationItem key={conversation.id} onClick={() => {}}>
          {preview}
        </ConversationItem>
      );
    },
    [conversations]
  );

  return (
    <HistoryTabContent show={currentTab == TabTitlesEnum.config}>
      {conversations.map(renderConversation)}
    </HistoryTabContent>
  );
};

export default HistoryTab;
