import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
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

  const llmChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      if (channelMessage.action !== ChatChannelAction.initial_state) return;

      setMessages(channelMessage.payload.conversation.messages);
      setDrawerOpen(channelMessage.payload.open);
    },
    []
  );

  usePort({ channelName: LLM_CHANNEL, listener: llmChannelListener });

  const toggleDrawerWithCommand = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);

      postCommandMessage({
        action: open
          ? CommandChannelAction.open_chat
          : CommandChannelAction.close_chat,
      });

      textAreaRef.current?.focus();
      scrollDrawerToBottom();
    },
    [postCommandMessage]
  );

  useEffect(() => {
    const listenerFn = (message: CommandChannelMessage) => {
      if (message.action === CommandChannelAction.open_chat) {
        toggleDrawerWithCommand(true);
      }
    };

    chrome.runtime.onMessage.addListener(listenerFn);

    return () => chrome.runtime.onMessage.removeListener(listenerFn);
  }, [toggleDrawerWithCommand]);

  const escapeButtonListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleDrawerWithCommand(false);
      }
    },
    [toggleDrawerWithCommand]
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

  const createNewChat = useCallback(() => {
    postCommandMessage({
      action: CommandChannelAction.new_chat,
    });
    setMessages([]);
  }, [postCommandMessage]);

  return {
    drawerOpen,
    setDrawerOpen: toggleDrawerWithCommand,
    textAreaRef,
    messages,
    createNewChat,
  };
};

export default useDrawer;
