import { useAtom } from "jotai";
import { useCallback } from "react";

import useConversation from "sidePanel/hooks/useConversation";
import {
  conversationStartedAtom,
  currentTabAtom,
  streamingErrorAtom,
} from "sidePanel/utils/atoms";
import { scrollToTop } from "sidePanel/utils/helpers";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { StyledTabTitle, TabTitleContainer } from "./styled";

type TabTitleProps = {
  children: React.ReactNode;
  tab: TabTitlesEnum;
};

const TabTitle = ({ children, tab }: TabTitleProps) => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);
  const { resetCurrentConversation } = useConversation();
  const [conversationStarted] = useAtom(conversationStartedAtom);
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);

  const onTabTitleClick = useCallback(() => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
      scrollToTop();

      if (tab === TabTitlesEnum.chat) {
        setLlmStreamingError(null);
      }

      return;
    }

    if (currentTab === TabTitlesEnum.history) {
      scrollToTop();
    } else if (currentTab === TabTitlesEnum.chat) {
      conversationStarted && resetCurrentConversation();
    }
  }, [
    currentTab,
    setCurrentTab,
    tab,
    setLlmStreamingError,
    conversationStarted,
    resetCurrentConversation,
  ]);

  return (
    <TabTitleContainer
      onClick={onTabTitleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onTabTitleClick();
        }
      }}
      $active={currentTab === tab}
    >
      <StyledTabTitle $active={currentTab === tab}>{children}</StyledTabTitle>
    </TabTitleContainer>
  );
};

export default TabTitle;
