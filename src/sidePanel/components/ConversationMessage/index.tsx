import { ChatMessage, Role } from "utils/types";

import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

const ConversationMessage = ({ chatMessage }: { chatMessage: ChatMessage }) => {
  switch (chatMessage.role) {
    case Role.user:
      return <UserMessage chatMessage={chatMessage} />;
    case Role.assistant:
      return <AssistantMessage chatMessage={chatMessage} />;
    default:
      return null;
  }
};

export default ConversationMessage;
