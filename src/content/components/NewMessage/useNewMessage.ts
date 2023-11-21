import { useState, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import {
  ChatMessageType,
  Role,
  ChatChannelAction,
  ChatChannelMessage,
  CommandChannelAction,
  CommandChannelMessage,
} from "utils/types";
import { CHAT_CHANNEL } from "utils/constants";
import usePort from "content/utils/usePort";
import { messagesAtom, drawerOpenAtom } from "content/utils/atoms";

type useNewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

// Textarea value:
//   - textAreaRef is used to read the value. This avoids resetting the
//     onMessage listener on every value change.
//   - textInput state is used to set the value.

const useNewMessage = ({ textAreaRef }: useNewMessageProps) => {
  const [drawerOpen] = useAtom(drawerOpenAtom);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const [_, setMessages] = useAtom(messagesAtom);

  const chatChannelListener = useCallback(
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
    []
  );

  const { postMessage: postChatMessage } = usePort({
    channelName: CHAT_CHANNEL,
    listener: chatChannelListener,
  });

  const handleCreateNewMessage = useCallback(
    (message: ChatMessageType) => {
      postChatMessage({
        action: ChatChannelAction.new_message,
        payload: message,
      });
      setTextInput("");
      setLoading(true);
      setStreaming(true);
    },
    [postChatMessage]
  );

  useEffect(() => {
    // Only set the listener if the drawer is open
    if (!drawerOpen) return;

    const listenerFn = (message: CommandChannelMessage) => {
      switch (message.action) {
        case CommandChannelAction.submit_with_screenshot:
          handleCreateNewMessage({
            role: Role.user,
            content: [
              { type: "text", text: textAreaRef.current?.value || "" },
              {
                type: "image_url",
                image_url: { url: "", detail: "high" },
              },
            ],
          });
      }
    };

    chrome.runtime.onMessage.addListener(listenerFn);

    return () => {
      if (!drawerOpen) return;

      chrome.runtime.onMessage.removeListener(listenerFn);
    };
  }, [drawerOpen, handleCreateNewMessage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") return;

      event.preventDefault();

      // If Shift + Enter is pressed, insert a new line
      if (event.shiftKey) {
        setTextInput((prev) => prev + "\n");
        return;
      }

      const currentInputValue = textAreaRef.current?.value || "";

      // If the input is empty, do nothing
      if (!currentInputValue.trim()) return;

      handleCreateNewMessage({
        role: Role.user,
        content: currentInputValue,
      });
    },
    [handleCreateNewMessage]
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
    loading,
    streaming,
  };
};

export default useNewMessage;
