import { useAtom } from "jotai";
import { useCallback } from "react";

import { createConversation as createConversationDb } from "indexedDb/conversation";
import {
  currentChatMessagesAtom,
  currentConversationAtom,
  llmLoadingAtom,
  llmStreamingAtom,
  newMessageTextareaRefAtom,
  newMessageTextareaValueAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";

const useConversation = () => {
  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );
  const [, setCurrentChatMessages] = useAtom(currentChatMessagesAtom);
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const [, setLlmLoading] = useAtom(llmLoadingAtom);
  const [, setLlmStreaming] = useAtom(llmStreamingAtom);
  const [, setNewMessageTextareaValue] = useAtom(newMessageTextareaValueAtom);
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);

  const createConversation = useCallback(async () => {
    const newConversation = await createConversationDb();
    setCurrentConversation(newConversation);

    setCurrentChatMessages([]);
    return newConversation;
  }, [setCurrentConversation, setCurrentChatMessages]);

  const resetCurrentConversation = useCallback(() => {
    setCurrentConversation(null);
    setCurrentChatMessages([]);
    setLlmStreamingError(null);
    setLlmLoading(false);
    setLlmStreaming(false);
    setNewMessageTextareaValue("");

    newMessageTextareaRef.current?.focus();
  }, [
    newMessageTextareaRef,
    setCurrentConversation,
    setCurrentChatMessages,
    setLlmStreamingError,
    setLlmLoading,
    setLlmStreaming,
    setNewMessageTextareaValue,
  ]);

  return {
    createConversation,
    currentConversation,
    resetCurrentConversation,
    setCurrentConversation,
  };
};

export default useConversation;
