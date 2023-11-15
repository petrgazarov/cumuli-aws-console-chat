import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import { ChatMessage, CommandChannelMessage, CommandChannelAction } from "utils/types";
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
    addMessageListener: addCommandChannelMessageListener,
    removeMessageListener: removeCommandChannelMessageListener,
  } = usePort(COMMAND_CHANNEL);
  const [messages, setMessages] = useAtom(messagesAtom);

  const llmMessageListener = useCallback(
    (assistantMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    },
    [setMessages]
  );

  const CommandChannelMessageListener = useCallback(
    (message: CommandChannelMessage) => {
      if (message.action === CommandChannelAction.open_chat) {
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
    addCommandChannelMessageListener(CommandChannelMessageListener);
    window.addEventListener("keydown", escapeButtonListener);

    return () => {
      removeCommandChannelMessageListener();
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
