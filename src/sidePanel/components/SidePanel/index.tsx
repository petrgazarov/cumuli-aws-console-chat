import { useAtom } from "jotai";
import { useEffect } from "react";

import useConversations from "sidePanel/hooks/useConversations";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenaiApiKey } from "utils/helpers";

import { Container, Content, TabTitle, TabTitlesContainer } from "./styled";
import ChatTab from "./tabs/ChatTab";
import ConfigTab from "./tabs/ConfigTab";
import HistoryTab from "./tabs/HistoryTab";

const SidePanel = () => {
  const [, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const { getConversations } = useConversations();
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    getOpenaiApiKey().then((apiKey: string) => {
      setOpenaiApiKey(apiKey);
    });
  }, []);

  return (
    <Container>
      <TabTitlesContainer>
        <TabTitle
          $active={currentTab === TabTitlesEnum.chat}
          onClick={() => setCurrentTab(TabTitlesEnum.chat)}
        >
          Chat
        </TabTitle>
        <TabTitle
          $active={currentTab === TabTitlesEnum.history}
          onClick={() => setCurrentTab(TabTitlesEnum.history)}
        >
          History
        </TabTitle>

        <TabTitle
          $active={currentTab === TabTitlesEnum.config}
          onClick={() => setCurrentTab(TabTitlesEnum.config)}
        >
          Config
        </TabTitle>
      </TabTitlesContainer>
      <Content id={PANEL_CONTENT_ID}>
        <ChatTab />
        <HistoryTab />
        {currentTab == TabTitlesEnum.config && <ConfigTab />}
      </Content>
    </Container>
  );
};

export default SidePanel;
