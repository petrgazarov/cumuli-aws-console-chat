import { useAtom } from "jotai";

import { currentTabAtom } from "sidePanel/utils/atoms";
import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { Container, Content, TabTitle, TabTitlesContainer } from "./styled";
import ChatTab from "./tabs/ChatTab";
import ConfigTab from "./tabs/ConfigTab";
import HistoryTab from "./tabs/HistoryTab";

const SidePanel = () => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);

  return (
    <Container>
      <TabTitlesContainer>
        <TabTitle
          $active={currentTab == TabTitlesEnum.chat}
          onClick={() => setCurrentTab(TabTitlesEnum.chat)}
        >
          Chat
        </TabTitle>
        <TabTitle
          $active={currentTab == TabTitlesEnum.history}
          onClick={() => setCurrentTab(TabTitlesEnum.history)}
        >
          History
        </TabTitle>
        <TabTitle
          $active={currentTab == TabTitlesEnum.config}
          onClick={() => setCurrentTab(TabTitlesEnum.config)}
        >
          Config
        </TabTitle>
      </TabTitlesContainer>
      <Content id={PANEL_CONTENT_ID}>
        <ChatTab />
        <ConfigTab />
        <HistoryTab />
      </Content>
    </Container>
  );
};

export default SidePanel;
