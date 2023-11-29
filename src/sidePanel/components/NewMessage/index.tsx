import { useAtom } from "jotai";
import { RefObject, useEffect, useMemo } from "react";

import useNewMessage from "sidePanel/components/NewMessage/useNewMessage";
import Textarea from "sidePanel/components/Textarea";
import { loadingAtom, streamingAtom } from "sidePanel/utils/atoms";
import { getKeyboardShortcutModifierKey } from "utils/helpers";

import { HelpText, KeyboardSymbol, LoadingState } from "./styled";

const NewMessage = ({
  textareaRef,
}: {
  textareaRef: RefObject<HTMLTextAreaElement>;
}) => {
  const [streaming] = useAtom(streamingAtom);
  const [loading] = useAtom(loadingAtom);

  const { handleChange, handleKeyDown, value } = useNewMessage({
    textareaRef,
  });

  const modifierKey = useMemo(() => getKeyboardShortcutModifierKey(), []);

  useEffect(() => {
    if (!streaming && !loading) {
      textareaRef.current?.focus();
    }
  }, [streaming, loading]);

  if (loading) {
    return <LoadingState />;
  }

  if (streaming) {
    return null;
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
