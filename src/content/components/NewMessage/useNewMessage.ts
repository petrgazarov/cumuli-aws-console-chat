import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import {
  ChatMessageType,
  Role,
  LlmChannelAction,
  LlmChannelMessage,
} from "utils/types";
import { LLM_CHANNEL } from "utils/constants";
import usePort from "content/utils/usePort";
import { messagesAtom } from "content/utils/atoms";

const useNewMessage = () => {
  const [textInput, setTextInput] = useState("");
  const {
    postMessage: postLlmMessage,
    addChannelListener: addLlmChannelListener,
    removeChannelListener: removeLlmChannelListener,
  } = usePort(LLM_CHANNEL);
  const [messages, setMessages] = useAtom(messagesAtom);

  const llmChannelListener = useCallback(
    (channelMessage: LlmChannelMessage) => {
      switch (channelMessage.action) {
        case LlmChannelAction.new_message:
          setMessages([...messages, channelMessage.payload]);
          break;
        case LlmChannelAction.stream:
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
            return newMessages;
          });
      }
    },
    [messages, setMessages]
  );

  useEffect(() => {
    addLlmChannelListener(llmChannelListener);

    return () => removeLlmChannelListener();
  }, [llmChannelListener]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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
        action: LlmChannelAction.new_message,
        payload: chatMessage,
      });
      setTextInput("");
    },
    [postLlmMessage, textInput]
  );

  return {
    value: textInput,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTextInput(e.target.value),
    onKeyDown: handleKeyDown,
  };
};

export default useNewMessage;
