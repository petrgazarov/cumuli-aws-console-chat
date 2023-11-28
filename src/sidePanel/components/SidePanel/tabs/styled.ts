import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const ChatTabContent = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  padding: 10px 10px 200px;
`;

export const ConfigTabContent = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  padding: 10px;
`;

export const HistoryTabContent = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  padding: 10px;
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

export const SubmitApiKeyButtonContainer = styled.div`
  margin-left: 8px;
`;

export const ConversationItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  cursor: pointer;
`;

export const TextInputRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;
