import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { currentTextareaRefAtom, streamingAtom } from "sidePanel/utils/atoms";
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
  const [streaming] = useAtom(streamingAtom);
  const [currentTextareaRef] = useAtom(currentTextareaRefAtom);

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

      handleSubmitWithScreenshotCommand(currentInputValue);
    },
    [streaming, currentTextareaRef, handleSubmitWithScreenshotCommand]
  );

  useEffect(() => {
    addOnMessageListener(commandChannelListener);

    return () => removeOnMessageListener(commandChannelListener);
  }, [commandChannelListener]);

  return commandChannelListener;
};

export default useCommandChannelListener;
