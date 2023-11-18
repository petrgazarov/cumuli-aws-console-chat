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

  const llmChannelListener = useCallback(
    (channelMessage: LlmChannelMessage) => {
      if (channelMessage.action !== LlmChannelAction.initial_state) return;

      setMessages(channelMessage.payload.messages);
      setDrawerOpen(channelMessage.payload.open);
    },
    [setMessages, setDrawerOpen]
  );

  const commandChannelListener = useCallback(
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
        postCommandMessage({ action: CommandChannelAction.close_chat });
      }
    },
    [setDrawerOpen, postCommandMessage]
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

  const setDrawerOpenAndPostMessage = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      postCommandMessage({
        action: open
          ? CommandChannelAction.open_chat
          : CommandChannelAction.close_chat,
      });
    },
    [setDrawerOpen, postCommandMessage]
  );

  return {
    drawerOpen,
    setDrawerOpen: setDrawerOpenAndPostMessage,
    textAreaRef,
    messages,
  };
};

export default useDrawer;
