import { useAtom } from "jotai";
import { useCallback, useState } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useConversation from "sidePanel/hooks/useConversation";
import usePort from "sidePanel/hooks/usePort";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { CHAT_CHANNEL } from "utils/constants";
import {
  ChatChannelAction,
  NewUserChatMessage,
  UserChatMessage,
} from "utils/types";

type UseNewMessageProps = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useNewMessage = ({ textareaRef }: UseNewMessageProps) => {
  const [textInput, setTextInput] = useState("");
  const [, setLoading] = useAtom(loadingAtom);
  const [, setStreaming] = useAtom(streamingAtom);
  const { createConversation, currentConversation } = useConversation();

  const chatChannelListener = useChatChannelListener();

  const { postMessage: postChatMessage } = usePort({
    channelName: CHAT_CHANNEL,
    listener: chatChannelListener,
  });

  const handleCreateNewMessage = useCallback(
    (message: UserChatMessage) => {
      postChatMessage({
        action: ChatChannelAction.new_message,
        payload: message,
      });
      setTextInput("");
      setLoading(true);
      setStreaming(true);
    },
    [postChatMessage]
  );

  const handleSubmitWithScreenshotCommand = useCallback(
    async (value: string) => {
      let conversationId: string;
      if (currentConversation) {
        conversationId = currentConversation.id;
      } else {
        const newConversation = await createConversation();
        conversationId = newConversation.id;
      }

      handleCreateNewMessage(
        NewUserChatMessage({
          conversationId,
          content: [
            { type: "text", text: value },
            {
              type: "image_url",
              image_url: { url: "", detail: "high" },
            },
          ],
        })
      );
    },
    [handleCreateNewMessage, currentConversation?.id]
  );

  useCommandChannelListener({
    handleSubmitWithScreenshotCommand,
    textareaRef,
  });

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();

      // If Shift + Enter is pressed, insert a new line
      if (event.shiftKey) {
        setTextInput((prev) => prev + "\n");
        return;
      }

      const currentInputValue = textareaRef.current?.value || "";
      if (!currentInputValue.trim()) {
        return;
      }

      let conversationId: string;
      if (currentConversation) {
        conversationId = currentConversation.id;
      } else {
        const newConversation = await createConversation();
        conversationId = newConversation.id;
      }

      handleCreateNewMessage(
        NewUserChatMessage({
          conversationId,
          content: currentInputValue,
        })
      );
    },
    [handleCreateNewMessage, currentConversation?.id]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextInput(event.target.value);
    },
    []
  );

  return {
    value: textInput,
    handleChange,
    handleKeyDown,
  };
};

export default useNewMessage;
