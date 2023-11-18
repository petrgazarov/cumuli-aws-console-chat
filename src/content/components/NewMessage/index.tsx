import { NewMessageTextarea } from "./styled";
import useNewMessage from "./useNewMessage";

type NewMessageProps = {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const NewMessage = (props: NewMessageProps) => {
  const { value, onChange, onKeyDown } = useNewMessage();

  return (
    <NewMessageTextarea
      ref={props.textAreaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default NewMessage;
