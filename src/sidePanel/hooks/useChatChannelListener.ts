import { useAtom } from "jotai";
import { useCallback } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { ChatChannelAction, ChatChannelMessage } from "utils/types";

const useChatChannelListener = () => {
  const [, setLoading] = useAtom(loadingAtom);
  const [, setStreaming] = useAtom(streamingAtom);
  const { appendChunk, appendMessage, replaceMessage } = useChatMessages();

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      switch (channelMessage.action) {
        case ChatChannelAction.replace_message:
          replaceMessage(channelMessage.payload);
          break;
        case ChatChannelAction.new_message:
          appendMessage(channelMessage.payload);
          break;
        case ChatChannelAction.stream_chunk:
          appendChunk(channelMessage.payload);
          setLoading(false);
          break;
        case ChatChannelAction.finish_stream:
          setStreaming(false);
          break;
      }
    },
    []
  );

  return chatChannelListener;
};

export default useChatChannelListener;
