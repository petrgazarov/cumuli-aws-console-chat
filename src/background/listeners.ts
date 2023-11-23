import OpenAI from "openai";
import { APIUserAbortError } from "openai/error";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";

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

import { DrawerInstance, NewChatConversation } from "./types";
import { captureVisibleTab } from "./utils";

let streamingRunner: ChatCompletionStream | null = null;

export const setupChatChannelListener = (
  port: chrome.runtime.Port,
  drawerInstance: DrawerInstance
) => {
  port.postMessage({
    action: ChatChannelAction.initial_state,
    payload: drawerInstance,
  });

  port.onMessage.addListener(async (channelMessage: ChatChannelMessage) => {
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
        drawerInstance.conversation.messages.push(userMessage);
        port.postMessage({
          action: ChatChannelAction.new_message,
          payload: userMessage,
        });

        const openAiApiKey = await getOpenAiApiKey();
        const openai = new OpenAI({ apiKey: openAiApiKey });

        drawerInstance.conversation.messages.push({
          role: Role.assistant,
          content: "",
        });

        streamingRunner = openai.beta.chat.completions
          .stream({
            model: "gpt-4-vision-preview",
            messages: drawerInstance.conversation
              .messages as OpenAI.Chat.ChatCompletionMessageParam[], // TODO: remove this type cast
            max_tokens: 4096,
            stream: true,
            temperature: 0.0,
          })
          .on("content", (chunk) => {
            const lastMessage =
              drawerInstance.conversation.messages[
                drawerInstance.conversation.messages.length - 1
              ];

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
  });
};

export const setupCommandChannelListener = (
  port: chrome.runtime.Port,
  drawerInstance: DrawerInstance
) => {
  port.onMessage.addListener((channelMessage: CommandChannelMessage) => {
    switch (channelMessage.action) {
      case CommandChannelAction.toggle_chat:
        drawerInstance.open = !drawerInstance.open;
        break;
      case CommandChannelAction.close_chat:
        drawerInstance.open = false;
        break;
      case CommandChannelAction.open_chat:
        drawerInstance.open = true;
        break;
      case CommandChannelAction.new_chat:
        drawerInstance.conversation = NewChatConversation();
        streamingRunner?.controller.abort();
        break;
    }
  });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === CommandChannelAction.submit_with_screenshot) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      const isPageSupported =
        activeTab.url?.indexOf("console.aws.amazon.com") &&
        activeTab.url?.indexOf("console.aws.amazon.com") > -1;

      if (!isPageSupported || !activeTab.id) {
        return;
      }

      chrome.tabs.sendMessage(activeTab.id, { action: command });
    });
  }
});
