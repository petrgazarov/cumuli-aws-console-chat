import { useCallback } from "react";

import Screenshot from "sidePanel/components/ScreenshotPreview";
import { ChatMessage, TextMessageContent } from "utils/types";

import { TextContent } from "./styled";

type ChatMessageProps = {
  message: ChatMessage;
};

const ConversationMessage = ({ message }: ChatMessageProps) => {
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

export default ConversationMessage;
