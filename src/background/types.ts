import { ChatMessageType } from "utils/types";

export type DrawerInstance = {
  createdAt: Date;
  open: boolean;
  messages: ChatMessageType[];
  tabId: number;
};
