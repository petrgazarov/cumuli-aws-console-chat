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

export const StyledTabTitle = styled.div<{ $active: boolean }>`
  font-weight: bold;
  border-bottom: ${({ $active }) => ($active ? "2px" : "1px")} solid
    ${({ $active, theme }) =>
      $active ? theme.colors.ACTIVE_TEXT : theme.colors.PRIMARY_TEXT};
  user-select: none;
`;

export const TabTitleContainer = styled.div<{ $active: boolean }>`
  padding: 0 5px;
  margin: 10px 0;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.ACTIVE_TEXT : theme.colors.PRIMARY_TEXT};

  &:hover,
  &:focus-visible {
    ${StyledTabTitle} {
      border-bottom-color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
      color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
    }
  }
`;
