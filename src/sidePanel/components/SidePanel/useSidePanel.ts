import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import useConversation from "sidePanel/hooks/useConversation";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { scrollPanelToBottom } from "sidePanel/utils/helpers";

const useSidePanel = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [, setStreaming] = useAtom(streamingAtom);
  const [, setLoading] = useAtom(loadingAtom);

  const { currentConversation } = useConversation();

  useEffect(() => {
    setLoading(false);
    setStreaming(false);
    textAreaRef.current?.focus();
  }, [currentConversation?.id]);

  useEffect(() => {
    textAreaRef.current?.focus();

    scrollPanelToBottom();
  }, []);

  return { textAreaRef };
};

export default useSidePanel;
