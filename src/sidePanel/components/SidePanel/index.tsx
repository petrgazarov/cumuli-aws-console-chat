import { useAtom } from "jotai";
import { useEffect } from "react";

import useChatChannelListener from "sidePanel/hooks/useChatChannelListener";
import useCommandChannelListener from "sidePanel/hooks/useCommandChannelListener";
import useScroll from "sidePanel/hooks/useScroll";
import {
  chatChannelAtom,
  currentTabAtom,
  screenshotChatMessageIdAtom,
  scrollableContainerRefAtom,
} from "sidePanel/utils/atoms";
import { SCROLLABLE_CONTAINER_ID } from "sidePanel/utils/constants";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { Container, Content, TabTitlesContainer } from "./styled";
import ChatTab from "./tabs/ChatTab";
import ConfigTab from "./tabs/ConfigTab";
import HistoryTab from "./tabs/HistoryTab";
import TabTitle from "./TabTitle";
import useAbortStreaming from "./useAbortStreaming";
import useInitialData from "./useInitialData";

const SidePanel = () => {
  const [scrollableContainerRef] = useAtom(scrollableContainerRefAtom);
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

  useAbortStreaming({ postChatMessage });

  useEffect(() => {
    if (screenshotChatMessageId || screenshotChatMessageId === null) {
      setScreenshotChatMessageId(undefined);
    }
  }, [screenshotChatMessageId, setScreenshotChatMessageId]);

  useScroll({ isLoading: !hasLoaded });

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
      <Content id={SCROLLABLE_CONTAINER_ID} ref={scrollableContainerRef}>
        {currentTab === TabTitlesEnum.chat && <ChatTab />}
        {currentTab === TabTitlesEnum.history && <HistoryTab />}
        {currentTab === TabTitlesEnum.config && <ConfigTab />}
      </Content>
    </Container>
  );
};

export default SidePanel;
