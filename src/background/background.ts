import OpenAI from "openai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  ChatMessage,
  Role,
  ImageMessageContent,
  CommandChannelAction,
  LlmChannelMessage,
  LlmChannelAction,
} from "utils/types";
import { getOpenAiApiKey } from "utils/helpers";
import { captureVisibleTabPromise } from "./utils";

type Conversation = {
  createdAt: Date;
  messages: ChatMessage[];
};

const messages: { [tabId: number]: Conversation } = {};

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === LLM_CHANNEL) {
    const tabId = port.sender?.tab?.id;
    if (typeof tabId !== "number") throw new Error("tabId is not a number");

    const conversation = messages[tabId] || {
      createdAt: new Date(),
      messages: [],
    };

    port.onMessage.addListener(async (channelMessage: LlmChannelMessage) => {
      switch (channelMessage.action) {
        case LlmChannelAction.initial_state:
          port.postMessage({
            action: LlmChannelAction.initial_state,
            payload: conversation,
          });
          break;
        case LlmChannelAction.new_message:
          const newMessage: ChatMessage = channelMessage.payload;

          if (Array.isArray(newMessage.content)) {
            const screenshotData = await captureVisibleTabPromise();

            const imageContent = newMessage.content.find(
              (content): content is ImageMessageContent =>
                content.type === "image_url"
            );
            if (imageContent) {
              imageContent.image_url.url = screenshotData;
            }
          }

          // Add the user message to the list of messages, and send it back to the content script
          conversation.messages.push(newMessage);
          port.postMessage({
            action: LlmChannelAction.new_message,
            payload: newMessage,
          });

          const openAiApiKey = await getOpenAiApiKey();
          const openai = new OpenAI({ apiKey: openAiApiKey });

          console.log("request", conversation.messages);

          const stream = openai.beta.chat.completions
            .stream({
              model: "gpt-4-vision-preview",
              messages:
                conversation.messages as OpenAI.Chat.ChatCompletionMessageParam[], // TODO: remove this type cast
              max_tokens: 4096,
              stream: true,
            })
            .on("content", (chunk) => {
              console.log("chunk", chunk);
            })
            .on("finalChatCompletion", (chatCompletion) => {
              console.log("finalChatCompletion", chatCompletion);
            });
      }
    });
  } else if (port.name === COMMAND_CHANNEL) {
    chrome.commands.onCommand.addListener((command) => {
      if (command === CommandChannelAction.open_chat) {
        port.postMessage({ action: CommandChannelAction.open_chat });
      }
    });
  }
});
