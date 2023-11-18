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

export enum LlmChannelAction {
  initial_state = "initial_state",
  new_message = "new_message",
  replace_message = "replace_message",
  stream = "stream",
}

export type LlmChannelMessage = {
  action: LlmChannelAction;
  payload?: any;
};

export type ChatMessageType = {
  content: string | Array<TextMessageContent | ImageMessageContent>;
  role: Role;
};

export enum CommandChannelAction {
  "open_chat" = "open_chat",
  "close_chat" = "close_chat",
}

export type CommandChannelMessage = {
  action: CommandChannelAction;
  payload?: any;
};
