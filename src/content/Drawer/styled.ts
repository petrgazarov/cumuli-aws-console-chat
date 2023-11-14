import styled from "styled-components";

export const DrawerWrapper = styled.div<{ showHover: boolean }>`
  min-width: 22px;
  height: 100%;
  background-color: #2a2e33;

  ${(props) =>
    props.showHover &&
    `
    &:hover {
      background-color: #545b64;
      cursor: pointer;
    }
  `}
`;

export const DrawerElement = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "400px" : "22px")};
  height: calc(100% - 31px);
  padding: 9px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Content = styled.div<{ show: boolean }>`
  ${(props) => (props.show ? "display: flex;" : "display: none;")}
  flex-direction: column;
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
