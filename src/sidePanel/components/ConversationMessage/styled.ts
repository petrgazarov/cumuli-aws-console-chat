import styled from "styled-components";

import { LINE_HEIGHT } from "sidePanel/globalStyles";

export const MarkdownContent = styled.div`
  line-height: ${LINE_HEIGHT};
  padding: 0 7px;
`;

export const MarkdownLink = styled.a`
  color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
`;

export const MarkdownCode = styled.code`
  font-size: "13px";
`;
