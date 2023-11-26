import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import usePort from "sidePanel/hooks/usePort";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/utils/listeners";
import { CHAT_CHANNEL } from "utils/constants";
import {
  ChatChannelAction,
  ChatChannelMessage,
  ChatMessage,
  CommandChannelAction,
  CommandChannelMessage,
  NewChatMessage,
  Role,
} from "utils/types";

type useNewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

// Textarea value:
//   - textAreaRef is used to read the value. This avoids resetting the
//     onMessage listener on every value change.
//   - textInput state is used to set the value.

const useNewMessage = ({ textAreaRef }: useNewMessageProps) => {
  const [textInput, setTextInput] = useState("");
  const [, setLoading] = useAtom(loadingAtom);
  const [streaming, setStreaming] = useAtom(streamingAtom);
  const { currentConversation, createConversation } = useConversation();
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
    (message: ChatMessage) => {
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
      if (streaming) {
        return;
      }
      if (
        channelMessage.action !== CommandChannelAction.submit_with_screenshot
      ) {
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
        NewChatMessage({
          conversationId,
          role: Role.user,
          content: [
            { type: "text", text: textAreaRef.current?.value || "" },
            {
              type: "image_url",
              image_url: { url: "", detail: "high" },
            },
          ],
        })
      );
    },
    [handleCreateNewMessage, streaming, currentConversation?.id]
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

      const currentInputValue = textAreaRef.current?.value || "";
      // If the input is empty, do nothing
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
        NewChatMessage({
          conversationId,
          role: Role.user,
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
