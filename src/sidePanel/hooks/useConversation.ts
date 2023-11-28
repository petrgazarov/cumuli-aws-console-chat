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
  }, []);

  const resetConversation = useCallback(() => {
    setCurrentConversation(null);
    setCurrentChatMessages([]);
  }, []);

  return {
    currentConversation,
    setCurrentConversation,
    createConversation,
    resetConversation,
  };
};

export default useConversation;
