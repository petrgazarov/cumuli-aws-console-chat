import { ChatMessage } from "utils/types";

export const getTextContentFromMessage = (message: ChatMessage) => {
  if (typeof message.content === "string") {
    return message.content;
  }

  return message.content
    .map((content) => {
      if (typeof content === "string") {
        return content;
      } else if (content.type === "text") {
        return content.text;
      } else if (content.type === "image_url") {
        return `<Screenshot attached>`;
      }
    })
    .join("\n\n");
};
