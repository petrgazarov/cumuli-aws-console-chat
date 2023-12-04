import { useAtom } from "jotai";

import Button from "sidePanel/components/Button";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import { streamingErrorAtom } from "sidePanel/utils/atoms";

const NewChatButton = ({ onClick }: { onClick: () => void }) => {
  const { resetCurrentConversation } = useConversation();
  const { currentChatMessages } = useChatMessages();
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);

  if (!currentChatMessages.length) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        onClick();
        resetCurrentConversation();
        setLlmStreamingError(null);
      }}
    >
      New chat
    </Button>
  );
};

export default NewChatButton;
