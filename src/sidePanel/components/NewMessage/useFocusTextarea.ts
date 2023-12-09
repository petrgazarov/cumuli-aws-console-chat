import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import {
  conversationStartedAtom,
  documentWasFocusedAtom,
  llmStreamingAtom,
  newMessageTextareaRefAtom,
} from "sidePanel/utils/atoms";

const useFocusTextarea = () => {
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const [documentWasFocused] = useAtom(documentWasFocusedAtom);
  const prevLlmStreamingRef = useRef(llmStreaming);

  useEffect(() => {
    prevLlmStreamingRef.current = llmStreaming;
  });
  const prevLlmStreaming = prevLlmStreamingRef.current;

  useEffect(() => {
    if (documentWasFocused && !conversationStarted) {
      newMessageTextareaRef?.current?.focus();
    }
  }, [newMessageTextareaRef, conversationStarted, documentWasFocused]);

  useEffect(() => {
    if (prevLlmStreaming && !llmStreaming) {
      newMessageTextareaRef?.current?.focus();
    }
  }, [prevLlmStreaming, llmStreaming, newMessageTextareaRef]);
};

export default useFocusTextarea;
