import { useCallback } from "react";

type UseKeyDownChatMessageListenerParams = {
  handleSubmitMessage: (value: string) => void;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useKeyDownChatMessageListener = ({
  handleSubmitMessage,
  setTextInput,
  textareaRef,
}: UseKeyDownChatMessageListenerParams) => {
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
      // Disallow sending empty messages
      if (!currentInputValue.trim()) {
        return;
      }

      handleSubmitMessage(currentInputValue);
    },
    [handleSubmitMessage]
  );

  return handleKeyDown;
};

export default useKeyDownChatMessageListener;
