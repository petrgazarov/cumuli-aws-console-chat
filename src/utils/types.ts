import { v4 as uuidv4 } from "uuid";

export enum Role {
  user = "user",
  assistant = "assistant",
}

export type ChatMessageTextContent = {
  type: "text";
  text: string;
};

export type ChatMessageImageContent = {
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

export type ChatMessage = UserChatMessage | AssistantChatMessage;

export type UserChatMessage = {
  id: string;
  conversationId: string;
  content: string | Array<ChatMessageTextContent | ChatMessageImageContent>;
  role: Role.user;
  createdAt: string;
};

export type AssistantChatMessage = {
  id: string;
  conversationId: string;
  content: string;
  role: Role.assistant;
  createdAt: string;
};

export const NewUserChatMessage = (params: {
  content: string | Array<ChatMessageTextContent | ChatMessageImageContent>;
  conversationId: string;
}): UserChatMessage => ({
  id: uuidv4(),
  content: params.content,
  role: Role.user,
  conversationId: params.conversationId,
  createdAt: new Date().toISOString(),
});

export const NewAssistantChatMessage = (params: {
  content: string;
  conversationId: string;
}): AssistantChatMessage => ({
  id: uuidv4(),
  content: params.content,
  role: Role.assistant,
  conversationId: params.conversationId,
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
