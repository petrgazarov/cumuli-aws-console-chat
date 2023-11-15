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

export type ChatMessage = {
  content: string | Array<TextMessageContent | ImageMessageContent>;
  role: Role;
};

export enum Commands {
  "open_chat" = "open_chat",
}

export type CommandMessage = {
  action: Commands;
  payload?: any;
};
