import { useState, useCallback } from "react";
import { useAtom } from "jotai";
import {
  ChatMessageType,
  Role,
  ChatChannelAction,
  ChatChannelMessage,
} from "utils/types";
import { LLM_CHANNEL } from "utils/constants";
import usePort from "content/utils/usePort";
import { messagesAtom } from "content/utils/atoms";

const useNewMessage = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const [_, setMessages] = useAtom(messagesAtom);

  const llmChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      switch (channelMessage.action) {
        case ChatChannelAction.new_message:
          setMessages((prevMessages) => [
            ...prevMessages,
            channelMessage.payload,
          ]);
          break;
        case ChatChannelAction.stream_chunk:
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            let lastMessage = newMessages[newMessages.length - 1];

            if (lastMessage?.role === Role.assistant) {
              newMessages[newMessages.length - 1] = {
                ...lastMessage,
                content: (lastMessage.content += channelMessage.payload),
              };
            } else {
              newMessages.push({
                role: Role.assistant,
                content: channelMessage.payload,
              });
            }
            setLoading(false);
            return newMessages;
          });
          break;
        case ChatChannelAction.finish_stream:
          setStreaming(false);
          break;
      }
    },
    [setMessages, setLoading]
  );

  const { postMessage: postLlmMessage } = usePort({
    channelName: LLM_CHANNEL,
    listener: llmChannelListener,
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // If Shift + Enter is pressed, insert a new line
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        setTextInput((prev) => prev + "\n");
        return;
      }

      if (event.key !== "Enter" || !textInput.trim()) return;

      event.preventDefault();

      const chatMessage: ChatMessageType = {
        role: Role.user,
        content: textInput,
      };

      if (event.ctrlKey || event.metaKey) {
        chatMessage.content = [
          { type: "text", text: textInput },
          {
            type: "image_url",
            image_url: { url: "", detail: "high" },
          },
        ];
      }

      postLlmMessage({
        action: ChatChannelAction.new_message,
        payload: chatMessage,
      });
      setTextInput("");
      setLoading(true);
      setStreaming(true);
    },
    [postLlmMessage, textInput]
  );

  return {
    value: textInput,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTextInput(e.target.value),
    onKeyDown: handleKeyDown,
    loading,
    streaming,
  };
};

export default useNewMessage;
