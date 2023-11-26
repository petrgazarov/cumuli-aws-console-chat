import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { useCallback, useEffect } from "react";

import { getChatMessages } from "indexedDb/chatMessage";
import {
  currentChatMessagesAtom,
  currentConversationAtom,
} from "sidePanel/utils/atoms";
import { ChatMessage, Order, Role } from "utils/types";

const useChatMessage = () => {
  const [currentChatMessages, setCurrentChatMessages] = useAtom(
    currentChatMessagesAtom
  );
  const [currentConversation] = useAtom(currentConversationAtom);

  useEffect(() => {
    if (currentConversation) {
      getChatMessages({
        conversationId: currentConversation.id,
        order: Order.asc,
      }).then(setCurrentChatMessages);
    }
  }, [currentConversation?.id]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setCurrentChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      message,
    ]);
  }, []);

  const appendChunk = useCallback((chunk: string) => {
    setCurrentChatMessages((prevChatMessages) => {
      const newMessages = cloneDeep(prevChatMessages);
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage?.role === Role.assistant) {
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          content: (lastMessage.content += chunk),
        };
      }

      return newMessages;
    });
  }, []);

  const replaceMessage = useCallback((message: ChatMessage) => {
    setCurrentChatMessages((prevChatMessages) => {
      const messageIndex = prevChatMessages.findIndex(
        (m) => m.id === message.id
      );

      if (messageIndex !== -1) {
        return [
          ...prevChatMessages.slice(0, messageIndex),
          {
            ...prevChatMessages[messageIndex],
            content: message.content,
          },
        ];
      }

      return prevChatMessages;
    });
  }, []);

  return {
    currentChatMessages,
    setCurrentChatMessages,
    appendMessage,
    appendChunk,
    replaceMessage,
  };
};

export default useChatMessage;
