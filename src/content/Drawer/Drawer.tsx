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

export const Drawer = () => {
  const { drawerOpen, setDrawerOpen, textAreaRef, messages } = useDrawer();

  return (
    <DrawerWrapper
      onClick={() => setDrawerOpen(true)}
      showHover={!drawerOpen}
      drawerOpen={drawerOpen}
    >
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
          <NewMessage textAreaRef={textAreaRef} />
          Enter to send, Cmd/Ctrl + Enter to include a screenshot
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};
