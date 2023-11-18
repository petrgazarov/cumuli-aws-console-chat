import styled from "styled-components";

export const ButtonComponent = styled.button`
  display: flex;
  cursor: pointer;
  padding: 0;
  border: 0;
  background: none;

  &hover {
    svg {
      color: #fff;
    }
  }
`;

export const SvgIcon = styled.svg`
  stroke-width: 2px;
  stroke: #d5dbdb;

  &:hover {
    stroke: #fff;
  }
`;
