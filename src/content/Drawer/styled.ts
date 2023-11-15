import styled from "styled-components";

export const DrawerWrapper = styled.div<{ showHover: boolean }>`
  min-width: 22px;
  height: calc(100vh - 72px);
  overflow-y: auto;
  background-color: #2a2e33;

  ${(props) =>
    props.showHover &&
    `
    &:hover {
      background-color: #545b64;
      cursor: pointer;

      ${Header} {
        background-color: #545b64;
      }
    }
  `}
`;

export const DrawerElement = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "400px" : "22px")};
  padding-left: 9px;
  padding-right: 9px;
  padding-bottom: 9px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: #2a2e33;
  padding-bottom: 15px;
  padding-top: 9px;
`;

export const Content = styled.div<{ show: boolean }>`
  ${(props) => (props.show ? "display: flex;" : "display: none;")}
  flex-direction: column;
  height: calc(100% - 300px);
  overflow-y: auto;
`;

export const Message = styled.div``;

export const NewMessageTextarea = styled.textarea`
  background-color: #1a2029;
`;

export const Separator = styled.div`
  border-bottom: 1px solid #414750;
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`;
