import { Conversation } from "utils/types";

import ConversationRow from "./ConversationRow";
import { Container, GroupContent, GroupLabel } from "./styled";

type ConversationGroupProps = {
  conversations: Conversation[];
  label: string;
};

const ConversationGroup = ({
  conversations,
  label,
}: ConversationGroupProps) => {
  return (
    <Container>
      <GroupLabel>{label}</GroupLabel>
      <GroupContent>
        {conversations.map((conversation) => (
          <ConversationRow key={conversation.id} conversation={conversation} />
        ))}
      </GroupContent>
    </Container>
  );
};

export default ConversationGroup;
