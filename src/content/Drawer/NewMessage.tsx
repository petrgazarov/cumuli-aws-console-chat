import { ChatMessage } from "utils/types";
import { NewMessageTextarea } from "./styled";
import useNewMessage from "./hooks/useNewMessage";
import usePort from "./hooks/usePort";
import { COMMAND_CHANNEL } from "utils/constants";

type NewMessageProps = {
  onSubmit: (message: ChatMessage) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

const NewMessage = (props: NewMessageProps) => {
  const { postMessage, addMessageListener, removeMessageListener } =
    usePort(COMMAND_CHANNEL);

  const { value, onChange, handleKeyDown } = useNewMessage({
    onSubmit: props.onSubmit,
  });

  return (
    <NewMessageTextarea
      ref={props.textAreaRef}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default NewMessage;
