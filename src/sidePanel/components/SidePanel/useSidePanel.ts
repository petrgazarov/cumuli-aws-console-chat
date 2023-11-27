import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import useConversation from "sidePanel/hooks/useConversation";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { scrollPanelToBottom } from "sidePanel/utils/helpers";

const useSidePanel = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [, setStreaming] = useAtom(streamingAtom);
  const [, setLoading] = useAtom(loadingAtom);

  const { currentConversation } = useConversation();

  useEffect(() => {
    setLoading(false);
    setStreaming(false);
    textareaRef.current?.focus();
  }, [currentConversation?.id]);

  useEffect(() => {
    textareaRef.current?.focus();

    scrollPanelToBottom();
  }, []);

  return { textareaRef };
};

export default useSidePanel;
