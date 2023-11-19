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

const useDrawer = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const commandChannelListener = useCallback(
    (message: CommandChannelMessage) => {
      if (message.action === CommandChannelAction.open_chat) {
        setDrawerOpen(true);
        textAreaRef.current?.focus();
      }
    },
    []
  );

  const { postMessage: postCommandMessage } = usePort({
    channelName: COMMAND_CHANNEL,
    listener: commandChannelListener,
  });

  const llmChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      console.log("useDrawer channelMessage", channelMessage);
      if (channelMessage.action !== ChatChannelAction.initial_state) return;

      setMessages(channelMessage.payload.messages);
      setDrawerOpen(channelMessage.payload.open);

      if (channelMessage.payload.open) {
        textAreaRef.current?.focus();
      }
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

      console.log("toggleDrawerWithCommand", open);
      if (open) {
        textAreaRef.current?.focus();
      }
    },
    [postCommandMessage]
  );

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

  return {
    drawerOpen,
    setDrawerOpen: toggleDrawerWithCommand,
    textAreaRef,
    messages,
  };
};

export default useDrawer;
