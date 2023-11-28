import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useConversation from "sidePanel/hooks/useConversation";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import {
  ChatChannelAction,
  NewUserChatMessage,
  UserChatMessage,
} from "utils/types";

type UseNewMessageProps = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useNewMessage = ({ textareaRef }: UseNewMessageProps) => {
  const [textInput, setTextInput] = useState("");
  const [, setLoading] = useAtom(loadingAtom);
  const [, setStreaming] = useAtom(streamingAtom);
  const { createConversation, currentConversation } = useConversation();

  const { postChatMessage } = useChatChannelListener();

  const handleCreateNewMessage = useCallback(
    (message: UserChatMessage) => {
      postChatMessage({
        action: ChatChannelAction.new_message,
        payload: message,
      });
      setTextInput("");
      setLoading(true);
      setStreaming(true);
    },
    [postChatMessage]
  );

  const handleSubmitWithScreenshotCommand = useCallback(
    async (value: string) => {
      let conversationId: string;
      if (currentConversation) {
        conversationId = currentConversation.id;
      } else {
        const newConversation = await createConversation();
        conversationId = newConversation.id;
      }

      handleCreateNewMessage(
        NewUserChatMessage({
          conversationId,
          content: [
            { type: "text", text: value },
            {
              type: "image_url",
              image_url: { url: "", detail: "high" },
            },
          ],
        })
      );
    },
    [handleCreateNewMessage, currentConversation?.id]
  );

  useCommandChannelListener({
    handleSubmitWithScreenshotCommand,
    textareaRef,
  });

  const handleSubmitMessage = useCallback(
    async (value: string) => {
      let conversationId: string;
      if (currentConversation) {
        conversationId = currentConversation.id;
      } else {
        const newConversation = await createConversation();
        conversationId = newConversation.id;
      }

      handleCreateNewMessage(
        NewUserChatMessage({
          conversationId,
          content: value,
        })
      );
    },
    [handleCreateNewMessage, currentConversation]
  );

  const handleKeyDown = useKeyDownChatMessageListener({
    handleSubmitMessage,
    setTextInput,
    textareaRef,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextInput(event.target.value);
    },
    []
  );

  return {
    value: textInput,
    handleChange,
    handleKeyDown,
  };
};

export default useNewMessage;
