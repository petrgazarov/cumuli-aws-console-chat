import { useEffect } from "react";

import useConversations from "sidePanel/hooks/useConversations";
import { scrollToTop } from "sidePanel/utils/helpers";

import ConversationGroup from "./ConversationGroup";
import { EmptyContent, HistoryTabContent } from "./styled";

const HistoryTab = () => {
  const { getConversations, groupedConversations } = useConversations();

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <HistoryTabContent>
      {Object.keys(groupedConversations).length ? (
        Object.keys(groupedConversations).map((label) => (
          <ConversationGroup
            label={label}
            conversations={groupedConversations[label]}
            key={label}
          />
        ))
      ) : (
        <EmptyContent>No conversations</EmptyContent>
      )}
    </HistoryTabContent>
  );
};

export default HistoryTab;
