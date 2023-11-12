import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import CancelButton from "./CancelButton";

const DrawerRootId = "cumuli-drawer-root";

type DrawerWrapperProps = {
  showHover: boolean;
};

const DrawerWrapper = styled.div<DrawerWrapperProps>`
  min-width: 22px;
  height: 100%;
  background-color: #2a2e33;

  ${(props) =>
    props.showHover &&
    `
    &:hover {
      background-color: #545b64;
      cursor: pointer;
    }
  `}
`;

type DrawerElementProps = {
  open: boolean;
};

const DrawerElement = styled.div<DrawerElementProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "400px" : "22px")};
  height: calc(100% - 31px);
  padding: 9px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

type ContentProps = {
  show: boolean;
};

const Content = styled.div<ContentProps>`
  ${(props) => (props.show ? "display: block;" : "display: none;")}
`;

const Message = styled.div``;

const NewMessageTextarea = styled.textarea`
  background-color: #1a2029;
`;

type ChatMessage = {
  content: string;
  role: string;
};

const Separator = styled.div`
  border-bottom: 1px solid #414750;
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`;

const Drawer = () => {
  const imageUrl = chrome.runtime.getURL("/icons/logo48.png");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const NewMessage = () => {
    const [text, setText] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && text) {
        event.preventDefault();
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: text, role: "user" },
        ]);
        setText("");
      }
    };

    return (
      <NewMessageTextarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    );
  };

  useEffect(() => {
    if (drawerOpen) {
      textAreaRef.current?.focus();
    }
  }, [drawerOpen, messages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        if (drawerOpen) {
          setDrawerOpen(false);
        } else {
          setDrawerOpen(true);
        }
      } else if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  return (
    <DrawerWrapper onClick={() => setDrawerOpen(true)} showHover={!drawerOpen}>
      <DrawerElement open={drawerOpen}>
        <Header>
          <LogoContainer>
            <img src={imageUrl} width={22} height={22} alt="Cumuli logo" />
          </LogoContainer>
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
              <Message key={i}>{message.content}</Message>
              <Separator />
            </>
          ))}
          <NewMessage />
        </Content>
      </DrawerElement>
    </DrawerWrapper>
  );
};

// Hide existing drawer if it exists. Not all pages have an existing drawer.
const styleElement = document.createElement("style");
styleElement.innerHTML = `
  #app main ~ [class^="awsui_drawer_"] {
    display: none !important;
  }
`;
document.head.appendChild(styleElement);

// Render the drawer as soon as the "#app main" element is found.
const setupDrawer = () => {
  const appElement = document.getElementById("app");
  const rootElement = document.createElement("div");
  rootElement.id = DrawerRootId;

  const observer = new MutationObserver(() => {
    const appMainElement = appElement?.getElementsByTagName("main")[0];

    if (appMainElement && appMainElement.parentNode) {
      appMainElement.parentNode.appendChild(rootElement);
      ReactDOM.render(<Drawer />, document.getElementById(DrawerRootId));
      observer.disconnect(); // Stop observing when element is found
    }
  });

  // The #app element is present on page load, so it can be observed immediately.
  if (appElement) {
    observer.observe(appElement, { childList: true, subtree: true });
  }
};

setupDrawer();
