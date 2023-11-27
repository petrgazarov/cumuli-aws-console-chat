import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";

import {
  getChatMessages,
  replaceChatMessage,
  saveChatMessage,
} from "indexedDb/chatMessage";
import { streamLlmResponse } from "serviceWorker/openai";
import { addScreenshotToMessage } from "serviceWorker/utils";
import { getImageContentFromMessage } from "utils/helpers";
import {
  ChatChannelAction,
  ChatChannelMessage,
  NewAssistantChatMessage,
  Order,
  UserChatMessage,
} from "utils/types";

let streamingRunner: ChatCompletionStream | null = null;

export const chatChannelListener = async (
  port: chrome.runtime.Port,
  channelMessage: ChatChannelMessage
) => {
  switch (channelMessage.action) {
    case ChatChannelAction.new_message:
      {
        const userMessage: UserChatMessage = channelMessage.payload;
        const conversationId = userMessage.conversationId;

        const imageContent = getImageContentFromMessage(userMessage);
        if (imageContent) {
          await addScreenshotToMessage(userMessage);
        }

        await saveChatMessage(userMessage);

        port.postMessage({
          action: ChatChannelAction.new_message,
          payload: userMessage,
        });

        generateAssistantMessage(conversationId, port);
      }
      break;
    case ChatChannelAction.replace_message: {
      const userMessage: UserChatMessage = channelMessage.payload;
      const conversationId = userMessage.conversationId;

      const imageContent = getImageContentFromMessage(userMessage);
      if (imageContent && !imageContent.image_url.url) {
        await addScreenshotToMessage(userMessage);
      }

      await replaceChatMessage(userMessage);

      port.postMessage({
        action: ChatChannelAction.replace_message,
        payload: userMessage,
      });

      await generateAssistantMessage(conversationId, port);
    }
  }
};

const generateAssistantMessage = async (
  conversationId: string,
  port: chrome.runtime.Port
) => {
  const chatMessages = await getChatMessages({
    conversationId,
    order: Order.asc,
  });

  const assistantMessage = NewAssistantChatMessage({
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
};
