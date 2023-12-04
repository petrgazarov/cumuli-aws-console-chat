import { ErrorContainer, ErrorText } from "./styled";
import useChatError from "./useChatError";

const ChatError = () => {
  const chatError = useChatError();

  return (
    <ErrorContainer>
      <ErrorText>⚠️ {chatError}</ErrorText>
    </ErrorContainer>
  );
};

export default ChatError;
