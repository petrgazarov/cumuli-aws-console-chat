import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import usePort from "sidePanel/hooks/usePort";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { CHAT_CHANNEL } from "utils/constants";
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

  const chatChannelListener = useChatChannelListener();

  const { postMessage: postChatMessage } = usePort({
    channelName: CHAT_CHANNEL,
    listener: chatChannelListener,
  });

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

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();

      // If Shift + Enter is pressed, insert a new line
      if (event.shiftKey) {
        setTextInput((prev) => prev + "\n");
        return;
      }

      const currentInputValue = textareaRef.current?.value || "";
      if (!currentInputValue.trim()) {
        return;
      }

      const imageContent = getImageContentFromMessage(chatMessage);
      if (!imageContent) {
        handleReplaceMessage({
          ...chatMessage,
          content: currentInputValue,
        });
      } else {
        handleReplaceMessage({
          ...chatMessage,
          content: [{ type: "text", text: currentInputValue }, imageContent],
        });
      }
    },
    [handleReplaceMessage, chatMessage.id, chatMessage.content]
  );

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
