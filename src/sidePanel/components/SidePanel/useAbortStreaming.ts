import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { ChatChannelAction } from "root/src/utils/types";
import { currentConversationAtom } from "sidePanel/utils/atoms";

type UseAbortStreamingParams = {
  postChatMessage: (message: any) => void;
};

const useAbortStreaming = ({ postChatMessage }: UseAbortStreamingParams) => {
  const [currentConversation] = useAtom(currentConversationAtom);
  const prevConversationId = useRef<string | null>(null);

  useEffect(() => {
    if (
      prevConversationId.current &&
      prevConversationId.current !== (currentConversation?.id || null)
    ) {
      postChatMessage({
        action: ChatChannelAction.stream_abort,
      });
    }
  }, [currentConversation?.id, postChatMessage]);

  useEffect(() => {
    prevConversationId.current = currentConversation?.id || null;
  });
};

export default useAbortStreaming;
