import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import usePort from "sidePanel/hooks/usePort";
import {
  currentTextareaRefAtom,
  loadingAtom,
  streamingAtom,
} from "sidePanel/utils/atoms";
import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/utils/listeners";
import { CHAT_CHANNEL } from "utils/constants";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import {
  ChatChannelAction,
  ChatChannelMessage,
  ChatMessage,
  CommandChannelAction,
  CommandChannelMessage,
  UserChatMessage,
} from "utils/types";

type useNewMessageProps = {
  chatMessage: UserChatMessage;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useEditMessage = ({ chatMessage, textareaRef }: useNewMessageProps) => {
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);
  const [textInput, setTextInput] = useState(getChatMessageText(chatMessage));
  const [, setLoading] = useAtom(loadingAtom);
  const [streaming, setStreaming] = useAtom(streamingAtom);
  const { appendChunk, appendMessage, removeImageFromMessage, replaceMessage } =
    useChatMessages();

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      switch (channelMessage.action) {
        case ChatChannelAction.replace_message:
          replaceMessage(channelMessage.payload);
          break;
        case ChatChannelAction.new_message:
          appendMessage(channelMessage.payload);
          break;
        case ChatChannelAction.stream_chunk:
          appendChunk(channelMessage.payload);
          setLoading(false);
          break;
        case ChatChannelAction.finish_stream:
          setStreaming(false);
          break;
      }
    },
    []
  );

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

  const commandChannelListener = useCallback(
    async (channelMessage: CommandChannelMessage) => {
      if (
        channelMessage.action !== CommandChannelAction.submit_with_screenshot
      ) {
        return;
      }
      if (streaming) {
        return;
      }
      if (currentTextareaRef !== textareaRef) {
        return;
      }

      const currentInputValue = textareaRef.current?.value || "";
      if (!currentInputValue.trim()) {
        return;
      }

      handleReplaceMessage({
        ...chatMessage,
        content: [
          { type: "text", text: currentInputValue },
          {
            type: "image_url",
            image_url: { url: "", detail: "high" },
          },
        ],
      });
    },
    [handleReplaceMessage, streaming, chatMessage.id, currentTextareaRef]
  );

  useEffect(() => {
    addOnMessageListener(commandChannelListener);

    return () => removeOnMessageListener(commandChannelListener);
  }, [commandChannelListener]);

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
