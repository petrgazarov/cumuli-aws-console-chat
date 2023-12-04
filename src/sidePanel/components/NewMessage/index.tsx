import { useAtom } from "jotai";
import { RefObject, useMemo } from "react";

import useNewMessage from "sidePanel/components/NewMessage/useNewMessage";
import Textarea from "sidePanel/components/Textarea";
import { llmLoadingAtom, llmStreamingAtom } from "sidePanel/utils/atoms";
import { getKeyboardShortcutModifierKey } from "utils/helpers";

import ChatError from "./ChatError";
import { HelpText, KeyboardSymbol, LoadingState } from "./styled";
import useChatError from "./useChatError";

const NewMessage = ({
  textareaRef,
}: {
  textareaRef: RefObject<HTMLTextAreaElement>;
}) => {
  const [llmStreaming] = useAtom(llmStreamingAtom);
  const [llmLoading] = useAtom(llmLoadingAtom);
  const chatError = useChatError();

  const { handleChange, handleKeyDown, value } = useNewMessage({
    textareaRef,
  });

  const modifierKey = useMemo(() => getKeyboardShortcutModifierKey(), []);

  if (llmLoading) {
    return <LoadingState />;
  }

  if (llmStreaming) {
    return null;
  }

  if (chatError) {
    return <ChatError />;
  }

  return (
    <>
      <Textarea
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <HelpText>
        <KeyboardSymbol>{"\u23CE"}</KeyboardSymbol> to send,{" "}
        <KeyboardSymbol>{modifierKey} + U</KeyboardSymbol> to send with
        screenshot
      </HelpText>
    </>
  );
};

export default NewMessage;
