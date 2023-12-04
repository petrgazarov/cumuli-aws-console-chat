import { format, isThisMonth, isToday, isYesterday, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

import {
  deleteAllConversations as deleteAllConversationsDb,
  deleteConversation as deleteConversationDb,
  getConversations as getConversationsDb,
} from "indexedDb/conversation";
import {
  conversationsAtom,
  currentChatMessagesAtom,
  currentConversationAtom,
} from "sidePanel/utils/atoms";
import { Conversation, Order } from "utils/types";

const useConversations = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [, setCurrentChatMessages] = useAtom(currentChatMessagesAtom);
  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );

  const getConversations = useCallback(
    async (page = 1) =>
      getConversationsDb({ order: Order.desc, page }).then((conversations) => {
        setConversations((prevConversations) =>
          page === 1 ? conversations : [...prevConversations, ...conversations]
        );
      }),
    [setConversations]
  );

  const deleteAllConversations = useCallback(async () => {
    deleteAllConversationsDb().then(() => {
      setConversations([]);
      setCurrentChatMessages([]);
      setCurrentConversation(null);
    });
  }, [setConversations, setCurrentChatMessages, setCurrentConversation]);

  const deleteConversation = useCallback(
    async (conversation: Conversation) => {
      await deleteConversationDb(conversation);
      getConversations();

      if (currentConversation?.id === conversation.id) {
        setCurrentConversation(null);
        setCurrentChatMessages([]);
      }
    },
    [
      getConversations,
      currentConversation,
      setCurrentConversation,
      setCurrentChatMessages,
    ]
  );

  const groupedConversations = useMemo(() => {
    const groups: { [key: string]: Conversation[] } = {};

    conversations.forEach((conversation) => {
      const creationDate = parseISO(conversation.updatedAt);
      let label;

      if (isToday(creationDate)) {
        label = "Today";
      } else if (isYesterday(creationDate)) {
        label = "Yesterday";
      } else if (isThisMonth(creationDate)) {
        label = "Earlier this month";
      } else {
        label = format(creationDate, "MMMM yyyy");
      }

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(conversation);
    });

    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }, [conversations]);

  return {
    conversations,
    deleteAllConversations,
    deleteConversation,
    getConversations,
    groupedConversations,
  };
};

export default useConversations;
