import styled from "styled-components";

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

export const Separator = styled.div`
  border-bottom: 1px solid #414750;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ConversationItem = styled.div`
  height: 50px;
  cursor: pointer;
`;
