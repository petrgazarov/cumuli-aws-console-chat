import { useAtom } from "jotai";
import { useEffect } from "react";

import {
  llmLoadingAtom,
  openaiApiKeyAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";

const DEFAULT_STREAMING_ERROR =
  "Unhadled error. If this persists, please file an issue on GitHub.";

const DEFAULT_NO_OPENAI_API_KEY_ERROR =
  "Set your OpenAI API key in the Config tab to start chatting";

const useChatError = () => {
  const [streamingError, setLlmStreamingError] = useAtom(streamingErrorAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [openaiApiKey] = useAtom(openaiApiKeyAtom);

  useEffect(() => {
    if (llmLoading) {
      setLlmStreamingError(null);
    }
  }, [llmLoading, setLlmStreamingError]);

  if (!openaiApiKey) {
    return DEFAULT_NO_OPENAI_API_KEY_ERROR;
  }

  if (streamingError === null) {
    return null;
  }

  return streamingError || DEFAULT_STREAMING_ERROR;
};

export default useChatError;
