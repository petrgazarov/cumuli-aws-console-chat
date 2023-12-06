import { useAtom } from "jotai";

import { Button } from "sidePanel/components/Button";
import useConversation from "sidePanel/hooks/useConversation";
import { conversationStartedAtom } from "sidePanel/utils/atoms";

const NewChatButton = () => {
  const { resetCurrentConversation } = useConversation();
  const [conversationStarted] = useAtom(conversationStartedAtom);

  if (!conversationStarted) {
    return null;
  }

  return <Button onClick={() => resetCurrentConversation()}>New chat</Button>;
};

export default NewChatButton;
