import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import {
  conversationStartedAtom,
  documentHadAnyScrollAtom,
  documentHadScrollToBottomAtom,
  documentWasEverFocusedAtom,
  llmStreamingAtom,
  newMessageTextareaRefAtom,
  scrollableContainerRefAtom,
} from "sidePanel/utils/atoms";
import {
  isAnyFocusableElementActive,
  scrollToBottom,
} from "sidePanel/utils/helpers";

const useFocusTextarea = () => {
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const [documentWasEverFocused] = useAtom(documentWasEverFocusedAtom);
  const [documentHadAnyScroll] = useAtom(documentHadAnyScrollAtom);
  const [documentHadScrollToBottom] = useAtom(documentHadScrollToBottomAtom);
  const [scrollableContainerRef] = useAtom(scrollableContainerRefAtom);

  const prevLlmStreamingRef = useRef(llmStreaming);
  const prevLlmStreaming = prevLlmStreamingRef.current;

  const streamingFinished = prevLlmStreaming && !llmStreaming;
  const scrollingOccurred = documentHadAnyScroll && !documentHadScrollToBottom;

  useEffect(() => {
    prevLlmStreamingRef.current = llmStreaming;
  });

  useEffect(() => {
    if (documentWasEverFocused && !conversationStarted) {
      newMessageTextareaRef?.current?.focus();
    }
  }, [newMessageTextareaRef, conversationStarted, documentWasEverFocused]);

  useEffect(() => {
    if (!streamingFinished) {
      return;
    }

    // Below is the logic for whether the new message textarea should be focused upon streaming finishing.

    const textarea = newMessageTextareaRef?.current;
    const container = scrollableContainerRef?.current;

    if (textarea && container) {
      const isAnotherElementFocused =
        isAnyFocusableElementActive() && document.activeElement !== textarea;

      if (isAnotherElementFocused) {
        return;
      }

      const textareaRect = textarea.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const isInViewport =
        textareaRect.top >= containerRect.top &&
        textareaRect.left >= containerRect.left &&
        textareaRect.bottom <= containerRect.bottom &&
        textareaRect.right <= containerRect.right;

      if (isInViewport) {
        textarea.focus();
        return;
      }

      if (!scrollingOccurred) {
        scrollToBottom();
        textarea?.focus();
        return;
      }
    }
  }, [
    streamingFinished,
    scrollingOccurred,
    newMessageTextareaRef,
    scrollableContainerRef,
  ]);
};

export default useFocusTextarea;
