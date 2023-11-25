import { v4 as uuidv4 } from "uuid";

export enum Role {
  user = "user",
  assistant = "assistant",
}

export type TextMessageContent = {
  type: "text";
  text: string;
};

export type ImageMessageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail: "high" | "low" | "auto";
  };
};

export enum ChatChannelAction {
  initial_state = "initial_state",
  new_message = "new_message",
  replace_message = "replace_message",
  stream_chunk = "stream_chunk",
  finish_stream = "finish_stream",
}

export type ChatChannelMessage = {
  action: ChatChannelAction;
  payload?: any;
};

export enum CommandChannelAction {
  "new_chat" = "new_chat",
  "toggle_chat" = "toggle_chat",
  "close_chat" = "close_chat",
  "open_chat" = "open_chat",
  "submit_with_screenshot" = "submit_with_screenshot",
}

export type CommandChannelMessage = {
  action: CommandChannelAction;
  payload?: any;
};

export enum OS {
  Windows = "Windows",
  MacOS = "MacOS",
  UNIX = "UNIX",
  Linux = "Linux",
  Unknown = "Unknown OS",
}

export type ChatConversation = {
  id: string;
  messages: ChatMessageType[];
  createdAt: Date;
};

export type ChatMessageType = {
  content: string | Array<TextMessageContent | ImageMessageContent>;
  role: Role;
};

export const NewChatConversation = (): ChatConversation => ({
  id: uuidv4(),
  messages: [],
  createdAt: new Date(),
});
