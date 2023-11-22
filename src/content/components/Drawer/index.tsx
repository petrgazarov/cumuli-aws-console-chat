import { useAtom } from "jotai";
import React from "react";

import {
  DrawerWrapper,
  DrawerElement,
  Header,
  Content,
  Separator,
  NewChatButtonContainer,
  CancelIconButton,
} from "./styled";
import useDrawer from "./useDrawer";

import Button from "content/components/Button";
import ChatMessage from "content/components/ChatMessage";
import CancelIcon from "content/components/icons/CancelIcon";
import Logo from "content/components/Logo";
import NewMessage from "content/components/NewMessage";
import { drawerOpenAtom } from "content/utils/atoms";
import { DRAWER_WRAPPER_ID } from "utils/constants";

const Drawer = () => {
  const [drawerOpen] = useAtom(drawerOpenAtom);
  const { toggleDrawerOpen, textAreaRef, messages, createNewChat } =
    useDrawer();

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
      onClick={() => (drawerOpen ? undefined : toggleDrawerOpen())}
      showHover={!drawerOpen}
      id={DRAWER_WRAPPER_ID}
    >
      <DrawerElement open={drawerOpen}>
        <Header>
          <Logo />
          {drawerOpen ? (
            <CancelIconButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                toggleDrawerOpen();
              }}
            >
              <CancelIcon />
            </CancelIconButton>
          ) : null}
        </Header>
        <Content show={drawerOpen}>
          {messages.map(renderMessage)}
          <NewMessage textAreaRef={textAreaRef} />
          {Boolean(messages.length) && (
            <NewChatButtonContainer>
              <Button onClick={createNewChat}>New Chat</Button>
            </NewChatButtonContainer>
          )}
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};

export default Drawer;
