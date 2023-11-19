import OpenAI from "openai";
import {
  ChatMessageType,
  Role,
  ImageMessageContent,
  CommandChannelMessage,
  CommandChannelAction,
  ChatChannelMessage,
  ChatChannelAction,
} from "utils/types";
import { getOpenAiApiKey } from "utils/helpers";
import { captureVisibleTab } from "./utils";
import { DrawerInstance } from "./types";

export const setupLlmChannelListener = (
  port: chrome.runtime.Port,
  drawerInstance: DrawerInstance
) => {
  console.log("setupLlmChannelListener");
  port.postMessage({
    action: ChatChannelAction.initial_state,
    payload: drawerInstance,
  });

  port.onMessage.addListener(async (channelMessage: ChatChannelMessage) => {
    switch (channelMessage.action) {
      case ChatChannelAction.new_message:
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
        drawerInstance.messages.push(userMessage);
        port.postMessage({
          action: ChatChannelAction.new_message,
          payload: userMessage,
        });

        const openAiApiKey = await getOpenAiApiKey();
        const openai = new OpenAI({ apiKey: openAiApiKey });

        drawerInstance.messages.push({
          role: Role.assistant,
          content: "",
        });

        openai.beta.chat.completions
          .stream({
            model: "gpt-4-vision-preview",
            messages:
              drawerInstance.messages as OpenAI.Chat.ChatCompletionMessageParam[], // TODO: remove this type cast
            max_tokens: 4096,
            stream: true,
            temperature: 0.0,
          })
          .on("content", (chunk) => {
            port.postMessage({
              action: ChatChannelAction.stream_chunk,
              payload: chunk,
            });
            const lastMessage =
              drawerInstance.messages[drawerInstance.messages.length - 1];

            lastMessage.content += chunk;
          })
          .on("chatCompletion", () => {
            port.postMessage({
              action: ChatChannelAction.finish_stream,
            });
          });
    }
  });
};

export const setupCommandChannelListener = (
  port: chrome.runtime.Port,
  drawerInstance: DrawerInstance
) => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === CommandChannelAction.open_chat) {
      port.postMessage({ action: CommandChannelAction.open_chat });
      drawerInstance.open = true;
    }
  });

  port.onMessage.addListener((channelMessage: CommandChannelMessage) => {
    switch (channelMessage.action) {
      case CommandChannelAction.close_chat:
        drawerInstance.open = false;
        break;
      case CommandChannelAction.open_chat:
        drawerInstance.open = true;
        break;
    }
  });
};
