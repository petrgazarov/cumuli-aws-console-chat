import { useAtom } from "jotai";
import { useCallback } from "react";

import { currentTabAtom } from "sidePanel/utils/atoms";
import { scrollToTop } from "sidePanel/utils/helpers";
import { TabTitlesEnum } from "sidePanel/utils/types";

import { StyledTabTitle, TabTitleContainer } from "./styled";

type TabTitleProps = {
  children: React.ReactNode;
  tab: TabTitlesEnum;
};

const TabTitle = ({ children, tab }: TabTitleProps) => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);

  const onTabTitleClick = useCallback(() => {
    if (currentTab === tab) {
      scrollToTop();
    } else {
      setCurrentTab(tab);
    }
  }, [currentTab, setCurrentTab, tab]);

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
