import { useEffect, useState, useRef } from "react";
import { LLM_CHANNEL } from "utils/constants";
import { ChatMessage, Commands } from "utils/types";

const useDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Establish a connection to the background script
    const newPort = chrome.runtime.connect({ name: LLM_CHANNEL });
    setPort(newPort);

    // Listen for a response from the background script
    newPort.onMessage.addListener((assistantMessage) => {
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    });

    return () => newPort.disconnect();
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();
    }
  }, [drawerOpen, messages]);

  useEffect(() => {
    if (port === null) return;

    const messageListener = (message: any) => {
      if (message.action === Commands.open_chat) {
        setDrawerOpen(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    // Listen for a message from the background script
    port.onMessage.addListener(messageListener);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the listeners when the component is unmounted
      port.onMessage.removeListener(messageListener);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [port]);

  return {
    drawerOpen,
    setDrawerOpen,
    messages,
    setMessages,
    port,
    textAreaRef,
  };
};

export default useDrawer;
