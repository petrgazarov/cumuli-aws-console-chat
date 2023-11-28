import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100% - 20px);
  background-color: ${COLORS.BLACK_2};
  color: ${COLORS.BLUE_1};
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

export const TabTitle = styled.div<{ $active: boolean }>`
  padding: 10px 0;
  cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  color: ${({ $active }) => ($active ? COLORS.BLUE_4 : COLORS.BLUE_1)};
  font-weight: bold;

  &:hover {
    color: ${COLORS.BLUE_4};
    text-decoration: ${({ $active }) => ($active ? "none" : "underline")};
  }
`;
