import { useAtom } from "jotai";

import Button from "sidePanel/components/Button";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import { openaiApiKeyAtom } from "sidePanel/utils/atoms";

const NewChatButton = ({ onClick }: { onClick: () => void }) => {
  const { resetConversation } = useConversation();
  const { currentChatMessages } = useChatMessages();
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);

  if (!currentChatMessages.length) {
    return null;
  }

  return (
    <Button
      disabled={!openaiApiKey}
      onClick={() => {
        onClick();
        resetConversation();
      }}
    >
      New Chat
    </Button>
  );
};

export default NewChatButton;
