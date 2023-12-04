import { useAtom } from "jotai";
import { useCallback } from "react";

import { createConversation as createConversationDb } from "indexedDb/conversation";
import {
  currentChatMessagesAtom,
  currentConversationAtom,
} from "sidePanel/utils/atoms";

const useConversation = () => {
  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );
  const [, setCurrentChatMessages] = useAtom(currentChatMessagesAtom);

  const createConversation = useCallback(async () => {
    const newConversation = await createConversationDb();
    setCurrentConversation(newConversation);

    setCurrentChatMessages([]);
    return newConversation;
  }, [setCurrentConversation, setCurrentChatMessages]);

  const resetCurrentConversation = useCallback(() => {
    setCurrentConversation(null);
    setCurrentChatMessages([]);
  }, [setCurrentConversation, setCurrentChatMessages]);

  return {
    createConversation,
    currentConversation,
    resetCurrentConversation,
    setCurrentConversation,
  };
};

export default useConversation;
