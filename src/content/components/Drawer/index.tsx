import React from "react";
import ChatMessage from "content/components/ChatMessage";
import CancelButton from "content/components/CancelButton";
import Logo from "content/components/Logo";
import NewMessage from "content/components/NewMessage";
import {
  DrawerWrapper,
  DrawerElement,
  Header,
  Content,
  Separator,
} from "./styled";
import useDrawer from "./useDrawer";

const Drawer = () => {
  const { drawerOpen, setDrawerOpen, textAreaRef, messages } = useDrawer();

  const renderMessage = (message: any, index: number) => {
    return (
      <React.Fragment key={index}>
        <ChatMessage message={message} />
        <Separator />
      </React.Fragment>
    );
  };

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
          {messages.map(renderMessage)}
          <NewMessage textAreaRef={textAreaRef} />
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};

export default Drawer;
