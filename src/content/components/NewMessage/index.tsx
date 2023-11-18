import { NewMessageTextarea, HelpText } from "./styled";
import useNewMessage from "./useNewMessage";

type NewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const NewMessage = (props: NewMessageProps) => {
  const { value, onChange, onKeyDown } = useNewMessage();

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
