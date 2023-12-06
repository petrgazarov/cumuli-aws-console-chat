import { useAtom } from "jotai";
import { Fragment, useRef } from "react";

import Screenshot from "sidePanel/components/ScreenshotPreview";
import Textarea from "sidePanel/components/Textarea";
import {
  UserInstructionType,
  UserInstructions,
} from "sidePanel/components/UserInstructions";
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
        {showUserInstructions && (
          <UserInstructions messageType={UserInstructionType.existingMessage} />
        )}
      </>
    );
  }

  const contents = chatMessage.content.map((content, idx) => {
    if (isChatMessageTextContent(content)) {
      return (
        <Fragment key={idx}>
          <Textarea
            textareaRef={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {showUserInstructions && (
            <UserInstructions
              messageType={UserInstructionType.existingMessage}
            />
          )}
        </Fragment>
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
