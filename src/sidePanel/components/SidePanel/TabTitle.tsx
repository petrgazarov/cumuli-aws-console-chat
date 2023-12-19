import { useAtom } from "jotai";
import { useCallback } from "react";

import useConversation from "sidePanel/hooks/useConversation";
import { currentTabAtom, streamingErrorAtom } from "sidePanel/utils/atoms";
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
  const [, setLlmStreamingError] = useAtom(streamingErrorAtom);

  const onTabTitleClick = useCallback(() => {
    scrollToTop();

    if (currentTab !== tab) {
      setCurrentTab(tab);

      // If navigating away from chat tab, reset the streaming error
      if (tab === TabTitlesEnum.chat) {
        setLlmStreamingError(null);
      }

      return;
    }

    if (currentTab === TabTitlesEnum.chat) {
      resetCurrentConversation();
    }
  }, [
    currentTab,
    setCurrentTab,
    tab,
    setLlmStreamingError,
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
