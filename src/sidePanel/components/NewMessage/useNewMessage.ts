import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useConversation from "sidePanel/hooks/useConversation";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import { llmLoadingAtom, llmStreamingAtom } from "sidePanel/utils/atoms";
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
  const [, setLlmLoading] = useAtom(llmLoadingAtom);
  const [, setLlmStreaming] = useAtom(llmStreamingAtom);
  const { createConversation, currentConversation } = useConversation();

  const { postChatMessage } = useChatChannelListener();

  const handleCreateNewMessage = useCallback(
    (message: UserChatMessage) => {
      postChatMessage({
        action: ChatChannelAction.message_new,
        payload: message,
      });
      setTextInput("");
      setLlmLoading(true);
      setLlmStreaming(true);
    },
    [postChatMessage, setLlmLoading, setLlmStreaming]
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
          content: [
            { text: value, type: "text" },
            {
              image_url: { detail: "high", url: "" },
              type: "image_url",
            },
          ],
          conversationId,
        })
      );
    },
    [handleCreateNewMessage, currentConversation, createConversation]
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
          content: value,
          conversationId,
        })
      );
    },
    [handleCreateNewMessage, currentConversation, createConversation]
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
    handleChange,
    handleKeyDown,
    handleSubmitMessage,
    value: textInput,
  };
};

export default useNewMessage;
