import OpenAI from "openai";

import { getOpenaiApiKey } from "utils/helpers";
import { ChatMessage } from "utils/types";

const OPENAI_MODEL_ID = "gpt-4-vision-preview";

const initializeOpenai = async () => {
  const openAiApiKey = await getOpenaiApiKey(false);
  return new OpenAI({ apiKey: openAiApiKey });
};

export const streamLlmResponse = async ({
  messages,
  onContent,
  onChatCompletion,
  onAbort,
  onError,
}: {
  messages: ChatMessage[];
  onContent: (chunk: string) => void;
  onChatCompletion: () => void;
  onAbort: () => void;
  onError: (error: any) => void;
}) => {
  const openai = await initializeOpenai();

  return openai.beta.chat.completions
    .stream({
      model: OPENAI_MODEL_ID,
      messages: messages.map(
        ({ id, createdAt, conversationId, ...rest }) => rest
      ) as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens: 4096,
      stream: true,
      temperature: 0.0,
    })
    .on("content", onContent)
    .on("chatCompletion", onChatCompletion)
    .on("abort", () => {
      console.debug("[Cumuli] user aborted request");
      onAbort();
    })
    .on("error", (e) => {
      console.debug("[Cumuli] unhandled error from stream runner", e.message);
      onError(e);
    });
};