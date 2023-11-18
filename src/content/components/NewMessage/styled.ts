import styled from "styled-components";

export const NewMessageTextarea = styled.textarea`
  min-height: 50px;
  background-color: #1a2029;
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid #879596;

  &:focus {
    border: 1px solid #00a1c9;
    box-shadow: 0 0 0 1px #00a1c9;
  }
`;
