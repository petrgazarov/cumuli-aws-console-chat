import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import { ChatChannelAction, ChatMessage, UserChatMessage } from "utils/types";

type UseNewMessageProps = {
  chatMessage: UserChatMessage;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useEditMessage = ({ chatMessage, textareaRef }: UseNewMessageProps) => {
  const [textInput, setTextInput] = useState(getChatMessageText(chatMessage));
  const [, setLoading] = useAtom(loadingAtom);
  const [, setStreaming] = useAtom(streamingAtom);
  const { removeImageFromMessage } = useChatMessages();

  const { postChatMessage } = useChatChannelListener();

  const handleReplaceMessage = useCallback(
    (message: ChatMessage) => {
      postChatMessage({
        action: ChatChannelAction.replace_message,
        payload: message,
      });
      setLoading(true);
      setStreaming(true);
    },
    [postChatMessage]
  );

  const handleSubmitWithScreenshotCommand = useCallback(
    async (value: string) => {
      handleReplaceMessage({
        ...chatMessage,
        content: [
          { type: "text", text: value },
          {
            type: "image_url",
            image_url: { url: "", detail: "high" },
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
          content: [{ type: "text", text: value }, imageContent],
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
    value: textInput,
    handleChange,
    handleKeyDown,
    removeImageFromMessage,
  };
};

export default useEditMessage;
