import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";

import {
  createChatMessage,
  getChatMessages,
  saveChatMessage,
} from "indexedDb/chatMessage";
import { streamLlmResponse } from "serviceWorker/openai";
import { addScreenshotToMessage } from "serviceWorker/utils";
import {
  ChatChannelAction,
  ChatChannelMessage,
  ChatMessage,
  NewChatMessage,
  Order,
  Role,
} from "utils/types";

let streamingRunner: ChatCompletionStream | null = null;

export const chatChannelListener = async (
  port: chrome.runtime.Port,
  channelMessage: ChatChannelMessage
) => {
  switch (channelMessage.action) {
    case ChatChannelAction.new_message:
      {
        const userMessage: ChatMessage = channelMessage.payload;
        const conversationId = userMessage.conversationId;

        if (Array.isArray(userMessage.content)) {
          await addScreenshotToMessage(userMessage);
        }

        await createChatMessage(userMessage);
        port.postMessage({
          action: ChatChannelAction.new_message,
          payload: userMessage,
        });

        const chatMessages = await getChatMessages({
          conversationId,
          order: Order.asc,
        });

        console.log("chatMessages", chatMessages);

        const assistantMessage = NewChatMessage({
          role: Role.assistant,
          content: "",
          conversationId,
        });

        const onContent = (chunk: string) => {
          if (!assistantMessage.content) {
            assistantMessage.content = chunk;

            try {
              port.postMessage({
                action: ChatChannelAction.new_message,
                payload: assistantMessage,
              });
            } catch (error: any) {
              console.debug(
                "[Cumuli] error sending message to side panel",
                error?.message
              );
            }
          } else {
            assistantMessage.content += chunk;

            try {
              port.postMessage({
                action: ChatChannelAction.stream_chunk,
                payload: chunk,
              });
            } catch (error: any) {
              console.debug(
                "[Cumuli] error sending message to side panel",
                error?.message
              );
            }
          }
        };

        streamingRunner = await streamLlmResponse({
          messages: chatMessages,
          onContent,
          onError: async () => {
            if (assistantMessage.content) {
              await saveChatMessage(assistantMessage);
            }
            streamingRunner = null;
          },
          onAbort: async () => {
            if (assistantMessage.content) {
              await saveChatMessage(assistantMessage);
            }
            streamingRunner = null;
          },
          onChatCompletion: async () => {
            await saveChatMessage(assistantMessage);

            try {
              port.postMessage({
                action: ChatChannelAction.finish_stream,
              });
            } catch (error: any) {
              console.debug(
                "[Cumuli] error sending message to side panel",
                error?.message
              );
            }
            streamingRunner = null;
          },
        });
      }
      break;
  }
};
