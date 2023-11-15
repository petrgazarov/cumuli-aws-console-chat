import OpenAI from "openai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import { ChatMessage, Role, ImageMessageContent } from "utils/types";
import { Commands } from "utils/types";
import { getOpenAiApiKey } from "utils/helpers";
import { captureVisibleTabPromise } from "./utils";

// In-memory state of all the messages
let messages: ChatMessage[] = [];

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === LLM_CHANNEL) {
    port.onMessage.addListener(async (userMessage: ChatMessage) => {
      if (Array.isArray(userMessage.content)) {
        const screenshotData = await captureVisibleTabPromise();

        const imageContent = userMessage.content.find(
          (content): content is ImageMessageContent =>
            content.type === "image_url"
        );
        if (imageContent) {
          imageContent.image_url.url = screenshotData;
        }
      }

      // Add the user message to the list of messages, and send it back to the content script
      messages.push(userMessage);
      port.postMessage(userMessage);

      const openAiApiKey = await getOpenAiApiKey();
      const openai = new OpenAI({ apiKey: openAiApiKey });

      const payload = {
        model: "gpt-4-vision-preview",
        messages: messages as OpenAI.Chat.ChatCompletionMessageParam[], // TODO: remove this type cast
        max_tokens: 4096,
      };
      console.log("request", payload);
      openai.chat.completions.create(payload).then((response) => {
        console.log("response", response);
        const llmMessage = {
          role: Role.assistant,
          content: response.choices[0].message.content || "",
        };

        // Add the assistant message to the list of messages, and send it back to the content script
        messages.push(llmMessage);
        port.postMessage(llmMessage);
      });
    });
  } else if (port.name === COMMAND_CHANNEL) {
    chrome.commands.onCommand.addListener((command) => {
      if (command === Commands.open_chat) {
        port.postMessage({ action: Commands.open_chat });
      }
    });
  }
});
