import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { CHAT_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  ChatChannelMessage,
  ChatChannelAction,
  CommandChannelMessage,
  CommandChannelAction,
} from "utils/types";
import usePort from "content/utils/usePort";
import { messagesAtom } from "content/utils/atoms";
import { scrollDrawerToBottom } from "content/utils/helpers";

const useDrawer = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { postMessage: postCommandMessage } = usePort({
    channelName: COMMAND_CHANNEL,
  });

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      if (channelMessage.action !== ChatChannelAction.initial_state) return;

      setMessages(channelMessage.payload.conversation.messages);
      setDrawerOpen(channelMessage.payload.open);
    },
    []
  );

  usePort({ channelName: CHAT_CHANNEL, listener: chatChannelListener });

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen((prevOpen) => !prevOpen);

    postCommandMessage({ action: CommandChannelAction.toggle_chat });

    textAreaRef.current?.focus();
    scrollDrawerToBottom();
  }, [postCommandMessage]);

  const createNewChat = useCallback(() => {
    postCommandMessage({
      action: CommandChannelAction.new_chat,
    });
    setMessages([]);
    textAreaRef.current?.focus();
  }, [postCommandMessage]);

  useEffect(() => {
    const listenerFn = (message: CommandChannelMessage) => {
      switch (message.action) {
        case CommandChannelAction.toggle_chat:
          toggleDrawerOpen();
          break;
        case CommandChannelAction.new_chat:
          setDrawerOpen(true);
          createNewChat();
          break;
      }
    };

    chrome.runtime.onMessage.addListener(listenerFn);

    return () => chrome.runtime.onMessage.removeListener(listenerFn);
  }, [toggleDrawerOpen]);

  const escapeButtonListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleDrawerOpen();
      }
    },
    [toggleDrawerOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", escapeButtonListener);

    return () => window.removeEventListener("keydown", escapeButtonListener);
  }, [escapeButtonListener]);

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();

      scrollDrawerToBottom();
    }
  }, [drawerOpen]);

  return {
    drawerOpen,
    toggleDrawerOpen,
    textAreaRef,
    messages,
    createNewChat,
  };
};

export default useDrawer;
