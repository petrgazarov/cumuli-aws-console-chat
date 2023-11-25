import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100% - 20px);
  background-color: ${COLORS.BACKGROUND};
  color: ${COLORS.TEXT_MAIN};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

export const TabTitlesContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TabTitle = styled.div<{ active: boolean }>`
  padding: 10px 0;
  cursor: pointer;
  color: ${({ active }) => (active ? COLORS.TEXT_HIGHLIGHT : COLORS.TEXT_MAIN)};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
