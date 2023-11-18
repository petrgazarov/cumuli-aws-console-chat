import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  LlmChannelMessage,
  LlmChannelAction,
  CommandChannelMessage,
  CommandChannelAction,
} from "utils/types";
import usePort from "content/utils/usePort";
import { messagesAtom } from "content/utils/atoms";

const useDrawer = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    addChannelListener: addLlmChannelListener,
    removeChannelListener: removeLlmChannelListener,
  } = usePort(LLM_CHANNEL);
  const {
    postMessage: postCommandMessage,
    addChannelListener: addCommandChannelListener,
    removeChannelListener: removeCommandChannelListener,
  } = usePort(COMMAND_CHANNEL);

  const toggleDrawer = useCallback(
    (open: boolean, sendCommand = true) => {
      setDrawerOpen(open);

      if (sendCommand) {
        postCommandMessage({
          action: open
            ? CommandChannelAction.open_chat
            : CommandChannelAction.close_chat,
        });
      }

      if (open) {
        textAreaRef.current?.focus();
      }
    },
    [setDrawerOpen, postCommandMessage]
  );

  const llmChannelListener = useCallback(
    (channelMessage: LlmChannelMessage) => {
      if (channelMessage.action !== LlmChannelAction.initial_state) return;

      setMessages(channelMessage.payload.messages);
      toggleDrawer(channelMessage.payload.open, false);
    },
    [setMessages, toggleDrawer]
  );

  const commandChannelListener = useCallback(
    (message: CommandChannelMessage) => {
      if (message.action === CommandChannelAction.open_chat) {
        toggleDrawer(true, false);
      }
    },
    [toggleDrawer]
  );

  const escapeButtonListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleDrawer(false);
      }
    },
    [toggleDrawer, postCommandMessage]
  );

  useEffect(() => {
    addLlmChannelListener(llmChannelListener);
    addCommandChannelListener(commandChannelListener);
    window.addEventListener("keydown", escapeButtonListener);

    return () => {
      removeCommandChannelListener();
      removeLlmChannelListener();
      window.removeEventListener("keydown", escapeButtonListener);
    };
  }, [llmChannelListener, commandChannelListener, escapeButtonListener]);

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();
    }
  }, [drawerOpen, messages]);

  return {
    drawerOpen,
    setDrawerOpen: toggleDrawer,
    textAreaRef,
    messages,
  };
};

export default useDrawer;
