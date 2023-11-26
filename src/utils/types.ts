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

export enum Order {
  asc = "asc",
  desc = "desc",
}

export type ChatMessage = {
  id: string;
  conversationId: string;
  content: string | Array<TextMessageContent | ImageMessageContent>;
  role: Role;
  createdAt: string;
};

export const NewChatMessage = ({
  content,
  role,
  conversationId,
}: Omit<ChatMessage, "id" | "createdAt">): ChatMessage => ({
  id: uuidv4(),
  content,
  role,
  conversationId,
  createdAt: new Date().toISOString(),
});

export type Conversation = {
  id: string;
  createdAt: string;
  preview?: string;
};

export const NewConversation = (): Conversation => ({
  id: uuidv4(),
  createdAt: new Date().toISOString(),
});
