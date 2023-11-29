import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100% - 20px);
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
  margin: 10px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  font-weight: bold;
  border-bottom: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.ACTIVE_TEXT : theme.PRIMARY_TEXT};

  &:hover {
    border-bottom-color: ${({ theme }) => theme.ACTIVE_TEXT};
    color: ${({ theme }) => theme.ACTIVE_TEXT};
  }
`;
