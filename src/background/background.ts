import OpenAI from "openai";
import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import { ChatMessage, Role, CommandMessage } from "utils/types";
import { Commands } from "utils/types";

// In-memory state of all the messages
let messages: ChatMessage[] = [];

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === LLM_CHANNEL) {
    port.onMessage.addListener((message: ChatMessage) => {
      // Add the received message to the in-memory state
      messages.push({ role: Role.user, content: message.content });

      // Fetch API key from chrome.storage.local
      chrome.storage.local.get(["apiKey"], function (result) {
        const apiKey = result.apiKey;

        // Use OpenAI lib to send message to OpenAI API
        const openai = new OpenAI({ apiKey });

        const payload = {
          model: "gpt-4-vision-preview",
          messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
          max_tokens: 4096,
        };
        console.log("request", payload);
        openai.chat.completions.create(payload).then((response) => {
          console.log("response", response);
          // Add the sent message to the in-memory state
          const llmMessage = {
            role: Role.assistant,
            content: response.choices[0].message.content || "",
          };
          messages.push(llmMessage);

          // Send the response back to the sender
          port.postMessage(llmMessage);
        });
      });
    });
  } else if (port.name === COMMAND_CHANNEL) {
    port.onMessage.addListener((message: CommandMessage) => {
      console.log("message", message);
      if (message.action === Commands.capture_visible_tab) {
        chrome.tabs.captureVisibleTab(
          chrome.windows.WINDOW_ID_CURRENT,
          { format: "jpeg" },
          (screenshotUrl) => {
            port.postMessage({
              action: Commands.capture_visible_tab,
              payload: screenshotUrl,
            });
          }
        );
      }
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === Commands.open_chat) {
    // Query for the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Check if there's an active tab
      if (tabs.length > 0 && tabs[0].id !== undefined) {
        // Send a message to the content script in the active tab
        const port = chrome.tabs.connect(tabs[0].id, { name: COMMAND_CHANNEL });
        port.postMessage({ action: Commands.open_chat });
        // Disconnect
        port.disconnect();
      }
    });
  }
});
