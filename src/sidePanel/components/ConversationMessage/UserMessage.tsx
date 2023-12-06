import { useRef } from "react";

import Screenshot from "sidePanel/components/ScreenshotPreview";
import Textarea from "sidePanel/components/Textarea";
import UserInstructions from "sidePanel/components/UserInstructions";
import useChatMessages from "sidePanel/hooks/useChatMessages";
import { isChatMessageTextContent } from "utils/helpers";
import { UserChatMessage } from "utils/types";

import useEditMessage from "./useEditMessage";

const UserMessage = ({ chatMessage }: { chatMessage: UserChatMessage }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentChatMessages } = useChatMessages();

  const showUserInstructions =
    currentChatMessages[currentChatMessages.length - 1] === chatMessage;

  const { handleChange, handleKeyDown, removeImageFromMessage, value } =
    useEditMessage({
      chatMessage,
      textareaRef,
    });

  if (typeof chatMessage.content === "string") {
    return (
      <>
        <Textarea
          textareaRef={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {showUserInstructions && <UserInstructions />}
      </>
    );
  }

  const contents = chatMessage.content.map((content, idx) => {
    if (isChatMessageTextContent(content)) {
      return (
        <>
          <Textarea
            key={idx}
            textareaRef={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {showUserInstructions && <UserInstructions />}
        </>
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
