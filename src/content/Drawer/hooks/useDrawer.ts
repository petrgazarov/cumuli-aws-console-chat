import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import { ChatMessage, CommandMessage, Commands } from "utils/types";
import usePort from "./usePort";
import { messagesAtom } from "../atoms";

const useDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    addMessageListener: addLlmMessageListener,
    removeMessageListener: removeLlmMessageListener,
  } = usePort(LLM_CHANNEL);
  const {
    addMessageListener: addCommandMessageListener,
    removeMessageListener: removeCommandMessageListener,
  } = usePort(COMMAND_CHANNEL);
  const [messages, setMessages] = useAtom(messagesAtom);

  const llmMessageListener = useCallback(
    (assistantMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    },
    [setMessages]
  );

  const commandMessageListener = useCallback(
    (message: CommandMessage) => {
      if (message.action === Commands.open_chat) {
        setDrawerOpen(true);
      }
    },
    [setDrawerOpen]
  );

  const escapeButtonListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    },
    [setDrawerOpen]
  );

  useEffect(() => {
    addLlmMessageListener(llmMessageListener);
    addCommandMessageListener(commandMessageListener);
    window.addEventListener("keydown", escapeButtonListener);

    return () => {
      removeCommandMessageListener();
      removeLlmMessageListener();
      window.removeEventListener("keydown", escapeButtonListener);
    };
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();
    }
  }, [drawerOpen, messages]);

  return {
    drawerOpen,
    setDrawerOpen,
    textAreaRef,
    messages,
  };
};

export default useDrawer;
