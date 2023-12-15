import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import useChatMessages from "sidePanel/hooks/useChatMessages";
import useConversation from "sidePanel/hooks/useConversation";
import useKeyDownChatMessageListener from "sidePanel/hooks/useKeyDownChatMessageListener";
import {
  chatChannelAtom,
  llmLoadingAtom,
  newMessageTextareaRefAtom,
  newMessageTextareaValueAtom,
  screenshotChatMessageIdAtom,
} from "sidePanel/utils/atoms";
import {
  ChatChannelAction,
  NewUserChatMessage,
  UserChatMessage,
} from "utils/types";

const useNewMessage = () => {
  const [value, setValue] = useAtom(newMessageTextareaValueAtom);
  const [llmLoading, setLlmLoading] = useAtom(llmLoadingAtom);
  const [screenshotChatMessageId] = useAtom(screenshotChatMessageIdAtom);
  const [chatChannel] = useAtom(chatChannelAtom);
  const [newMessageTextareaRef] = useAtom(newMessageTextareaRefAtom);
  const { createConversation, currentConversation } = useConversation();
  const { appendMessage } = useChatMessages();

  const handleCreateNewMessage = useCallback(
    (message: UserChatMessage) => {
      chatChannel.post({
        action: ChatChannelAction.message_new,
        payload: message,
      });
      setLlmLoading(true);
      appendMessage(message);
    },
    [chatChannel, setLlmLoading, appendMessage]
  );

  const handleSubmitWithScreenshotCommand = useCallback(async () => {
    const currentInputValue = newMessageTextareaRef.current?.value || "";

    let conversationId: string;
    if (currentConversation) {
      conversationId = currentConversation.id;
    } else {
      const newConversation = await createConversation();
      conversationId = newConversation.id;
    }

    handleCreateNewMessage(
      NewUserChatMessage({
        content: [
          { text: currentInputValue, type: "text" },
          {
            image_url: { detail: "high", url: "" },
            type: "image_url",
          },
        ],
        conversationId,
      })
    );
  }, [
    newMessageTextareaRef,
    handleCreateNewMessage,
    currentConversation,
    createConversation,
  ]);

  useEffect(() => {
    if (screenshotChatMessageId === null) {
      handleSubmitWithScreenshotCommand();
    }
  }, [screenshotChatMessageId, handleSubmitWithScreenshotCommand]);

  const handleSubmitMessage = useCallback(
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
          content: value,
          conversationId,
        })
      );
    },
    [handleCreateNewMessage, currentConversation, createConversation]
  );

  const handleKeyDown = useKeyDownChatMessageListener({
    handleSubmitMessage,
    setValue,
    textareaRef: newMessageTextareaRef,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  useEffect(() => {
    if (llmLoading) {
      setValue("");
    }
  }, [llmLoading, setValue]);

  return {
    handleChange,
    handleKeyDown,
    handleSubmitMessage,
    value,
  };
};

export default useNewMessage;
