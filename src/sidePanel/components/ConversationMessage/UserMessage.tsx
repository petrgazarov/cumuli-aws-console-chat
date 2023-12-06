import { useAtom } from "jotai";
import { useRef } from "react";

import Screenshot from "sidePanel/components/ScreenshotPreview";
import Textarea from "sidePanel/components/Textarea";
import { UserInstructionType } from "sidePanel/components/UserInstructions";
import { currentChatMessagesAtom, llmLoadingAtom } from "sidePanel/utils/atoms";
import { isChatMessageTextContent } from "utils/helpers";
import { UserChatMessage } from "utils/types";

import useEditMessage from "./useEditMessage";

const UserMessage = ({ chatMessage }: { chatMessage: UserChatMessage }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentChatMessages] = useAtom(currentChatMessagesAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);

  const showUserInstructions =
    !llmLoading &&
    currentChatMessages[currentChatMessages.length - 1] === chatMessage;

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
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        userInstructionType={
          showUserInstructions ? UserInstructionType.existingMessage : undefined
        }
        onSendButtonClick={handleSubmitMessage}
      />
    );
  }

  const contents = chatMessage.content.map((content, idx) => {
    if (isChatMessageTextContent(content)) {
      return (
        <Textarea
          key={idx}
          textareaRef={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          userInstructionType={
            showUserInstructions
              ? UserInstructionType.existingMessage
              : undefined
          }
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
