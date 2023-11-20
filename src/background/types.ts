import { ChatMessageType } from "utils/types";

export type DrawerInstance = {
  tabId: number;
  open: boolean;
  conversation: ChatConversation;
  createdAt: Date;
};

export type ChatConversation = {
  messages: ChatMessageType[];
  createdAt: Date;
};

export const NewChatConversation = () => ({
  messages: [],
  createdAt: new Date(),
});
