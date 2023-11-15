import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { ChatMessage, Role, LlmChannelAction } from "utils/types";
import { LLM_CHANNEL } from "utils/constants";
import usePort from "./usePort";
import { messagesAtom } from "../atoms";

const useNewMessage = () => {
  const [textInput, setTextInput] = useState("");
  const {
    postMessage: postLlmMessage,
    addMessageListener: addLlmMessageListener,
    removeMessageListener: removeLlmMessageListener,
  } = usePort(LLM_CHANNEL);
  const [_, setMessages] = useAtom(messagesAtom);

  const llmChannelListener = useCallback(
    (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    },
    [setMessages]
  );

  useEffect(() => {
    addLlmMessageListener(llmChannelListener);

    return () => removeLlmMessageListener();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Enter" || !textInput) return;

      event.preventDefault();

      const chatMessage: ChatMessage = {
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
