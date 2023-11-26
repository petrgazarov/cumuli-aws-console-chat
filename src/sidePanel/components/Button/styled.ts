import styled from "styled-components";

export const StyledButton = styled.button<{ disabled: boolean }>`
  padding: 4px 20px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.TEXT_DISABLED : theme.TEXT_MAIN};
  font-weight: 700;
  border: 1px solid #879596;
  border-radius: 2px;
  line-height: 22px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #21252c;
    border: 1px solid #aab7b8;
    color: #fafafa;
  }
`;
