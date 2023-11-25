import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";
import { ChatConversation } from "utils/types";

export const scrollPanelToBottom = () => {
  const scrollableParent = document.getElementById(PANEL_CONTENT_ID);

  if (scrollableParent) {
    scrollableParent.scrollTop = scrollableParent.scrollHeight;
  }
};

export const getConversationPreview = (conversation: ChatConversation) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  if (lastMessage) {
    if (Array.isArray(lastMessage.content)) {
      const textContent = lastMessage.content.find(
        (content) => content.type === "text"
      );

      if (textContent && "text" in textContent) {
        return textContent.text;
      }
    } else {
      return lastMessage.content;
    }
  }

  return "";
};
