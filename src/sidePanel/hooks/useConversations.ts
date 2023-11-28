import { format, isThisMonth, isToday, isYesterday, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { useCallback } from "react";

import {
  deleteAllConversations as deleteAllConversationsDb,
  getConversations as getConversationsDb,
} from "indexedDb/conversation";
import {
  conversationsAtom,
  currentChatMessagesAtom,
  currentConversationAtom,
} from "sidePanel/utils/atoms";
import { Order } from "utils/types";

const useConversations = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [, setCurrentChatMessages] = useAtom(currentChatMessagesAtom);
  const [, setCurrentConversation] = useAtom(currentConversationAtom);

  const getConversations = useCallback(async (page = 1) => {
    getConversationsDb({ page, order: Order.desc }).then((conversations) => {
      setConversations((prevConversations) =>
        page === 1 ? conversations : [...prevConversations, ...conversations]
      );
    });
  }, []);

  const deleteAllConversations = useCallback(async () => {
    deleteAllConversationsDb().then(() => {
      setConversations([]);
      setCurrentChatMessages([]);
      setCurrentConversation(null);
    });
  }, []);

  const groupedConversations = useCallback(() => {
    const groups: { [key: string]: any[] } = {};

    conversations.forEach((conversation) => {
      const creationDate = parseISO(conversation.createdAt);
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

    return groups;
  }, [conversations]);

  return {
    conversations,
    groupedConversations,
    getConversations,
    deleteAllConversations,
  };
};

export default useConversations;
