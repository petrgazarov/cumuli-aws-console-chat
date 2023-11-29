import styled from "styled-components";

export const Container = styled.div``;

export const GroupLabel = styled.div`
  color: ${({ theme }) => theme.HELP_TEXT};
`;

export const GroupContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const DeleteButton = styled.button`
  display: none;
  position: absolute;
  align-items: center;
  right: 5px;
  height: 40px;
  color: ${({ theme }) => theme.HELP_TEXT};
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    color: ${({ theme }) => theme.HIGHLIGHT};
  }
`;

export const GroupItem = styled.div`
  display: flex;

  &:hover {
    ${DeleteButton} {
      display: flex;
    }

    text-decoration: underline;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin: 0 65px 0 15px;
  min-width: 0;
  cursor: pointer;
  min-height: 40px;
  max-width: 1500px;
`;

export const Preview = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
