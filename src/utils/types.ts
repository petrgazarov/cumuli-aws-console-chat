import { v4 as uuidv4 } from "uuid";

export enum Role {
  assistant = "assistant",
  user = "user"
}

export type ChatMessageTextContent = {
  text: string;
  type: "text";
};

export type ChatMessageImageContent = {
  image_url: {
    detail: "high" | "low" | "auto";
    url: string;
  };
  type: "image_url";
};

export enum ChatChannelAction {
  finish_stream = "finish_stream",
  new_message = "new_message",
  replace_message = "replace_message",
  stream_chunk = "stream_chunk"
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
  Linux = "Linux",
  MacOS = "MacOS",
  UNIX = "UNIX",
  Unknown = "Unknown OS",
  Windows = "Windows"
}

export enum Order {
  asc = "asc",
  desc = "desc",
}

export type ChatMessage = UserChatMessage | AssistantChatMessage;

export type UserChatMessage = {
  content: string | Array<ChatMessageTextContent | ChatMessageImageContent>;
  conversationId: string;
  createdAt: string;
  id: string;
  role: Role.user;
};

export type AssistantChatMessage = {
  content: string;
  conversationId: string;
  createdAt: string;
  id: string;
  role: Role.assistant;
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
  createdAt: string;
  id: string;
  preview?: string;
};

export const NewConversation = (): Conversation => ({
  id: uuidv4(),
  createdAt: new Date().toISOString(),
});
