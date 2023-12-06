import { Button } from "sidePanel/components/Button";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";

const NewChatButton = () => {
  const { resetCurrentConversation } = useConversation();
  const { currentChatMessages } = useChatMessages();

  if (!currentChatMessages.length) {
    return null;
  }

  return <Button onClick={() => resetCurrentConversation()}>New chat</Button>;
};

export default NewChatButton;
