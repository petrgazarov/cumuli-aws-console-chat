import { useAtom } from "jotai";
import { useEffect, useRef, useCallback } from "react";

import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/listeners";
import {
  messagesAtom,
  streamingAtom,
  loadingAtom,
} from "sidePanel/utils/atoms";
import { scrollPanelToBottom } from "sidePanel/utils/helpers";
import usePort from "sidePanel/utils/usePort";
import { CHAT_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  ChatChannelMessage,
  ChatChannelAction,
  CommandChannelMessage,
  CommandChannelAction,
} from "utils/types";

const useSidePanel = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [, setStreaming] = useAtom(streamingAtom);
  const [, setLoading] = useAtom(loadingAtom);

  const { postMessage: postCommandMessage } = usePort({
    channelName: COMMAND_CHANNEL,
  });

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      if (channelMessage.action !== ChatChannelAction.initial_state) {
        return;
      }

      setMessages(channelMessage.payload.conversation.messages);
    },
    []
  );

  usePort({ channelName: CHAT_CHANNEL, listener: chatChannelListener });

  const toggleDrawerOpen = useCallback(() => {
    postCommandMessage({ action: CommandChannelAction.toggle_chat });

    textAreaRef.current?.focus();
    scrollPanelToBottom();
  }, [postCommandMessage]);

  const createNewChat = useCallback(() => {
    postCommandMessage({ action: CommandChannelAction.new_chat });
    setMessages([]);
    setStreaming(false);
    setLoading(false);
    textAreaRef.current?.focus();
  }, [postCommandMessage]);

  useEffect(() => {
    const listenerFn = (message: CommandChannelMessage) => {
      switch (message.action) {
        case CommandChannelAction.toggle_chat:
          toggleDrawerOpen();
          break;
        case CommandChannelAction.new_chat:
          createNewChat();
          break;
      }
    };

    addOnMessageListener(listenerFn);

    return () => removeOnMessageListener(listenerFn);
  }, [toggleDrawerOpen, createNewChat]);

  useEffect(() => {
    textAreaRef.current?.focus();

    scrollPanelToBottom();
  }, []);

  return {
    toggleDrawerOpen,
    textAreaRef,
    messages,
    createNewChat,
  };
};

export default useSidePanel;
