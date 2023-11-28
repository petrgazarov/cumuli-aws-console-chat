import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const ChatTabContent = styled.div<{
  $isScrolled: boolean;
  $show: boolean;
}>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  opacity: ${({ $isScrolled }) => ($isScrolled ? 1 : 0)};
  flex-direction: column;
  padding: 10px 10px 200px;
`;

export const Separator = styled.div<{ theme: Theme }>`
  border-bottom: 1px solid ${COLORS.GRAY_2};
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`;

export const NewChatButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;
