export enum Role {
  user = "user",
  assistant = "assistant",
}

type TextMessageContent = {
  type: "text";
  text: string;
};

type ImageMessageContent = {
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
  "capture_visible_tab" = "capture_visible_tab",
}

export type CommandMessage = {
  action: Commands;
  payload?: any;
};
