import { AssistantChatMessage } from "utils/types";

import { TextContent } from "./styled";

const AssistantMessage = ({
  chatMessage,
}: {
  chatMessage: AssistantChatMessage;
}) => {
  return <TextContent>{chatMessage.content}</TextContent>;
};

export default AssistantMessage;
