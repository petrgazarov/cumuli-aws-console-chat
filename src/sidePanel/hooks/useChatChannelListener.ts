import { useAtom } from "jotai";
import { useCallback } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import usePort from "sidePanel/hooks/usePort";
import {
  llmLoadingAtom,
  llmStreamingAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";
import { CHAT_CHANNEL } from "utils/constants";
import { ChatChannelAction, ChatChannelMessage } from "utils/types";

const useChatChannelListener = () => {
  const [, setLlmLoading] = useAtom(llmLoadingAtom);
  const [, setLlmStreaming] = useAtom(llmStreamingAtom);
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const { appendChunk, appendMessage, replaceMessage } = useChatMessages();

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      switch (channelMessage.action) {
        case ChatChannelAction.message_replace:
          replaceMessage(channelMessage.payload);
          break;
        case ChatChannelAction.message_new:
          appendMessage(channelMessage.payload);
          break;
        case ChatChannelAction.stream_chunk:
          appendChunk(channelMessage.payload);
          setLlmLoading(false);
          break;
        case ChatChannelAction.stream_finish:
          setLlmStreaming(false);
          break;
        case ChatChannelAction.stream_error:
          setLlmStreamingError(channelMessage.payload);
          setLlmStreaming(false);
          setLlmLoading(false);
          break;
      }
    },
    [
      replaceMessage,
      appendMessage,
      appendChunk,
      setLlmLoading,
      setLlmStreaming,
      setLlmStreamingError,
    ]
  );

  const { postMessage: postChatMessage } = usePort({
    channelName: CHAT_CHANNEL,
    listener: chatChannelListener,
  });

  return { postChatMessage };
};

export default useChatChannelListener;
