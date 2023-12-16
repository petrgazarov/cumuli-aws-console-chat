import { v4 as uuidv4 } from "uuid";

export enum Role {
  assistant = "assistant",
  system = "system",
  user = "user",
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
  message_new = "message_new",
  message_replace = "message_replace",
  stream_abort = "stream_abort",
  stream_chunk = "stream_chunk",
  stream_error = "stream_error",
  stream_finish = "stream_finish",
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
  content: params.content,
  conversationId: params.conversationId,
  createdAt: new Date().toISOString(),
  id: uuidv4(),
  role: Role.user,
});

export const NewAssistantChatMessage = (params: {
  content: string;
  conversationId: string;
}): AssistantChatMessage => ({
  content: params.content,
  conversationId: params.conversationId,
  createdAt: new Date().toISOString(),
  id: uuidv4(),
  role: Role.assistant,
});

export type Conversation = {
  createdAt: string;
  id: string;
  preview: string;
  updatedAt: string;
};

export const NewConversation = (): Conversation => {
  const timestamp = new Date().toISOString();

  return {
    createdAt: timestamp,
    id: uuidv4(),
    preview: "",
    updatedAt: timestamp,
  };
};
