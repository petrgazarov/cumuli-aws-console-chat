import { useAtom } from "jotai";
import { useEffect } from "react";


import { streamingAtom, loadingAtom } from "content/utils/atoms";

import { NewMessageTextarea, HelpText, LoadingState } from "./styled";
import useNewMessage from "./useNewMessage";


type NewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const NewMessage = ({ textAreaRef }: NewMessageProps) => {
  const [streaming] = useAtom(streamingAtom);
  const [loading] = useAtom(loadingAtom);

  const { value, handleChange, handleKeyDown } = useNewMessage({
    textAreaRef,
  });

  useEffect(() => {
    if (!streaming && !loading) {
      textAreaRef.current?.focus();
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
      <NewMessageTextarea
        ref={textAreaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <HelpText>Enter to send, Cmd/Ctrl + U to send with screenshot</HelpText>
    </>
  );
};

export default NewMessage;
