import styled from "styled-components";

export const DrawerWrapper = styled.div<{
  showHover: boolean;
}>`
  position: sticky;
  height: calc(100vh - 72px);
  overflow: auto;
  top: 41px;
  background-color: #2a2e33;

  ${(props) =>
    props.showHover &&
    `
    &:hover {
      background-color: #414750;
      cursor: pointer;

      ${Header} {
        background-color: #414750;
      }
    }
  `};
`;

export const DrawerElement = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "400px" : "22px")};
  padding-left: ${(props) => (props.open ? "15px" : "9px")};
  padding-right: ${(props) => (props.open ? "15px" : "9px")};
  padding-bottom: ${(props) => (props.open ? "100px" : "9px")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: #2a2e33;
  padding-top: 15px;
  padding-bottom: 15px;
  z-index: 1;
`;

export const CancelIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  border: 0;
  background: none;
  padding: 3px;
  margin-top: -3px;

  &:hover {
    svg {
      stroke: #fff;
    }
  }
`;

export const Content = styled.div<{ show: boolean }>`
  ${(props) => (props.show ? "display: flex;" : "display: none;")}
  flex-direction: column;
  padding-bottom: 10px;
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
