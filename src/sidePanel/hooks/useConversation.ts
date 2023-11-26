import { useAtom } from "jotai";
import { useCallback } from "react";

import { createConversation as createConversationDb } from "indexedDb/conversation";
import { currentConversationAtom } from "sidePanel/utils/atoms";

const useConversation = () => {
  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );

  const createConversation = useCallback(async () => {
    const newConversation = await createConversationDb();
    setCurrentConversation(newConversation);
    return newConversation;
  }, []);

  return {
    currentConversation,
    setCurrentConversation,
    createConversation,
  };
};

export default useConversation;
