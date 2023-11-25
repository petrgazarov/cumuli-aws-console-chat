import OpenAI from "openai";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";

import { captureVisibleTab } from "serviceWorker/utils";
import { getOpenAiApiKey } from "utils/helpers";
import {
  ChatMessageType,
  Role,
  ImageMessageContent,
  CommandChannelMessage,
  CommandChannelAction,
  ChatChannelMessage,
  ChatChannelAction,
} from "utils/types";
import { ChatConversation } from "utils/types";

let streamingRunner: ChatCompletionStream | null = null;

export const chatChannelListener = async (
  port: chrome.runtime.Port,
  chatConversation: ChatConversation,
  channelMessage: ChatChannelMessage
) => {
  switch (channelMessage.action) {
    case ChatChannelAction.new_message: {
      const userMessage: ChatMessageType = channelMessage.payload;

      if (Array.isArray(userMessage.content)) {
        const screenshotData = await captureVisibleTab();

        const imageContent = userMessage.content.find(
          (content): content is ImageMessageContent =>
            content.type === "image_url"
        );
        if (imageContent) {
          imageContent.image_url.url = screenshotData;
        }
      }

      // Add the user message to the list of messages and send it back to the content script
      chatConversation.messages.push(userMessage);
      port.postMessage({
        action: ChatChannelAction.new_message,
        payload: userMessage,
      });

      const openAiApiKey = await getOpenAiApiKey();
      const openai = new OpenAI({ apiKey: openAiApiKey });

      chatConversation.messages.push({
        role: Role.assistant,
        content: "",
      });

      streamingRunner = openai.beta.chat.completions
        .stream({
          model: "gpt-4-vision-preview",
          messages:
            chatConversation.messages as OpenAI.Chat.ChatCompletionMessageParam[], // TODO: remove this type cast
          max_tokens: 4096,
          stream: true,
          temperature: 0.0,
        })
        .on("content", (chunk) => {
          const lastMessage =
            chatConversation.messages[chatConversation.messages.length - 1];

          lastMessage.content += chunk;

          try {
            port.postMessage({
              action: ChatChannelAction.stream_chunk,
              payload: chunk,
            });
          } catch (error: any) {
            console.debug(
              "[Cumuli] error sending message to content script",
              error?.message
            );
          }
        })
        .on("chatCompletion", () => {
          streamingRunner = null;

          try {
            port.postMessage({
              action: ChatChannelAction.finish_stream,
            });
          } catch (error: any) {
            console.debug(
              "[Cumuli] error sending message to content script",
              error?.message
            );
          }
        })
        .on("abort", () => {
          streamingRunner = null;
          console.debug("[Cumuli] user aborted request");
        })
        .on("error", (e) => {
          streamingRunner = null;
          console.debug(
            "[Cumuli] unhandled error from stream runner",
            e.message
          );
        });
    }
  }
};

export const commandChannelListener = (
  channelMessage: CommandChannelMessage
) => {
  switch (channelMessage.action) {
    case CommandChannelAction.new_chat:
      streamingRunner?.controller.abort();
      break;
  }
};
