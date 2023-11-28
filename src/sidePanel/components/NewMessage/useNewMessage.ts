import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import usePort from "sidePanel/hooks/usePort";
import {
  currentTextareaRefAtom,
  loadingAtom,
  streamingAtom,
} from "sidePanel/utils/atoms";
import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/utils/listeners";
import { CHAT_CHANNEL } from "utils/constants";
import {
  ChatChannelAction,
  ChatChannelMessage,
  CommandChannelAction,
  CommandChannelMessage,
  NewUserChatMessage,
  UserChatMessage,
} from "utils/types";

type useNewMessageProps = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useNewMessage = ({ textareaRef }: useNewMessageProps) => {
  const [textInput, setTextInput] = useState("");
  const [, setLoading] = useAtom(loadingAtom);
  const [streaming, setStreaming] = useAtom(streamingAtom);
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);
  const { createConversation, currentConversation } = useConversation();
  const { appendChunk, appendMessage } = useChatMessages();

  const chatChannelListener = useCallback(
    (channelMessage: ChatChannelMessage) => {
      switch (channelMessage.action) {
        case ChatChannelAction.new_message:
          appendMessage(channelMessage.payload);
          break;
        case ChatChannelAction.stream_chunk:
          appendChunk(channelMessage.payload);
          setLoading(false);
          break;
        case ChatChannelAction.finish_stream:
          setStreaming(false);
          break;
      }
    },
    []
  );

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

  const commandChannelListener = useCallback(
    async (channelMessage: CommandChannelMessage) => {
      if (
        channelMessage.action !== CommandChannelAction.submit_with_screenshot
      ) {
        return;
      }
      if (streaming) {
        return;
      }
      if (currentTextareaRef !== textareaRef) {
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
          content: [
            { type: "text", text: currentInputValue },
            {
              type: "image_url",
              image_url: { url: "", detail: "high" },
            },
          ],
        })
      );
    },
    [
      handleCreateNewMessage,
      streaming,
      currentConversation?.id,
      currentTextareaRef,
    ]
  );

  useEffect(() => {
    addOnMessageListener(commandChannelListener);

    return () => removeOnMessageListener(commandChannelListener);
  }, [commandChannelListener]);

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
