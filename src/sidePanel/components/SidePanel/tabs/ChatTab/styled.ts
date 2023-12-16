import styled from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const ChatTabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 300px;
`;

export const NewChatButtonContainer = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 43px 0 ${({ $isEmpty }) => ($isEmpty ? "62px" : "30px")};
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
  border: 2px solid ${({ theme }) => theme.colors.HIGHLIGHT};
`;

export const ErrorText = styled.div`
  font-size: ${FONT_SIZE_SECONDARY};
  word-break: break-word;
`;
