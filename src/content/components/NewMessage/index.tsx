import { useEffect } from "react";
import { NewMessageTextarea, HelpText, LoadingState } from "./styled";
import useNewMessage from "./useNewMessage";

type NewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const NewMessage = (props: NewMessageProps) => {
  const { value, onChange, onKeyDown, loading, streaming } = useNewMessage();

  useEffect(() => {
    if (!streaming && !loading) {
      props.textAreaRef.current?.focus();
    }
  }, [streaming, loading]);

  if (loading) {
    return <LoadingState />;
  }

  if (!loading && streaming) {
    return null;
  }

  return (
    <>
      <NewMessageTextarea
        ref={props.textAreaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <HelpText>
        Enter to send, Cmd/Ctrl + Enter to include a screenshot
      </HelpText>
    </>
  );
};

export default NewMessage;
