import { useAtom } from "jotai";

import { Button } from "sidePanel/components/Button";
import useConversation from "sidePanel/hooks/useConversation";
import {
  conversationStartedAtom,
  llmLoadingAtom,
  llmStreamingAtom,
} from "sidePanel/utils/atoms";

import { NewChatButtonContainer } from "./styled";

const NewChatButton = () => {
  const { resetCurrentConversation } = useConversation();
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);

  const showNewChatButton = conversationStarted && !llmStreaming && !llmLoading;

  return (
    <NewChatButtonContainer $isEmpty={!showNewChatButton}>
      {showNewChatButton && (
        <Button onClick={() => resetCurrentConversation()}>New chat</Button>
      )}
    </NewChatButtonContainer>
  );
};

export default NewChatButton;
