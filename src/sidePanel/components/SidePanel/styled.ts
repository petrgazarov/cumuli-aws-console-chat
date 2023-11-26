import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100% - 20px);
  background-color: ${({ theme }) => theme.BACKGROUND};
  color: ${({ theme }) => theme.TEXT_MAIN};
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
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.TEXT_HIGHLIGHT : theme.TEXT_MAIN};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
