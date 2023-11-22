import { useCallback } from "react";

import { TextContent } from "./styled";

import Screenshot from "content/components/ScreenshotPreview";
import { ChatMessageType, TextMessageContent } from "utils/types";

type ChatMessageProps = {
  message: ChatMessageType;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (typeof message.content === "string") {
    return <TextContent>{message.content}</TextContent>;
  }

  const isTextMessageContent = useCallback(
    (content: any): content is TextMessageContent => {
      return content.type === "text";
    },
    []
  );

  const contents = message.content.map((content) => {
    if (typeof content === "string") {
      return content;
    } else if (isTextMessageContent(content)) {
      return content.text;
    } else {
      return <Screenshot url={content.image_url.url} />;
    }
  });

  return <>{contents}</>;
};

export default ChatMessage;
