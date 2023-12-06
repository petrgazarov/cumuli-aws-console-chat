import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import { llmLoadingAtom, llmStreamingAtom } from "sidePanel/utils/atoms";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import { ChatChannelAction, ChatMessage, UserChatMessage } from "utils/types";

type UseNewMessageProps = {
  chatMessage: UserChatMessage;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useEditMessage = ({ chatMessage, textareaRef }: UseNewMessageProps) => {
  const [textInput, setTextInput] = useState(getChatMessageText(chatMessage));
  const [, setLlmLoading] = useAtom(llmLoadingAtom);
  const [, setLlmStreaming] = useAtom(llmStreamingAtom);
  const { removeImageFromMessage } = useChatMessages();

  const { postChatMessage } = useChatChannelListener();

  const handleReplaceMessage = useCallback(
    (message: ChatMessage) => {
      postChatMessage({
        action: ChatChannelAction.message_replace,
        payload: message,
      });
      setLlmLoading(true);
      setLlmStreaming(true);
    },
    [postChatMessage, setLlmLoading, setLlmStreaming]
  );

  const handleSubmitWithScreenshotCommand = useCallback(
    async (value: string) => {
      handleReplaceMessage({
        ...chatMessage,
        content: [
          { text: value, type: "text" },
          {
            image_url: { detail: "high", url: "" },
            type: "image_url",
          },
        ],
      });
    },
    [handleReplaceMessage, chatMessage]
  );

  useCommandChannelListener({
    handleSubmitWithScreenshotCommand,
    textareaRef,
  });

  const handleSubmitMessage = useCallback(
    (value: string) => {
      const imageContent = getImageContentFromMessage(chatMessage);

      if (!imageContent) {
        handleReplaceMessage({
          ...chatMessage,
          content: value,
        });
      } else {
        handleReplaceMessage({
          ...chatMessage,
          content: [{ text: value, type: "text" }, imageContent],
        });
      }
    },
    [handleReplaceMessage, chatMessage]
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
    removeImageFromMessage,
    value: textInput,
  };
};

export default useEditMessage;
