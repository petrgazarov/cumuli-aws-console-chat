import styled from "styled-components";

export const ButtonComponent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  border: 0;
  background: none;
  width: 16px;
  height: 16px;

  &:hover {
    svg {
      stroke: #fff;
    }
  }
`;

export const SvgIcon = styled.svg`
  stroke-width: 2px;
  stroke: #d5dbdb;
`;
