import ChatMessage from "content/components/ChatMessage";
import CancelButton from "content/components/CancelButton";
import Logo from "content/components/Logo";
import NewMessage from "content/components/NewMessage";
import {
  DrawerWrapper,
  DrawerElement,
  Header,
  Content,
  HelpText,
  Separator,
} from "./styled";
import useDrawer from "./useDrawer";

const Drawer = () => {
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
              <ChatMessage message={message} key={i} />
              <Separator />
            </>
          ))}
          <NewMessage textAreaRef={textAreaRef} />
          <HelpText>
            Enter to send, Cmd/Ctrl + Enter to include a screenshot
          </HelpText>
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};

export default Drawer;
