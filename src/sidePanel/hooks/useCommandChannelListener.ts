import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import {
  focusedTextareaAtom,
  llmLoadingAtom,
  screenshotChatMessageIdAtom,
} from "sidePanel/utils/atoms";
import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/utils/listeners";
import { CommandChannelAction, CommandChannelMessage } from "utils/types";

const useCommandChannelListener = () => {
  const [llmLoading] = useAtom(llmLoadingAtom);
  const [, setScreenshotChatMessageId] = useAtom(screenshotChatMessageIdAtom);
  const [focusedTextarea] = useAtom(focusedTextareaAtom);

  const commandChannelListener = useCallback(
    async (channelMessage: CommandChannelMessage) => {
      if (
        channelMessage.action !== CommandChannelAction.submit_with_screenshot
      ) {
        return;
      }
      if (llmLoading) {
        return;
      }

      const { chatMessage, textareaRef } = focusedTextarea;

      if (!textareaRef) {
        console.debug(
          "[Cumuli] Screenshot requested, but no textarea is focused"
        );
        return;
      }

      const currentInputValue = textareaRef.current?.value || "";

      if (!currentInputValue.trim()) {
        return;
      }

      textareaRef.current?.blur();

      setScreenshotChatMessageId(chatMessage?.id || null);
    },
    [llmLoading, focusedTextarea, setScreenshotChatMessageId]
  );

  useEffect(() => {
    addOnMessageListener(commandChannelListener);

    return () => removeOnMessageListener(commandChannelListener);
  }, [commandChannelListener]);

  return commandChannelListener;
};

export default useCommandChannelListener;
