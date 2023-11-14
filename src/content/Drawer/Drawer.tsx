import { ChatMessage, Role } from "utils/types";
import { getTextContentFromMessage } from "utils/helpers";
import CancelButton from "./CancelButton";
import Logo from "./Logo";
import NewMessage from "./NewMessage";
import {
  DrawerWrapper,
  DrawerElement,
  Header,
  Content,
  Message,
  Separator,
} from "./styled";
import useDrawer from "./hooks/useDrawer";
import { useCallback } from "react";

export const Drawer = () => {
  const {
    drawerOpen,
    setDrawerOpen,
    messages,
    setMessages,
    port,
    textAreaRef,
  } = useDrawer();

  const onSubmitMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (port) {
        port.postMessage(message);
      }
    },
    [port, setMessages]
  );

  return (
    <DrawerWrapper onClick={() => setDrawerOpen(true)} showHover={!drawerOpen}>
      <DrawerElement open={drawerOpen}>
        <Header>
          <Logo />
          {drawerOpen ? (
            <CancelButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setDrawerOpen(false);
              }}
            />
          ) : null}
        </Header>
        <Content show={drawerOpen}>
          {messages.map((message, i) => (
            <>
              <Message key={i}>{getTextContentFromMessage(message)}</Message>
              <Separator />
            </>
          ))}
          <NewMessage onSubmit={onSubmitMessage} textAreaRef={textAreaRef} />
          Enter to send, Cmd/Ctrl + Enter to include a screenshot
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};
