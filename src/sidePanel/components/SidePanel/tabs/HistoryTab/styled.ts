import styled from "styled-components";

export const HistoryTabContent = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  padding: 10px;
`;

export const ConversationItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  cursor: pointer;
`;
