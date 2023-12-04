import useConversations from "sidePanel/hooks/useConversations";

import ConversationGroup from "./ConversationGroup";
import { EmptyContent, HistoryTabContent } from "./styled";

const HistoryTab = () => {
  const { groupedConversations } = useConversations();

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
