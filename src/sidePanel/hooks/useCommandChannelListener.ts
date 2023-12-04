import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import {
  currentTextareaRefAtom,
  llmStreamingAtom,
} from "sidePanel/utils/atoms";
import {
  addOnMessageListener,
  removeOnMessageListener,
} from "sidePanel/utils/listeners";
import { CommandChannelAction, CommandChannelMessage } from "utils/types";

type UseCommandChannelListenerParams = {
  handleSubmitWithScreenshotCommand: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useCommandChannelListener = ({
  handleSubmitWithScreenshotCommand,
  textareaRef,
}: UseCommandChannelListenerParams) => {
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);

  const commandChannelListener = useCallback(
    async (channelMessage: CommandChannelMessage) => {
      if (
        channelMessage.action !== CommandChannelAction.submit_with_screenshot
      ) {
        return;
      }
      if (llmStreaming) {
        return;
      }
      if (currentTextareaRef !== textareaRef) {
        return;
      }
      const currentInputValue = textareaRef.current?.value || "";
      if (!currentInputValue.trim()) {
        return;
      }

      handleSubmitWithScreenshotCommand(currentInputValue);
    },
    [
      llmStreaming,
      currentTextareaRef,
      textareaRef,
      handleSubmitWithScreenshotCommand,
    ]
  );

  useEffect(() => {
    addOnMessageListener(commandChannelListener);

    return () => removeOnMessageListener(commandChannelListener);
  }, [commandChannelListener]);

  return commandChannelListener;
};

export default useCommandChannelListener;
