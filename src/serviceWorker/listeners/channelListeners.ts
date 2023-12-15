import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";

import {
  getChatMessages,
  replaceChatMessage,
  saveChatMessage,
} from "indexedDb/chatMessage";
import { touchConversation } from "indexedDb/conversation";
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
    case ChatChannelAction.message_new:
      {
        const userMessage: UserChatMessage = channelMessage.payload;
        const conversationId = userMessage.conversationId;

        const imageContent = getImageContentFromMessage(userMessage);
        if (imageContent) {
          await addScreenshotToMessage(userMessage);
        }

        await saveChatMessage(userMessage);
        await touchConversation(conversationId);

        port.postMessage({
          action: ChatChannelAction.message_new,
          payload: userMessage,
        });

        generateAssistantMessage(conversationId, port);
      }
      break;
    case ChatChannelAction.message_replace:
      {
        // Abort the streaming runner if it's running
        streamingRunner?.abort();

        const userMessage: UserChatMessage = channelMessage.payload;
        const conversationId = userMessage.conversationId;

        const imageContent = getImageContentFromMessage(userMessage);
        if (imageContent && !imageContent.image_url.url) {
          await addScreenshotToMessage(userMessage);
        }

        await replaceChatMessage(userMessage);
        await touchConversation(conversationId);

        port.postMessage({
          action: ChatChannelAction.message_replace,
          payload: userMessage,
        });

        await generateAssistantMessage(conversationId, port);
      }
      break;
    case ChatChannelAction.stream_abort:
      streamingRunner?.abort();
      break;
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
          action: ChatChannelAction.message_new,
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
          action: ChatChannelAction.stream_finish,
        });
      } catch (error: any) {
        console.debug(
          "[Cumuli] error sending message to side panel",
          error?.message
        );
      }
      streamingRunner = null;
    },
    onContent,
    onError: async (e: Error) => {
      if (assistantMessage.content) {
        await saveChatMessage(assistantMessage);
      }
      port.postMessage({
        action: ChatChannelAction.stream_error,
        payload: e.message,
      });
      streamingRunner = null;
    },
  });
};
