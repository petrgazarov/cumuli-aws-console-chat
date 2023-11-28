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
      setConversations(conversations);
    });
  }, []);

  const deleteAllConversations = useCallback(async () => {
    deleteAllConversationsDb().then(() => {
      setConversations([]);
      setCurrentChatMessages([]);
      setCurrentConversation(null);
    });
  }, []);

  return {
    conversations,
    getConversations,
    deleteAllConversations,
  };
};

export default useConversations;
