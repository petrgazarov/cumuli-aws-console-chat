import { useRef } from "react";

import Screenshot from "sidePanel/components/ScreenshotPreview";
import Textarea from "sidePanel/components/Textarea";
import { isChatMessageTextContent } from "utils/helpers";
import { UserChatMessage } from "utils/types";

import useEditMessage from "./useEditMessage";

const UserMessage = ({ chatMessage }: { chatMessage: UserChatMessage }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    handleChange,
    handleKeyDown,
    handleSubmitMessage,
    removeImageFromMessage,
    value,
  } = useEditMessage({
    chatMessage,
    textareaRef,
  });

  if (typeof chatMessage.content === "string") {
    return (
      <Textarea
        chatMessage={chatMessage}
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSendButtonClick={handleSubmitMessage}
      />
    );
  }

  const contents = chatMessage.content.map((content, idx) => {
    if (isChatMessageTextContent(content)) {
      return (
        <Textarea
          key={idx}
          chatMessage={chatMessage}
          textareaRef={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSendButtonClick={handleSubmitMessage}
        />
      );
    } else {
      return (
        <Screenshot
          key={idx}
          url={content.image_url.url}
          onRemove={() => removeImageFromMessage(chatMessage)}
        />
      );
    }
  });

  return <>{contents}</>;
};

export default UserMessage;
