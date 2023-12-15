import { useAtom } from "jotai";
import { useCallback } from "react";

import useConversations from "sidePanel/hooks/useConversations";
import { currentChatMessagesAtom } from "sidePanel/utils/atoms";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import { ChatMessage, Role, UserChatMessage } from "utils/types";

const useChatMessages = () => {
  const [, setCurrentChatMessages] = useAtom(currentChatMessagesAtom);
  const { getConversations } = useConversations();

  const appendMessage = useCallback(
    (chatMessage: ChatMessage) => {
      setCurrentChatMessages((prevChatMessages) => [
        ...prevChatMessages,
        chatMessage,
      ]);

      if (chatMessage.role === Role.user) {
        getConversations();
      }
    },
    [setCurrentChatMessages, getConversations]
  );

  const appendChunk = useCallback(
    (chunk: string) => {
      setCurrentChatMessages((prevChatMessages) => {
        const lastMessage = prevChatMessages[prevChatMessages.length - 1];

        if (lastMessage?.role === Role.assistant) {
          const newLastMessage = {
            ...lastMessage,
            content: lastMessage.content + chunk,
          };

          return [...prevChatMessages.slice(0, -1), newLastMessage];
        }

        return prevChatMessages;
      });
    },
    [setCurrentChatMessages]
  );

  const replaceMessage = useCallback(
    (chatMessage: ChatMessage) => {
      setCurrentChatMessages((prevChatMessages): ChatMessage[] => {
        const messageIndex = prevChatMessages.findIndex(
          (m) => m.id === chatMessage.id
        );

        if (messageIndex === -1) {
          return prevChatMessages;
        }

        return [...prevChatMessages.slice(0, messageIndex), chatMessage];
      });
      getConversations();
    },
    [setCurrentChatMessages, getConversations]
  );

  const appendOrReconcileMessage = useCallback(
    (chatMessage: ChatMessage) => {
      setCurrentChatMessages((prevChatMessages): ChatMessage[] => {
        const messageIndex = prevChatMessages.findIndex(
          (m) => m.id === chatMessage.id
        );

        if (messageIndex === -1) {
          return [...prevChatMessages, chatMessage];
        }

        return [
          ...prevChatMessages.slice(0, messageIndex),
          chatMessage,
          ...prevChatMessages.slice(messageIndex + 1),
        ];
      });
    },
    [setCurrentChatMessages]
  );

  const removeImageFromMessage = useCallback(
    (chatMessage: UserChatMessage) => {
      setCurrentChatMessages((prevChatMessages): ChatMessage[] => {
        const messageIndex = prevChatMessages.findIndex(
          (m) => m.id === chatMessage.id
        );

        if (messageIndex === -1) {
          return prevChatMessages;
        }

        const prevChatMessage = prevChatMessages[messageIndex];
        const imageContent = getImageContentFromMessage(prevChatMessage);

        if (imageContent) {
          return [
            ...prevChatMessages.slice(0, messageIndex),
            { ...prevChatMessage, content: getChatMessageText(chatMessage) },
            ...prevChatMessages.slice(messageIndex + 1),
          ];
        }

        return prevChatMessages;
      });
    },
    [setCurrentChatMessages]
  );

  return {
    appendChunk,
    appendMessage,
    appendOrReconcileMessage,
    removeImageFromMessage,
    replaceMessage,
  };
};

export default useChatMessages;
