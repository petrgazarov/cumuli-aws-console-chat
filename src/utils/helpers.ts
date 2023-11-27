import { OPENAI_API_KEY_STORAGE_KEY } from "utils/constants";
import {
  ChatMessage,
  ChatMessageImageContent,
  ChatMessageTextContent,
  OS,
  UserChatMessage,
} from "utils/types";

const maskKey = (key?: string): string => {
  if (!key) {
    return "";
  }
  if (key.length < 13) {
    return key;
  }
  return `${key.slice(0, 5)}...${key.slice(-5)}`;
};

export function getOpenaiApiKey(masked = true): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(OPENAI_API_KEY_STORAGE_KEY, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        if (masked) {
          resolve(maskKey(result[OPENAI_API_KEY_STORAGE_KEY]));
        } else {
          resolve(result[OPENAI_API_KEY_STORAGE_KEY]);
        }
      }
    });
  });
}

export function saveOpenaiApiKey(apiKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(
      { [OPENAI_API_KEY_STORAGE_KEY]: apiKey },
      function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(maskKey(apiKey));
        }
      }
    );
  });
}

// https://tecadmin.net/javascript-detect-os/
export const detectOS = () => {
  let os = OS.Unknown;
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Win") != -1) {
    os = OS.Windows;
  }
  if (userAgent.indexOf("Mac") != -1) {
    os = OS.MacOS;
  }
  if (userAgent.indexOf("X11") != -1) {
    os = OS.UNIX;
  }
  if (userAgent.indexOf("Linux") != -1) {
    os = OS.Linux;
  }

  return os;
};

export const getImageContentFromMessage = (
  message: ChatMessage
): ChatMessageImageContent | null => {
  if (!Array.isArray(message.content)) {
    return null;
  }

  const imageContent = message.content.find(
    (
      content: ChatMessageTextContent | ChatMessageImageContent
    ): content is ChatMessageImageContent => content.type === "image_url"
  );

  return imageContent || null;
};

export const isChatMessageTextContent = (
  content: ChatMessageTextContent | ChatMessageImageContent
): content is ChatMessageTextContent => {
  return content.type === "text";
};

export const getChatMessageText = (chatMessage: ChatMessage): string => {
  if (typeof chatMessage.content === "string") {
    return chatMessage.content;
  }

  const textContent = chatMessage.content.find(isChatMessageTextContent);

  if (textContent) {
    return textContent.text;
  }

  return "";
};
