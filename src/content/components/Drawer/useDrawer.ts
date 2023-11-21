import { useEffect, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { CHAT_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  ChatChannelMessage,
  ChatChannelAction,
  CommandChannelMessage,
  CommandChannelAction,
} from "utils/types";
import usePort from "content/utils/usePort";
import { messagesAtom, drawerOpenAtom } from "content/utils/atoms";
import { scrollDrawerToBottom } from "content/utils/helpers";
import { detectOS } from "utils/helpers";
import { OS } from "utils/types";
import pageListeners from "content/ContentScript/pageListeners";

const useDrawer = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
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
    postCommandMessage({ action: CommandChannelAction.new_chat });
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

  const keyboardShortcutListener = useCallback(
    (event: KeyboardEvent) => {
      const isMac = detectOS() === OS.MacOS;
      const isCtrlOrCmdPressed = isMac ? event.metaKey : event.ctrlKey;

      switch (event.key) {
        case "Escape":
          setDrawerOpen(false);
          postCommandMessage({ action: CommandChannelAction.close_chat });
          break;
        case "k":
          if (isCtrlOrCmdPressed) {
            event.preventDefault();
            setDrawerOpen(true);
            postCommandMessage({ action: CommandChannelAction.open_chat });
            createNewChat();
          }
          break;
        case "b":
          if (isCtrlOrCmdPressed) {
            event.preventDefault();
            toggleDrawerOpen();
          }
          break;
      }
    },
    [postCommandMessage]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyboardShortcutListener);

    const savedListenerObject = {
      type: "keydown",
      func: keyboardShortcutListener,
    };
    pageListeners.window.push(savedListenerObject);

    return () => {
      window.removeEventListener("keydown", keyboardShortcutListener);

      const index = pageListeners.window.indexOf(savedListenerObject);
      if (index > -1) {
        pageListeners.window.splice(index, 1);
      }
    };
  }, [keyboardShortcutListener]);

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();

      scrollDrawerToBottom();
    }
  }, [drawerOpen]);

  return {
    toggleDrawerOpen,
    textAreaRef,
    messages,
    createNewChat,
  };
};

export default useDrawer;
