import { useAtom } from "jotai";
import { useEffect } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import {
  chatChannelAtom,
  currentTabAtom,
  screenshotChatMessageIdAtom,
} from "sidePanel/utils/atoms";
import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { Container, Content, TabTitlesContainer } from "./styled";
import ChatTab from "./tabs/ChatTab";
import ConfigTab from "./tabs/ConfigTab";
import HistoryTab from "./tabs/HistoryTab";
import TabTitle from "./TabTitle";
import useInitialData from "./useInitialData";

const SidePanel = () => {
  const [currentTab] = useAtom(currentTabAtom);
  const { hasLoaded } = useInitialData();
  const [, setChatChannel] = useAtom(chatChannelAtom);
  const [screenshotChatMessageId, setScreenshotChatMessageId] = useAtom(
    screenshotChatMessageIdAtom
  );
  const { postChatMessage } = useChatChannelListener();

  useEffect(() => {
    setChatChannel({ post: postChatMessage });
  }, [postChatMessage, setChatChannel]);

  useCommandChannelListener();

  useEffect(() => {
    if (screenshotChatMessageId || screenshotChatMessageId === null) {
      setScreenshotChatMessageId(undefined);
    }
  }, [screenshotChatMessageId, setScreenshotChatMessageId]);

  if (!hasLoaded) {
    return <Container />;
  }

  return (
    <Container>
      <TabTitlesContainer>
        <TabTitle tab={TabTitlesEnum.chat}>Chat</TabTitle>
        <TabTitle tab={TabTitlesEnum.history}>History</TabTitle>
        <TabTitle tab={TabTitlesEnum.config}>Config</TabTitle>
      </TabTitlesContainer>
      <Content id={PANEL_CONTENT_ID}>
        {currentTab === TabTitlesEnum.chat && <ChatTab />}
        {currentTab === TabTitlesEnum.history && <HistoryTab />}
        {currentTab === TabTitlesEnum.config && <ConfigTab />}
      </Content>
    </Container>
  );
};

export default SidePanel;
