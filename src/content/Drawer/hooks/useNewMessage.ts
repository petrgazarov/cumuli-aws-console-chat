import { useState, useEffect } from "react";
import { Commands, ChatMessage, Role, CommandMessage } from "utils/types";
import { COMMAND_CHANNEL } from "utils/constants";

import usePort from "./usePort";

type UseNewMessageProps = {
  onSubmit: (message: ChatMessage) => void;
};

const useNewMessage = (props: UseNewMessageProps) => {
  const [textInput, setTextInput] = useState("");
  const { postMessage, addMessageListener, removeMessageListener } =
    usePort(COMMAND_CHANNEL);

  const submitScreenshot = (message: CommandMessage) => {
    console.log("message", message);
    if (message.action !== Commands.capture_visible_tab) return;

    const newMessage: ChatMessage = {
      content: [
        { type: "text", text: textInput },
        {
          type: "image_url",
          image_url: { url: message.payload, detail: "high" },
        },
      ],
      role: Role.user,
    };

    props.onSubmit(newMessage);
    setTextInput("");
  };

  useEffect(() => {
    const port = chrome.runtime.connect({ name: COMMAND_CHANNEL });
    setPort(port);

    port.onMessage.addListener(submitScreenshot);

    return () => {
      if (port) {
        port.onMessage.removeListener(submitScreenshot);
      }
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!port) return;

    if (event.key === "Enter" && textInput) {
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {
        port.postMessage({ action: Commands.capture_visible_tab });
      } else {
        props.onSubmit({ role: Role.user, content: textInput });
        setTextInput("");
      }
    }
  };

  return {
    value: textInput,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTextInput(e.target.value),
    handleKeyDown,
  };
};

export default useNewMessage;
