import useChatError from "sidePanel/hooks/useChatError";

import { ErrorContainer, ErrorText } from "./styled";

const ChatError = () => {
  const chatError = useChatError();

  return (
    <ErrorContainer>
      <ErrorText>⚠️ {chatError}</ErrorText>
    </ErrorContainer>
  );
};

export default ChatError;
