import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import {
  chatChannelAtom,
  llmLoadingAtom,
  screenshotChatMessageIdAtom,
} from "sidePanel/utils/atoms";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import { ChatChannelAction, ChatMessage, UserChatMessage } from "utils/types";

type UseNewMessageProps = {
  chatMessage: UserChatMessage;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useEditMessage = ({ chatMessage, textareaRef }: UseNewMessageProps) => {
  const [value, setValue] = useState(getChatMessageText(chatMessage));
  const [, setLlmLoading] = useAtom(llmLoadingAtom);
  const [chatChannel] = useAtom(chatChannelAtom);
  const [screenshotChatMessageId] = useAtom(screenshotChatMessageIdAtom);
  const { removeImageFromMessage, replaceMessage } = useChatMessages();

  const handleReplaceMessage = useCallback(
    (message: ChatMessage) => {
      chatChannel.post({
        action: ChatChannelAction.message_replace,
        payload: message,
      });
      setLlmLoading(true);
      replaceMessage(message);
    },
    [chatChannel, setLlmLoading, replaceMessage]
  );

  const handleSubmitWithScreenshotCommand = useCallback(() => {
    const currentInputValue = textareaRef.current?.value || "";

    handleReplaceMessage({
      ...chatMessage,
      content: [
        { text: currentInputValue, type: "text" },
        {
          image_url: { detail: "high", url: "" },
          type: "image_url",
        },
      ],
    });
  }, [textareaRef, handleReplaceMessage, chatMessage]);

  useEffect(() => {
    if (screenshotChatMessageId === chatMessage.id) {
      handleSubmitWithScreenshotCommand();
    }
  }, [screenshotChatMessageId, handleSubmitWithScreenshotCommand, chatMessage]);

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
    setValue,
    textareaRef,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    []
  );

  return {
    handleChange,
    handleKeyDown,
    handleSubmitMessage,
    removeImageFromMessage,
    value,
  };
};

export default useEditMessage;
