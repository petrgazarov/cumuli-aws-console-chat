import OpenAI from "openai";

import systemMessageContent from "!!raw-loader!./systemPrompt.txt";
import { getOpenaiApiKey } from "utils/helpers";
import { Role } from "utils/types";
import { ChatMessage } from "utils/types";

const OPENAI_MODEL_ID = "gpt-4-vision-preview";

const initializeOpenai = async () => {
  const openAiApiKey = await getOpenaiApiKey(false);
  return new OpenAI({ apiKey: openAiApiKey });
};

export const streamLlmResponse = async ({
  messages,
  onAbort,
  onChatCompletion,
  onContent,
  onError,
}: {
  messages: ChatMessage[];
  onAbort: () => void;
  onChatCompletion: () => void;
  onContent: (chunk: string) => void;
  onError: (error: any) => void;
}) => {
  const openai = await initializeOpenai();

  const messagesWithSystemPrompt = [
    { content: systemMessageContent, role: Role.system },
    ...messages.map(({ content, role }) => ({
      content,
      role,
    })),
  ];

  return openai.beta.chat.completions
    .stream({
      max_tokens: 4096,
      messages:
        messagesWithSystemPrompt as OpenAI.Chat.ChatCompletionMessageParam[],
      model: OPENAI_MODEL_ID,
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
