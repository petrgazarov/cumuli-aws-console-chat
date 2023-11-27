import styled from "styled-components";

import { ColorTheme } from "sidePanel/utils/types";

const StyledSvg = styled.svg<{ theme: ColorTheme }>`
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.BLUE_1};
`;

type CancelIconProps = {
  width?: number;
  height?: number;
};

const CancelIcon = ({ width = 16, height = 16 }: CancelIconProps) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      focusable="false"
      width={width}
      height={height}
    >
      <path d="m2 2 12 12M14 2 2 14"></path>
    </StyledSvg>
  );
};

export default CancelIcon;
